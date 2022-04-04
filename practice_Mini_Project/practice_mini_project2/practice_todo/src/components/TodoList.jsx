import React from 'react';
import TodoItem from './TodoItem';

// todos -> 할 일 객체가 들어있는 배열 (App.jsx에서 받아올예정)
const TodoList = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => {
        return <TodoItem todo={todo} key={todo.id} />
      })}
    </div>
  );
}


// const TodoList = ({ todos }) => {
//   return (
//     <div>
//       {todos.map((todo) => {
//         return <div>{todo.text}</div>
//       })}
//     </div>
//   );
// }

export default TodoList;