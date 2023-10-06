const parent = React.createElement('div', { id: 'parent' }, [
  React.createElement('div', { id: 'child1' }, [
    React.createElement('h1', {}, 'Batman'),
    React.createElement('h2', {}, 'Superman'),
  ]),
  React.createElement('div', { id: 'child2' }, [
    React.createElement('h1', {}, 'Bruce Wayne'),
    React.createElement('h2', {}, 'Clark Kent'),
  ]),
]);

console.log(parent); // Object
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(parent);
