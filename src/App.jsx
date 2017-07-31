var isContentNode = document.getElementById('contents');
// below is first use of jsx- not a string, gets transpiled into jsx because of line 10 which is the babel cdn
var component = <h1>Hola World!</h1>;
// render the component inside content node, in this case the component is within content node, which is the div with the id contents
ReactDOM.render(component, isContentNode);
