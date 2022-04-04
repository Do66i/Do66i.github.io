import { useState } from 'react'
import './App.css'
import Template from './components/Template'
import TodoList from './components/TodoList'
import Todos from './todos'

const App = () => {

  const [todos, setTodos] = useState(Todos);

  return (
    <Template>
      <TodoList todos={todos} />
    </Template>
  )
}

export default App
