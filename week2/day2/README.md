# 학습 내용

- [호출 스택 / 이벤트 루프](#호출-스택과-이벤트-루프)
- [Promise, async/await](#promise와-asyncawait)

## 호출 스택과 이벤트 루프

- 호출 스택은 동기 코드, 이벤트 루프는 비동기 코드를 담당한다.
- 비동기 코드 실행에는 `백그라운드`와 `태스크 큐`가 사용된다.
    - `백그라운드`: 타이머를 처리하고 이벤트 리스너를 저장하는 공간
        - 타이머 함수가 실행되면 백그라운드에서 시간을 재다가 지정 시간이 되면 콜백 함수를 태스크 큐로 이동
        - `addEventListener()`로 추가한 이벤트를 저장했다가 이벤트가 발생하면 콜백 함수를 태스크 큐로 이동
    - `태스크 큐`: 실행될 콜백 함수들이 대기하는 공간
        - 태스크 큐에 먼저 들어온 함수 부터 실행됨.
        - 태스크 큐에 있는 함수를 `이벤트 루프`가 호출 스택으로 이동
- 비동기 코드 동작 구조
    - 백그라운드에 콜백 함수를 태스크 큐로 이동 -> 태스크 큐에서 순서대로 이벤트 루프가 호출 스택으로 함수 이동 -> 호출 스택에서 함수 실행

**다음 코드를 실행할 때 콘솔에 어떤 순서로 알파벳이 출력되는지 호출 스택과 이벤트 루프를 사용해 설명해 보세요.**

```javascript
function aaa() {
  setTimeout(() => {
    console.log('d');
  }, 0);
  console.log('c');
}

setTimeout(() => {
  console.log('a');
  aaa();
}, 0);

setTimeout(() => {
  aaa();
  console.log('b');
}, 0);

// a c c b d d
// 첫 번째 setTimeout을 실행하며 console.log('a')와 aaa()가 호출된다. 동기 코드이므로 호출 스택에는 console.log('a')가 쌓이고, aaa() 에서 console.log('c')가 호출 스택으로,
// setTimeout(()=>console.log('d')) 가 백그라운드로 이동. 지정된 시간 후 태스크 큐로 이동함.
// 두 번째 setTimeout을 실행하며 aaa()와 console.log('b')가 호출. aaa()에서 console.log('c')가 호출 스택으로, setTimeout이 백그라운드로 이동. 이후 console.log('b')가 호출 스택으로 이동.
// 호출 스택: a c c b, 백그라운드: d d 로 정리되며, 지정된 시간(0ms)이후 백그라운드에서 태스크 큐로 d d 가 순서대로 이동하며 출력.
```

### 재귀 함수

- 함수 내부에서 자기 자신을 다시 호출하는 함수를 의미함.

```javascript

let i = 0;

function recurse() {
  i++;
  recurse();
}

recurse();
```

- 위 코드를 실행하면 Maximum call stack size exceeded 라는 에러 메시지가 출력된다.
    - 호출 스택은 함수를 담을 수 있는 최대 크기가 정해져 있는데, 이 크기를 초과해 스택에 함수가 쌓였기 때문이다.
- 함수가 호출 스택의 최대 크기보다 더 쌓여야 한다면 비동기 함수를 사용하는 방법이 가장 간단하다.
    - 재귀 함수의 내부를 `setTimeout()`등으로 감싸고 시간은 0초로 해서 즉 시 호출되게 하면 된다.

```javascript
let i = 0;

function recurse() {
  i++;
  if (i > 20000) {
    return;
  }

  setTimeout(recurse, 0);
}
```

- 위 코드는 내부 동작을 `setTimeout()`으로 감싸 백그라운드로 보내버려 호출 스택에는 2개 이상의 `recurse()`가 쌓이지 않으므로 호출 스택의 최대 크기를 초과할 일이 없다.

## Promise와 async/await

### Promise

- 프로미스는 `Promise`라는 클래스를 사용하는 문법이다.
    - 실행된 결과 값을 저장하고 있으며 언제든지 필요할 때 그 값을 꺼낼 수 있는 객체다.
    - `new`키워드를 붙여 `Promise`클래스를 호출하면 객체를 생성하는데, 이때 인수로 콜백 함수를 넣는다.
    - 파라미터로는 `resolve()`와 `reject()`가 있다.

```javascript
const promise = new Promise((resolve, reject) => {
  resolve(); // 프로미스 성공

  reject(); // 프로미스 실패
})
```

- 프로미스 객체에는 `then()`메서드나 `catch()`메서드를 붙일 수 있다.
    - `then()`의 콜백 함수는 `resolve()` 함수를 호출할 때 실행되고, `catch()`의 콜백함수는 `reject()`함수를 호출할 때 실행된다.
    - `reject()`를 호출 했는데 `catch()`메서드를 붙이지 않으면 에러가 발생한다.

```javascript
const promise1 = new Promise((resolve, reject) => {
  resolve('success');
});

promise1.then(data => console.log(data)) // success 

const promise2 = new Promise((resolve, reject) => {
  reject('error');
});

promise2.catch(error => console.log(error)); // error
```

- 프로미스의 장점은 then()이나 catch() 메서드를 나중에 필요할 때 붙일 수 있다는 것이다.

```javascript
const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
});

const promise = setTimeoutPromise(0);

console.log('다른 일을 하다가');
console.log('필요할 때');
console.log('then을 호출해 보세요.');
promise.thne(() => {
  console.log('0초 뒤에 실행됩니다.')
})
promise.catch(e => console.log('에러 발생시 실행됨'));
```

- `then()`이나 `catch()`는 메서드체이닝이 가능하다.

```javascript
const promise = setTimeoutPromise(0);

promise.then(() => 'a')
.then(data => {
  console.log(data);
  return 'b'
})
.then(data => console.log(data));
```

- `finally()`메서드는 `then()` `catch()`의 실행이 끝난 후에 무조건 실행하는 메서드다.

### `async` / `await`

- 프로미스로 작성된 코드는 여전히 코드의 작성 순서와 실행 순서가 다르다.

```javascript
const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
})

setTimeoutPromise(1000).then(() => console.log('1초 뒤에 실행됩니다.'));
console.log('내가 먼저');
```

- 위 코드는 '내가 먼저'가 '1초 뒤에 실행됩니다.' 보다 먼저 출력된다. 이것을 개선하려면 `async/await`를 사용해야한다.

```javascript
const setTImeoutPromise = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

await setTimeoutPromise(1000);
console.log('1초 뒤에 실행됩니다.');
console.log('내가 나중에');
```

- 단, 프로미스가 아닌 비동기 코드에 `await`를 적용하는 것은 의미가 없다. 아래 코드는 작성한 순서대로 실행되지 않는다.

```javascript
await setTimeout(() => {
  console.log('1초 뒤에 실행됩니다.');
});
console.log('내가 먼저');
// 내가 먼저
// 1초 뒤에 실행됩니다.
```

- `setTimeout()`은 프로미스가 아니므로 `await`가 적용되지 않는다.
    - `setTimeout()`을 프로미스로 바꾼 뒤 `await`를 붙이면 적용된다.

```javascript
const setTimeoutProimise = (ms) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
});

async function main() {
  await setTimeoutProimise(1000);
  console.log('1초 뒤에 실행됩니다.');
  console.log('내가 나중에');
}
```

- `await`는 `async` 함수에서만 사용할 수 있으므로, `function` 키워드 앞에 `async` 키워드를 붙여야한다.
- 화살표 함수도 앞에 `async`를 붙여 `async` 함수로 만들 수 있다.

```javascript
const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
});

const main = async () => {
  await setTimeoutPromise(1000);
  console.log('1초 뒤에 실행됩니다.');
}

main();
```

### try / catch

- Promise에는 `catch()`라는 예외처리 메서드가 있지만 `await`에는 없으므로, try-catch 문으로 예외처리를 해줘야한다.
- `catch`문의 파라미터는 사용하지 않는 경우 생략할 수 있고, `try-catch-finally`문으로 구성 가능하다.

```javascript
const promise = new Promise((resolve, reject) => {
  reject('error!');
});

try {
  await promise;
} catch (error) {
  console.log(error);
}
```
