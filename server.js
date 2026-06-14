const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const SWIGGY_BASE = 'https://www.swiggy.com';

const BASE_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://www.swiggy.com/',
  Origin: 'https://www.swiggy.com',
};

// Session state — populated from the restaurants endpoint (which works without auth)
let session = { tid: '', sid: '', deviceId: '', expiry: 0 };
const SESSION_TTL = 20 * 60 * 1000; // 20 min

async function fetchRestaurantsRaw(lat, lng) {
  const url = `${SWIGGY_BASE}/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;
  const response = await fetch(url, { headers: BASE_HEADERS });

  const text = await response.text();
  if (!text) throw new Error(`Empty response from restaurants (HTTP ${response.status})`);

  let json;
  try { json = JSON.parse(text); } catch {
    throw new Error(`Non-JSON from restaurants: ${text.slice(0, 120)}`);
  }

  // Cache the session tokens that come back in the JSON body
  if (json.tid) {
    session.tid = json.tid;
    session.sid = json.sid || '';
    session.deviceId = json.deviceId || '';
    session.expiry = Date.now() + SESSION_TTL;
    console.log('[session] Refreshed tid/sid from restaurants response');
  }

  return json;
}

async function ensureSession(lat = '21.1702401', lng = '72.83106070000001') {
  if (Date.now() < session.expiry && session.tid) return;
  await fetchRestaurantsRaw(lat, lng);
}

function sessionCookies() {
  const parts = [];
  if (session.tid) parts.push(`tid=${session.tid}`);
  if (session.sid) parts.push(`_sid=${session.sid}`);
  if (session.deviceId) parts.push(`deviceId=${session.deviceId}`);
  return parts.join('; ');
}

app.use(cors());

// ── Restaurants ────────────────────────────────────────────────────────────────
app.get('/api/restaurants', async (req, res) => {
  const { lat = '21.1702401', lng = '72.83106070000001' } = req.query;
  try {
    const json = await fetchRestaurantsRaw(lat, lng);
    res.json(json);
  } catch (err) {
    console.error('[restaurants]', err.message);
    res.status(502).json({ error: err.message });
  }
});

// ── Menu ───────────────────────────────────────────────────────────────────────
app.get('/api/menu/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const { lat = '21.1702401', lng = '72.83106070000001' } = req.query;
  const url = `${SWIGGY_BASE}/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&submitAction=ENTER&restaurantId=${restaurantId}`;

  try {
    await ensureSession(lat, lng);

    const response = await fetch(url, {
      headers: { ...BASE_HEADERS, Cookie: sessionCookies() },
    });

    const text = await response.text();

    if (!text || text.trim() === '') {
      console.error(`[menu] Empty body from Swiggy (HTTP ${response.status}) for ${restaurantId}`);
      return res.status(502).json({ error: `Swiggy returned empty body (${response.status})` });
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      console.error(`[menu] Non-JSON from Swiggy: ${text.slice(0, 200)}`);
      return res.status(502).json({ error: 'Swiggy returned non-JSON response' });
    }

    // Swiggy 202 = soft block — session stale, refresh and retry once
    if (response.status === 202 || json?.statusCode === 0 && !json?.data?.cards) {
      console.warn(`[menu] Soft block for ${restaurantId}, refreshing session and retrying...`);
      session.expiry = 0; // force refresh
      await ensureSession(lat, lng);

      const retry = await fetch(url, {
        headers: { ...BASE_HEADERS, Cookie: sessionCookies() },
      });
      const retryText = await retry.text();
      if (!retryText) return res.status(502).json({ error: 'Swiggy blocked menu request after retry' });
      try {
        return res.json(JSON.parse(retryText));
      } catch {
        return res.status(502).json({ error: 'Swiggy returned non-JSON on retry' });
      }
    }

    res.json(json);
  } catch (err) {
    console.error('[menu]', err.message);
    res.status(502).json({ error: err.message });
  }
});

// Warm up session on startup
ensureSession().catch((err) => console.warn('[startup] Session warm-up failed:', err.message));

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
