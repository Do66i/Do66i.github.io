describe('화살표 함수에 관해서', function () {
  it('함수 표현식 사용법을 복습합니다', function () {
    const add = function (x, y) {
      return x + y
    }

    expect(add(5, 8)).to.eql(FILL_ME_IN)
  })

  it('화살표 함수 사용법을 익힙니다', function () {
    // function 키워드를 생략하고 화살표 => 를 붙입니다
    const add = (x, y) => {
      return x + y
    }
    expect(add(10, 20)).to.eql(FILL_ME_IN)

    // 리턴을 생략할 수 있습니다
    const subtract = (x, y) => x - y
    expect(subtract(10, 20)).to.eql(FILL_ME_IN)

    // 필요에 따라 소괄호를 붙일 수도 있습니다
    const multiply = (x, y) => (x * y)
    expect(multiply(10, 20)).to.eql(FILL_ME_IN)

    // 파라미터가 하나일 경우 소괄호 생략이 가능합니다
    const divideBy10 = x => x / 10
    expect(divideBy10(100)).to.eql(FILL_ME_IN)
  })

  it('화살표 함수를 이용해 클로저를 표현합니다', function () {
    const adder = x => {
      return y => {
        return x + y
      }
    }

    expect(adder(50)(10)).to.eql(FILL_ME_IN)

    const subtractor = x => y => {
      return x - y
    }

    expect(subtractor(50)(10)).to.eql(FILL_ME_IN)

    const htmlMaker = tag => textContent => `<${tag}>${textContent}</${tag}>`
    expect(htmlMaker('div')('code states')).to.eql(FILL_ME_IN)

    const liMaker = htmlMaker('li')
    expect(liMaker('1st item')).to.eql(FILL_ME_IN)
    expect(liMaker('2nd item')).to.eql(FILL_ME_IN)
  })
})