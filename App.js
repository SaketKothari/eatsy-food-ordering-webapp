import React from 'react';
import ReactDOM from 'react-dom/client';

const heading = React.createElement('h1', { id: 'heading' }, "I'm Batman");
const jsxHeading = <h1 id="heading">I'm Superman</h1>;

console.log(heading);
console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(jsxHeading);
