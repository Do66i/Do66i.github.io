// TODO: 자바스크립트 코드를 사용하여 index.html에 있는 값들을 전에서 후로 바꿔보세요
// 직접 index.html을 수정하지 않아야 합니다.

/*
전:
<div id="hello">hello</div>
<div id="world">world</div>
<div id="codestates">codestates</div>

후:
<div id="hello">안녕하세요</div>
<div id="world">여러분</div>
<div id="codestates">코드스테이츠</div>
*/

// TODO: document.querySelector와 textContent를 활용하여 index.html에 있는 값들을 전에서 후로 바꿔보세요
// 직접 index.html을 수정하지 않아야 합니다.

document.querySelector('#hello').textContent = "안녕하세요";
document.querySelector('#world').textContent = "여러분"; 
document.querySelector('#codestates').textContent = "코드스테이츠";