import app from './view.js'
window.app = app;


var Increment = (val, setter) => setter(val+1);
var Decrement = (val, setter) => setter(val-1);
var FieldUpdate = (_, setter, evt) => {
  console.log(evt)
  setter(document.getElementById('input').value);
}
var updateTodo = (val, setter, evt) => {
  console.log(evt)
  const inputText = document.getElementById('input').value;
  document.getElementById('input').value = "";
  setter([...val,{text: inputText, state: 'needToDo', id: randomString()}]);
}
var compelate = (todos, setter, evt) => {
  console.log(evt.target.id)
  const newTodos = todos.map((todo => {
    if(todo.id === evt.target.id){
      todo.state = "completed"
    }
  }));
  setter([...newTodos]);
}


app.addAction('Increment', ['a'], Increment, "#Inc", "onclick");
app.addAction('Decrement', ['a'], Decrement, "#Dec", "onclick");
app.addAction('fieldUpdate', ['field'], FieldUpdate, "#input", "oninput");
app.addAction('updateTodo', ['todos'], updateTodo, "#input", "onchange");
app.addAction('compelate', ['todos'], compelate, "#todo > li", "onclick");

const randomString = () => Math.random().toString(36).substring(2);
