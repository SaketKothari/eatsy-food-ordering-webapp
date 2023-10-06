const parent = React.createElement(
  'div',
  { id: 'parent' },
  React.createElement('div', { id: 'child' }, [
    React.createElement('h1', {}, "I'm Batman"),
    React.createElement('h2', {}, "I'm Superman"),
  ])
);

console.log(parent); // Object
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(parent);
