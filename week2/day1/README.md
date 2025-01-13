# 학습 내용

- 비동기
- 스코프
- 클로저

## 비동기

- 동기(Synchronous)는 이전 작업이 완전히 끝난 후에 다음 작업이 실행되는 것을 의미한다.
- 비동기 (asynchronous)는 이전 작업이 끝나지 않았는데도 다음 작업이 실행되는 것을 의미한다.

### `setTimeout()`

- 타이머 함수 중 가장 자주 사용되는 함수다.
- 지정한 시간 뒤에 코드가 실행되게 하므로, 코드순서와 실제 작동 순서가 다른 대표적인 함수다.

```javascript
setTimeout(() => {
  console.log('2초 후 실행');
}, 2000);

// 다음과 같이 콜백 함수를 가져와 사용할 수 도 있다.
const callback = () => {
  console.log('2초 후 실행');
}

setTimeout(callback, 2000);
```

### ` setInterval()`

- 지정한 시간마다 주기적으로 지정한 함수를 실행한다.

```javascript
setInterval(함수, ms);
```

### `clearTimeout()` `clearInterval()`

- `setTimeout()`과 `setInterval()`은 웹페이지를 닫을 때까지 계속 실행되므로 중간에 종료시키는 타이머 정리 함수다.

## 스코프, 클로저

#### 블록 스코프와 함수 스코프

- 모든 병수에는 범위, `scope`가 존재한다.
    - `var`는 함수 스코프, `let`은 블록 스코프를 가진다.

```javascript
function func() {
  var a = 1;
}

console.log(a); // Uncaught ReferenceError 
```

- a는 함수 b()안에 선언된 변수라서 함수 바깥에서는 접근할 수 없다.
    - 함수 스코프는 함수가 끝날 때 함수 내부의 변수가 같이 사라진다고 볼 수 있다.

```javascript
if (true) {
  var a = 1;
}
console.log(a) // 1

if (true) {
  let b = 1;
}
console.log(b); // Uncaught ReferenceError
```

- `var`는 함수 스코프라서 if문 안에 있어도 바깥에서 접근이 가능하다.
- 하지만 `let`는 블록 스코프라서 특정 블록 안에 있다면 외부에서는 해당 변수에 접근이 불가능하다.
    - `let`, `const`는 블록 스코프를 가진다.
- 정리해보자면,
    - 함수 스코프인 `var`는 함수에 종속되어, 함수가 종료되면 해당 변수도 사라지고, 함수 외부에서 접근이 불가능하다.
    - 블록 스코프인 `let` `const`는 특정 블록(if, for, while, 또는 중괄호)에 종속되어, 블록 외부에서 접근이 불가능하다.

### 클로저와 정적 스코프

- 클로저(closure)는 외부 값에 접근하는 함수다.
    - 모든 JS 함수는 클로저가 될 수 있다.

```javascript
const a = 1;
const func1 = () => {
  console.log(a);
}
// 외부에 있는 변수 a를 사용하고 있으므로 클로저다./외부에 있는 변수 a를 사용하고 있으므로 클로저다.

const func2 = (msg) => {
  return () => {
    console.log(msg);
  }
}
// 위 고차함수도 자신의 외부에 있는 변수를 파라미터로 사용하므로 클로저다.
```

- 클로저가 외부 값에 접근할 수 있는지를 판단하는 기준은 스코프다.

### `let`과 `var`를 사용한 결과가 다른 이유

```javascript
const number = [1, 3, 5, 7];
for (var i = 0; i < number.length; i++) {
  setTimeout(() => {
    console.log(number[i]);
  }, 1000 * (i + 1));
}
```

- `setTimeout`의 콜백함수는 외부 변수 i에 접근하는 클로저다.
    - setTimeout()의 두번째 파라미터는 반복문을 돌 때 실행되고, 콜백함수(클로저)는 지정된 시간 뒤에 호출된다.
    - 클로저가 실행될 때는 이미 반복문이 다 돌아서 i = 4인 상태다.

| 상황      | 실행                             |
|---------|--------------------------------|
| i == 0  | `setTimeout(callback,1000)` 실행 |
| i == 1  | `setTimeout(callback,2000)` 실행 |
| i ==  2 | `setTimeout(callback,3000)` 실행 |
| i == 3  | `setTimeout(callback,4000)` 실행 |
| 1 초후    | callback 함수 실행 (i == 4)        |
| 2 초후    | callback 함수 실행 (i == 4)        |
| 3 초후    | callback 함수 실행 (i == 4)        |
| 4 초후    | callback 함수 실행 (i == 4)        |

```javascript
const number = [1, 3, 5, 7];
for (let i = 0; i < number.length; i++) {
  setTimeout(() => {
    console.log(number[i]);
  }, 1000 * (i + 1));
}
```

- `let`은 반복문을 돌 때마다 새로운 블록을 생성하고, 블록별로 i의 값이 고정된다.
- 따라서 클로저 내부의 i도 `setTimeout`을 호출할 때의 i와 같은 값이 들어간다.

| 상황      | 실행                                            |
|---------|-----------------------------------------------|
| i == 0  | 블록0 생성, i == 0,`setTimeout(callback,1000)` 실행 |
| i == 1  | 블록1 생성, i == 1,`setTimeout(callback,2000)` 실행 |
| i ==  2 | 블록2 생성, i == 2,`setTimeout(callback,3000)` 실행 |
| i == 3  | 블록3 생성, i == 3,`setTimeout(callback,4000)` 실행 |
| i == 4  | i < number.length == false 이므로 반복문 종료         |
| 1 초후    | callback 함수 실행 (i == 0)                       |
| 2 초후    | callback 함수 실행 (i == 1)                       |
| 3 초후    | callback 함수 실행 (i == 2)                       |
| 4 초후    | callback 함수 실행 (i == 3)                       |

- 그렇다면 `var`를 사용하면서 i의 값을 고정할 방법은 무엇이 있을까? 바로 고차함수를 사용하는 것이다.
- 고차함수의 파라미터로 값을 넣어줘 스코프를 하나 더 추가해 고정시키는 것이다.

```javascript
const number = [1, 3, 5, 7];
const helper = (j) => () => console.log(number[j], j);

for (var i = 0; i < number.length; i++) {
  setTimeout(helper(i), 1000 * (i + 1));
}
```

- 또 다른 방법은 콜백함수 마다 고정된 값을 가지고 있는 `forEach()`메서드를 사용하는 것이다.

```javascript
const number = [1, 3, 5, 7];

number.forEach((num, i) => {
  setTimeout(() => console.log(num, i), 1000 * (i + 1));
});
```

#### `switch`문에서의 스코프

- 아래와 같은 형태로 코드를 구성한다면 Uncaught SyntaxError 가 발생한다.
- 같은 스코프 안에서 동일한 이름의 변수를 선언하기 때문이다.
- 현재 블록 스코프는 switch 하나 밖에 없으므로, 각 case 별로 블록을 생성해주면 해결된다.

[잘못된 코드]

```javascript
const type = 'a';
switch (type) {
  case 'a':
    let name = '제로초';
    break;
  case 'b':
    let name = '레오';
    break;
  case 'c':
    let name = '체리';
    break;
}
```

[개선 코드]

```javascript
const type = 'a';
switch (type) {
  case 'a': {
    let name = '제로초';
    break;
  }
  case 'b': {
    let name = '레오';
    break;
  }
  case 'c': {
    let name = '체리';
    break;
  }
}
```