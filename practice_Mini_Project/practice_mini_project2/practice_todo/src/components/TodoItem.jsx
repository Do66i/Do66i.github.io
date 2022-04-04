import React from 'react';

const TodoItem = ({ todo }) => {
  const { text } = todo;
  return (
    <div>{text}</div>
  );
}

//TodoList에서 todo객체를 받아옴
//받아온 todo객체를 객체 구조 분해를 이용하여 todo에서 text를 가져와 보여줌

export default TodoItem;