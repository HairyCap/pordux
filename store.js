import store from "./reduxxx.js"
const data = {
  a: 0,
  field: '',
  todos: [],
  compliteds: [],
}
const app = store(data);
export default app;