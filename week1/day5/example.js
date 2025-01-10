// 1. 사람(Human)클래스를 만들어보세요. 생성자 메서드에서는 이름과 나이를 속성으로 입력받고, 자신의 이름과 나이를 콘솔에 출력하는 메서드를 2개 만드세요.

class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  printName() {
    console.log(this.name);
  }

  printAge() {
    console.log(this.age);
  }
}

// 2.1번 문제에서 구현한 Human 클래스를 상속해 HTML,CSS, JS를 할줄 아는 개발자 클래스를 만들어 보세요.
// 속성으로 availableLanguages를 추가하고, availableLanguages를 콘솔에 표시하는 showAvailableLanguages() 메서드를 추가하세요.

class Developer extends Human {
  constructor(name, age, ...languages) {
    super(name, age);
    this.availableLanguages = languages;
  }

  showAvailableLanguages() {
    console.log(`사용 가능한 언어: ${this.availableLanguages.join(', ')}`);
  }
}

const dev = new Developer('Hong', 25, 'HTML', 'CSS', 'JS');
dev.printName();
dev.printAge();
dev.showAvailableLanguages();