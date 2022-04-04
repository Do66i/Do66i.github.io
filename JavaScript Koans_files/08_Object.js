describe('Object에 대해서 학습합니다.', function () {
  /*
    이번 스프린트에서는 객체의 기본적인 내용을 재확인합니다.
    이머시브 과정에서 객체를 보다 자세하게 학습하게 됩니다. (예. prototype)
  */
  it('Object의 기본을 확인합니다.', function () {
    const emptyObj = {};
    expect(typeof emptyObj === 'object').to.equal(FILL_ME_IN);
    expect(emptyObj.length).to.equal(FILL_ME_IN);

    const megalomaniac = {
      mastermind: 'Joker',
      henchwoman: 'Harley',
      getMembers: function () {
        return [this.mastermind, this.henchwoman];
      },
      relations: ['Anarky', 'Duela Dent', 'Lucy'],
      twins: {
        'Jared Leto': 'Suicide Squad',
        'Joaquin Phoenix': 'Joker',
        'Heath Ledger': 'The Dark Knight',
        'Jack Nicholson': 'Tim Burton Batman',
      },
    };

    expect(megalomaniac.length).to.equal(FILL_ME_IN);
    expect(megalomaniac.mastermind).to.equal(FILL_ME_IN);
    expect(megalomaniac.henchwoman).to.equal(FILL_ME_IN);
    expect(megalomaniac.henchWoman).to.equal(FILL_ME_IN);
    expect(megalomaniac.getMembers()).to.deep.equal(FILL_ME_IN);
    expect(megalomaniac.relations[FILL_ME_IN]).to.equal('Lucy');
    expect(megalomaniac.twins['Heath Ledger']).to.deep.equal('FILL_ME_IN');
  });

  it('Object의 속성(property)를 다루는 방법을 확인합니다.', function () {
    const megalomaniac = { mastermind: 'Agent Smith', henchman: 'Agent Smith' };

    expect('mastermind' in megalomaniac).to.equal(FILL_ME_IN);

    megalomaniac.mastermind = 'Neo';
    expect(megalomaniac['mastermind']).to.equal(FILL_ME_IN);

    expect('secretary' in megalomaniac).to.equal(FILL_ME_IN);

    megalomaniac.secretary = 'Agent Smith';
    expect('secretary' in megalomaniac).to.equal(FILL_ME_IN);

    delete megalomaniac.henchman;
    expect('henchman' in megalomaniac).to.equal(FILL_ME_IN);
  });

  it("'this'는 method를 호출하는 시점에 결정됩니다.", function () {
    const currentYear = new Date().getFullYear();
    const megalomaniac = {
      mastermind: 'James Wood',
      henchman: 'Adam West',
      birthYear: 1970,
      calculateAge: function (currentYear) {
        return currentYear - this.birthYear;
      },
      changeBirthYear: function (newYear) {
        this.birthYear = newYear;
      },
    };

    expect(currentYear).to.equal(FILL_ME_IN);
    expect(megalomaniac.calculateAge(currentYear)).to.equal(FILL_ME_IN);

    megalomaniac.birthYear = 2000;
    expect(megalomaniac.calculateAge(currentYear)).to.equal(FILL_ME_IN);

    megalomaniac.changeBirthYear(2010);
    expect(megalomaniac.calculateAge(currentYear)).to.equal(FILL_ME_IN);

  /**
   * !!Advanced [this.mastermind]? this.birthYear? this가 무엇일까요?
   * 
   * method는 '어떤 객체의 속성으로 정의된 함수'를 말합니다. 위의 megalomaniac 객체를 예로 든다면,
   * getMembers는 megalomaniac 객체의 속성으로 정의된 함수인 '메소드'라고 할 수 있습니다. megalomaniac.getMembers()와 같은 형태로 사용(호출)할 수 있죠.
   * 사실은, 전역 변수에 선언한 함수도 웹페이지에서 window 객체의 속성으로 정의된 함수라고 할 수 있습니다. 
   * window. 접두사 없이도 참조가 가능하기 때문에(window.foo()라고 사용해도 됩니다.), 생략하고 쓰는 것뿐입니다. 이렇듯, method는 항상 '어떤 객체'의 method입니다.
   * 따라서 호출될 때마다 어떠한 객체의 method일 텐데, 그 '어떠한 객체'를 묻는 것이 this입니다.
   * 예시로, obj이라는 객체 안에 foo라는 메서드를 선언하고, this를 반환한다고 했을 때 ( 예: let obj = {foo: function() {return this}}; )
   * obj.foo() === obj 이라는 코드에 true라고 반환할 것입니다.
   * this는 함수의 호출에 따라서 값이 달라지기도 합니다. (apply나 call, bind에 대해서는 하단의 학습자료를 통해 더 공부해 보세요.)
   * 
   * 그러나 화살표 함수는 다릅니다. 자신의 this가 없습니다.
   * 화살표 함수에서의 this는 자신을 감싼 정적 범위(lexical context)입니다. (전역에서는 전역 객체를 가리킵니다.)
   * 일반 변수 조회 규칙(normal variable lookup rules)을 따르기 때문에, 현재 범위에서 존재하지 않는 this를 찾을 때, 화살표 함수 바로 바깥 범위에서 this를 찾습니다.
   * 그렇기에 화살표 함수를 사용할 때, 이러한 특이점을 생각하고 사용해야 합니다.
   * 
   * 이와 관련하여, this에 대해서 더 깊이 학습하셔도 좋습니다.
   * 가이드가 될 만한 학습자료를 첨부합니다.
   * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
   */
  });

  it('객체의 method를 정의하는 방법을 확인합니다.', function () {
    const megalomaniac = {
      mastermind: 'Brain',
      henchman: 'Pinky',
      getFusion: function () {
        return this.henchman + this.mastermind;
      },
      battleCry(numOfBrains) {
        return `They are ${this.henchman} and the` + ` ${this.mastermind}`.repeat(numOfBrains);
      },
    };

    expect(megalomaniac.getFusion()).to.deep.equal(FILL_ME_IN);
    expect(megalomaniac.battleCry(3)).to.deep.equal(FILL_ME_IN);
  });

  it('Object를 함수의 인자로 전달할 경우, reference가 전달됩니다.', function () {
    const obj = {
      mastermind: 'Joker',
      henchwoman: 'Harley',
      relations: ['Anarky', 'Duela Dent', 'Lucy'],
      twins: {
        'Jared Leto': 'Suicide Squad',
        'Joaquin Phoenix': 'Joker',
        'Heath Ledger': 'The Dark Knight',
        'Jack Nicholson': 'Tim Burton Batman',
      },
    };

    function passedByReference(refObj) {
      refObj.henchwoman = 'Adam West';
    }
    passedByReference(obj);
    expect(obj.henchwoman).to.equal(FILL_ME_IN);

    const assignedObj = obj;
    assignedObj['relations'] = [1, 2, 3];
    expect(obj['relations']).to.deep.equal(FILL_ME_IN);

    const copiedObj = Object.assign({}, obj);
    copiedObj.mastermind = 'James Wood';
    expect(obj.mastermind).to.equal(FILL_ME_IN);

    obj.henchwoman = 'Harley';
    expect(copiedObj.henchwoman).to.equal(FILL_ME_IN);

    delete obj.twins['Jared Leto'];
    expect('Jared Leto' in copiedObj.twins).to.equal(FILL_ME_IN);

    /*
    마지막 테스트 코드의 결과가 예상과는 달랐을 수도 있습니다.
    'Object.assign'을 통한 복사는 reference variable은 주소만 복사하기 때문입니다. 
    이와 관련하여 얕은 복사(shallow copy)와 깊은 복사(deep copy)에 대해서 학습하시기 바랍니다.
    가이드가 될 만한 학습자료를 첨부합니다.
      https://scotch.io/bar-talk/copying-objects-in-javascript
      https://medium.com/watcha/깊은-복사와-얕은-복사에-대한-심도있는-이야기-2f7d797e008a
    */
  });
});
