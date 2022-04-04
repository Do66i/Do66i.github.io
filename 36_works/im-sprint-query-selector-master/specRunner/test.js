var expect = chai.expect;

describe("Query Selector Test", () => {
  describe("first box test", () => {
    it('<div id="hello"> 의 textContent는 "안녕하세요" 이여야 합니다', () => {
      const target = document.getElementById("hello");
      expect(target.textContent).to.equal("안녕하세요");
    });

    it('<div id="world"> 의 textContent는 "여러분" 이여야 합니다', () => {
      const target = document.getElementById("world");
      expect(target.textContent).to.equal("여러분");
    });

    it('<div id="codestates"> 의 textContent는 "코드스테이츠" 이여야 합니다', () => {
      const target = document.getElementById("codestates");
      expect(target.textContent).to.equal("코드스테이츠");
    });
  });
});
