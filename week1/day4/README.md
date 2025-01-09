# 학습내용

- [객체](#객체)
- [함수](#함수)

## 객체

- 객체란 다양한 값을 모아둔 또 다른 자료형이다.
- 객체의 종류는 크게 배열, 함수, 그외의 객체로 나눌 수 있다.

### 배열 Array

- 배열은 하나의 변수에 여러 값을 선언할 수 있다.

```javascript
const apple = '사과';
const orange = '오렌지';
const pear = '배';
const strawberry = '딸기';

const fruits = ['사과', '오렌지', '배', '딸기'];
console.log(fruits[0]); // '사과' 출력. 0-Based Index
```

- JS의 배열은 서로 다른 자료형을 하나의 배열로 선언할 수 있다.

```javascript 
const array = ['사과', 0, null];
```

- 배열의 요소 개수 구하기

```javascript
const array = ['사과', 1, undefined, true, '배열', null];
array.length; // 6
```

**arr 란 배열이 있을 때, 배열의 마지막에서 세 번째 요소를 찾는 방법?**

```javascript
array[array.length - 3];
array.at(-3);
```

#### 배열에 요소 추가하기

- 배열 맨 뒤에 새로운 요소를 추가하려면 `array[array.length]`에 값을 넣으면 된다.
- 배열 맨 앞에 값을 추가하기 위해선 `unshift()` 함수를 사용한다.
- `push()`를 사용하면 `array[array.length]`로 추가하는 것과 동일한 작동을 한다.

#### 배열에 요소 삭제하기

- `pop()`을 사용하면 맨 뒤 요소가 삭제된다.
- `shift()`를 사용하면 맨 앞 요소가 삭제된다.
- 중간 요소를 삭제하려면 `splice(start, count(optional))`를 사용한다.

#### 배열에서 요소 찾기

- 존재 여부를 확인할 때는 `includes()`를 사용한다. 리턴값은 `boolean`
- `indexOf()`는 앞에서 부터, `lastIndexOf()`는 뒤에서부터 몇 번째 인덱스에 있는지 알려준다.
    - 만약 존재하지 않는다면 -1을 리턴한다.
    - 또한 찾는 요소의 자료형과 일치시켜야 한다.

#### 배열 자르고 합치기

- 자를 때는 `array.slice(start, end)`형태로 호출한다.
- 합칠 때는 `array.concat(value1, value2, ...)`형태로 호출한다.

**indexOf()와 splice()를 사용해 다음 배열에서 '라'를 모두 삭제해 보세요**

```javascript
const arr = ['가', '라', '다', '라', '마', '라'];
const removeKeyword = '라';

for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] = removeKeyword) {
    arr.splice(i, 1);
  }
}
```

#### 2차원 배열

- 배열의 요소로 배열이 들어가 있으면 2차원 배열이라고 한다.

**'a', null, 1, undefined, NaN, true, '', 0을 4행 2열의 이차원 배열로 구성해보세요.**

```javascript
const array = [
  ['a', null],
  [1, undefined],
  [NaN, true],
  ['', 0]
];
```

**for문으로 5행 4열 2차원 배열을 만들어보세요. 배열의 요소는 모두 1로 넣습니다.**

```javascript
const array = [];
for (let i = 0; i < 5; i++) {
  array[i] = [];
  for (let j = 0; j < 4; j++) {
    array[i][j] = 1;
  }
}
```

#### `flat()` `fill()`

- `flat()`배열의 차원을 한 단계 낮추는 기능을 한다.
    - 2차원 배열이라면 1차원 배열로 낮춘다.

```javascript
const array = [[1, 2, 3], [4, 5, 6][7, 8, 9]];
array.flat(); // [1,2,3,4,5,6,7,8,9]

const array2 = [1, 2, 3, [[4, 5, 6], [7, 8, 9]]];
array2.flat() // [1,2,3,[4,5,6,7,8,9]];
```

### 함수

- 특정한 작업을 수행하는 코드를 의미한다.

#### 함수 선언하기

- 함수를 만들 때는 `function` 키워드를 사용하거나 화살표 `=>`를 사용한다.
- 이런 이름 없는 함수는 익명함수라고 한다.

```javascript
function () {
};
() => {
};
```

- 함수에 이름을 붙여야 다른 곳에서 호출해서 사용할 수 있다.

```javascript
function solution() {
}

const solution = function () {
};
const solution = () => {
}
```

### 객체 리터럴

- 객체는 여러 변수를 하나의 변수로 묶을 때 사용한다.

```javascript
const name = '조현영';
const year = 1994;
const month = 8;
const date = 12;
const gender = 'M';

// K, V 형태로 값을 저장한다.
const zerocho = {
  name: '조현영',
  year: 1994,
  month: 8,
  date: 12,
  gender: 'M',
}
```

#### 객체 속성을 추가/수정/삭제 하기

- 추가할 때는 객체 변수.속성 = 값 형태로 코드를 실행해야 한다.

```javascript
zerocho.married = false;
```

- 수정할때는 변수.속성 = 값 형태로 코드를 실행한다.

```javascript
zercho.gender = 'F';
```

- 삭제할때는 `delete` 키워드를 사용한다.

```javascript
delete zercho.gender;
```

#### 메서드

- 객체의 속성 값으로 함수가 들어가면 메서드라고 한다.
-

**다음과 같이 객체 안에 객체가 있을 때, '조'를 '김'으로 수정하는 방법은 무엇일까요?**

```javascript
const zerocho = {
  name: {
    first: '현영',
    last: '조',
  },
  gender: 'm',
}

zerocho.name.last = '김';
```

### 참조와 복사

```javascript
const a = {name: 'zerocho'};
const b = a;
a.name = 'hero';
```

- 위 예제 코드를 보면 변수 b에 a를 대입한 후 a의 name 값을 변경하면 b의 name 값도 변경된다.
    - 객체를 저장한 변수에 다른 변수를 대입하면 두 변수 모두 같은 객체를 저장하는 것이다.
- 객체 a의 데이터가 저장된 메모리 주소를 b도 참조하기 때문이다.

#### 얕은, 깊은 복사

- 얕은 복사는 외부 객체만 복사되고 내부 객체는 참조를 유지하는 복사다.
- 깊은 복사는 내부 객체까지 참조관계가 끊기면서 복사된다.

```javascript
const array = [{j: 'k'}, {l: 'm'}];
const shallow2 = array.slice(); // 얕은 복사
const shallow3 = array.concat(); // 얕은 복사

const deep = JSON.parse(JSON.stringify(array)) // 깊은 복사
```

### 구조분해 할당

- 객체에서 객체의 속성 명과 대입하는 변수명이 같을 떄 다음과 같이 줄여서 쓸 수 있다.

```javascript
const person = {name: '제로초'};
const name = person.name;

const {name} = person; // const name = person.name 과 같은 의미다.
```

**다음 객체에서 a, c, e 속성을 구조분해 할당 문법으로 변수에 할당해보세요.**

```javascript
const obj = {
  a: 'hello',
  b: {
    c: 'hi',
    d: {e: 'wow'},
  },
};

const {a, b: {c, d: {e}}} = obj;
```

### 유사 배열 객체

- 객체 중에 배열과 헷갈리게 생긴 객체가 있다.

```javascript
const array = {
  0: 'hello',
  1: 'I\'m',
  2: 'Object',
  lenth: 3,
}

array[0]; // 'hello'
array[1]; // "I'm"
array[2]; // 'Object
array.length; // 3
array.push(1); // Uncaught TypeError: array.push is not a function
```

- 배열 모양을 했지만 배열이 아닌 객체를 유사 배열 객체라고 한다. 배열이 아니므로 배열의 메서드를 사용할 수 없으므로, 배열 메서드를 사용하려면 `Array.from()`메서드로 유사배열 객체를 배열로 바꿔야한다.

```javascript
Array.from(array).indexOf('hello');
```

### 함수를 인수로 받는 배열 메서드

#### `forEach()` `map()`

- `forEach()`는 배열을 순회하며 반복적인 작업을 진행할 때 for문을 사용하지 않고도 수행할 수 있게 한다.
- 인수로 받은 함수의 파라미터는 (요소, 인덱스) 순서로 적용된다.
- 다른 메서드에 인수로 넣었을 때 실행되는 함수를 콜백함수라고 한다.
- 사용하지 않는 파라미터는 생략해도 된다. 예를 들어 인덱스를 사용하지 않는다면 아래 코드에서 `idx`는 생략해도 된다.
    - 단 값은 사용하지 않고 인덱스만 사용한다면 두 파라미터를 모두 작성해야한다. 인덱스는 두번쨰 파라미터로 고정되어 있기 때문이다.

```javascript
const array = [1, 5, 4, 2];

array.forEach((num, idx) => {
  console.log(num, idx);
});
```

- `map()`은 배열 요소들을 1:1로 짝지어서 다른 값으로 변환해 새로운 배열을 반환하는 메서드다.
    - 콜백함수를 인수로 받지만, 새로운 배열을 반환한다는 점이 반환값이 없는 `forEach()`와의 차이점이다.

```javascript
const numbers = [];
for (let i = 1; i <= 5; i++) {
  numbers.push(i);
}

const numbers = Arrays(5).fill(1).map((v, i) => i + 1);
```

**forEach() 메서드를 사용한 코드를 for문으로 바꿔보세요.**

```javascript
const array = [1, 3, 5, 7];
array.forEach((number, index) => {
  console.log(number, index);
})

for (let i = 0; i < array.length; i++) {
  console.log(array[i], i);
}
```

**Array(),fill(),map() 메서드를 사용해 [3,5,7,9,11] 배열을 만들어 보세요.**

```javascript
const array = Array(5).fill().map((value, idx) => idx * 2 + 3);
```

#### `find()` `findIndex()` `filter()`

- `find()`는 콜백함수의 반환값이 `true`인 요소를 찾는 메서드다
    - 단, `true`인 요소가 여럿일 경우 처음 찾는 요소를 반환한다.

```javascript
const array = [1, 3, 5, 7];
array.find((v, i) => v > 1);
```

- 배열 내부에 객체가 있을 때도 `find()`메서드가 유용하게 사용된다.

```javascript
const array = [{age: 29}, {age: 5}, {age: 3}];
array.includes({age: 29}); // false
```

- `{age: 29}`를 포함하고 있는지 `includes()`를 사용하는데, `{age: 29} !== {age:29}`이므로 `false`가 나온다.

```javascript
const array = [{age: 29}, {age: 5}, {age: 3}];
array.find((v) => v.age === 29);
```

- `findIndex()`는 찾은 요소의 인덱스를 반환하고, 없다면 -1을 반환한다.
- `filter()`는 반환값이 `true`인 모든 요소를 배열로 반환한다.

**다음 find() 메서드를 for문으로 만들어보세요.**

```javascript
const find = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      return array[i];
    }
  }
}

find([1, 3, 5, 7], (v, i) => {
  v > 1
});
```

**filter() 메서드도 for문으로 만들어 보세요.**

```javascript

const filter = (array, callback) => {
  const arr = [];
  for (let i = 0; i < array.lenth; i++) {
    if (callback(array[i])) {
      arr.push(array[i]);
    }
  }
  return arr;
}

filter([1, 3, 5, 7], (v, i) => v > 1);
```

#### `sort()`

- 정렬메서드다. 콜백함수로 정렬 기준을 넣어주면 그에 맞게 정렬해준다.
    - 예를들어, `(a,b) => a-b`로 작성하면 오름차순, `b-a`로 작성하면 내림차순 정렬한다.

#### `reduce()`

- 반복 메서드로, 배열의 요소들을 하나의 값으로 합친다. 초기 값이 없다면 배열의 첫번째 요소가 초기값이 된다.

```javascript
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

array.reduce((prev, cur) => prev + cur, 0);
```

**다음 코드의 결과는?**

```javascript
[1, 2, 3, 4, 5].reduce((a, c) => {
  a[c] = c * 10;
  return a;
}, {});

// 초기값이 객체로 선언되었다. 따라서 아래 객체와 같은 형태로 리턴된다.
const result = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
};
```

#### `every()` `some()`

- 배열에서 모든 요소가 조건에 해당하는지 판단하려면 `every()`메서드를 사용한다.
- 하나라도 조건에 해당하는지 판단하려면 `some()`메서드를 사용한다.
    - 각각 Java Stream API의 `filter().allMatch()`와 `filter().anyMatch()`와 유사한 동작을 한다.
- 두 메서드 모두 조건이 충족 또는 불충족 되는 순간 멈추므로 일반 반복문 보다 효율적이다.

**1. 다음 배열에 하나라도 null이 아니면 true를 반환하고, 아니면 false를 출력하는 코드를 작성하세요.**
**2. 1번에서 작성한 코드를 for문으로 작성해보세요.**

```javascript
const array = [null, 'hello', null, undefined, false];

array.some(v => v !== null); // 1번

function isNotNull(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== null) {
      return true;
    }
  }
  return false;
} // 2번
```

