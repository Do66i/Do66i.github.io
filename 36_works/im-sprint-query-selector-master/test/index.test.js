const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { JSDOM } = require("jsdom");
const { expect } = require("chai");
const { describe } = require("mocha");

const myLibrary = fs.readFileSync(path.join(cwd, "/index.js"), {
  encoding: "utf-8",
});
const html = fs.readFileSync(path.join(__dirname, "/test.html"));

let window;
window = new JSDOM(html, { runScripts: "dangerously" }).window;
const script = window.document.createElement("script");
script.textContent = myLibrary;

window.document.body.appendChild(script);

describe("Query Selector Test", () => {
  describe("first box test", () => {
    it('<div id="hello"> 의 textContent는 "안녕하세요" 이여야 합니다', () => {
      const target = window.document.getElementById("hello");
      expect(target.textContent).to.equal("안녕하세요");
    });

    it('<div id="world"> 의 textContent는 "여러분" 이여야 합니다', () => {
      const target = window.document.getElementById("world");
      expect(target.textContent).to.equal("여러분");
    });

    it('<div id="codestates"> 의 textContent는 "코드스테이츠" 이여야 합니다', () => {
      const target = window.document.getElementById("codestates");
      expect(target.textContent).to.equal("코드스테이츠");
    });
  });
});
