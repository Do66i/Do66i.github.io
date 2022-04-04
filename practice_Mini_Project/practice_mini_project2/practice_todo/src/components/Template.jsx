import React from 'react';

const Template = ({ children }) => { //children이라는 인자를 넣어주면 App.jsx에서 Template컴포넌트안에 문자열이나 컴포넌트를 받아올 수 있음
  return (
    <div>
      <div>오늘의 할일 (0)</div>
      <div>{children}</div>
    </div>
  )
}

export default Template;