import app from './store.js'

const changeH1Number = (text) => document.getElementById('h1').textContent = text;
const changeH2Text = (text) => document.getElementById('h2').textContent = text;
const addTodo = (todos) => {
    const todo = todos[todos.length-1]
    const eli = li()
    .set('id',todo.id)
    .set('textContent',todo.text)
    .get('textContent',console.log)
    .set('onclick', app.compelate)
    document.getElementById('todo').append(eli);
}
const complated = (complited) => {
    
}

app.subscribe(['a'], changeH1Number);
app.subscribe(['field'], changeH2Text);
app.subscribe(['todos'], addTodo);
// app.subscribe(['compliteds'], complated);

export default app;


function _createElement(el){
    const element = document.createElement(el);
    element.set = function (attr,val){
        element[attr] = val;
        return element;
    }
    element.get = function (attr, fn){
        fn(element[attr]);
        return element;
    }
    return element;
}

function li(){
    return _createElement('li');
}

function ul(){
    return _createElement('ul');
}