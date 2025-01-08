# 학습 내용
- [조건문](#조건문)
- [반복문](#반복문)

## 조건문
- 조건문이란 주어진 조건에 따라 코드를 실행하거나 실행하지 않는 문이다.

### `if`문
```javascript
if(조건식){
  실행문
}
```
- `if`문의 실행 코드가 한줄이라면 중괄호를 생략할 수 있지만, 코드의 흐름을 예상하기 어려워 지기 때문에 중괄호 사용을 하는 것이 적절하다.
```javascript
if(true)
  console.log('Is True');
  console.log('Is Not If');
```

- `else`를 사용해 분기문을 작성할 수도 있다.
```javascript
function solution(flag){
  if(flag){
    console.log('Is True');
  }else{
    console.log('Is False');
  }
}
```

- `else-if`문을 사용해 여러 방향으로 분기문을 작성할 수 있다.
```javascript
const score = 90;

if(score >= 90){
  'A+';
}else if(90 > score && score >= 80){
  'A';
}else if(80 > score && score >= 70){
  'B+';
}else if(70 > score && score >= 60){
  'B';
}else{
  'F';
}
```

- `if`문 안에 `if`문을 중첩해서 작성할 수 있다.
  - 하지만 코드의 들여쓰기 `depth`가 깊어질 수록 읽기 어려워지므로 `if-else`문으로 풀어서 작성하는 것이 좋다.
```javascript
let first = true;
let second = false;

if(first){
  console.log('첫 번째 조건 충족');
  if(second){
    console.log('두 번째 조건도 충족');
  }else{
    console.log('두 번째 조건은 불충족');
  }
}else{
  console.log('첫 번째 조건 불충족');
}


if(first && second){
  console.log('첫번째 조건 충족');
  console.log('두 번째 조건도 충족');
}else if(first){
  console.log('첫번째 조건 충족');
  console.log('두 번째 조건은 불충족');
}else{
  console.log('첫 번째 조건 불충족');
}
```

### `switch`문
- `switch`문은 `case`의 비교 조건식 값이 `true`일 때 해당 실행문을 실행하는 문법이다.
  - 일치하는 `case`를 발견하면 그 아래 `case`를 모두 실행하므로, 각 `case`마다 `break`문을 작성해 빠져나와야한다.
```javascript
let value = 'A';
switch(value){
  case 'A':
    'A';
}
```
- 아무것도 일치하지 않았을 때 실행하고 싶은 명령은 `default`문에서 처리한다.
```javascript
let value = 'F';
switch(value){
  case 'A':
    'A';
    break;
  case 'B':
    'B';
    break;
  case 'C':
    'C';
    break;
  default:
    '아무것도 일치하지 않음';
}
```

### 삼항 연산자
- 조건식이 참이라면 물음표 뒤 첫 번째 실행문을 실행하고, 아니라면 두번째 실행문을 실행하는 문법이다.
```text
 조건식 ? true 실행문 : false 실행문
```

```javascript
5 > 0 ? '참' : '거짓';
```

- 아래와 같이 중첩 삼항연산자를 작성할 수도 있다.
  - 가독성이 떨어지므로 괄호를 쳐서 구분하거나, 삼항연산자는 한번에 사용하는 것이 좋다고 생각한다.
```javascript
let foo = condition1 ? condition2 ? '둘다 참' : 'condition1만 참' : 'condition1이 거짓';
```

**1분 퀴즈**
다음 `if`문을 `switch`문으로 바꿔보세요.
```javascript
let cond = true;
let value = '';
if(cond){
  value = '참';
}else{
  value = '거짓';
}

//--------------------//

let cond = true;
let value = '';
switch(cond){
  case true:
    value = '참';
  case false:
    value = '거짓';
}
```

## 반복문

### `while`문
```javascript
while(조건식){
  실행문
}
```

### `for`문
```javascript
for(시작; 조건식; 종료식){
  실행문
}
```

- `for`문을 `while(true)`처럼 무한반복을 돌리려면 아래와 같이 시작, 조건식, 종료식을 모두 생략하면 된다.
```javascript
for(;;) {
  실행문
}
```

### 1부터 100까지 출력하기
- `while`문 (책 예제)
```javascript
let i = 0;
while(i < 100){
  console.log(i+1);
  i++;
}
```

- `for`문
```javascript
for(let i =0;i<100;i++){
  console.log(i+1);
}
```

### `break` `continue`문
- 모든 조건문, 반복문은 `break`키워드를 사용해 실행을 멈출 수 있다.
- `continue`문을 사용해 뒤의 실행문을 넘길 수 있다.

### 중첩 반복문
- 구구단을 출력하되, `continue`문을 사용해 결과에 홀수만 나오게 하세요.
```javascript
for(let i =2;i<=9;i++){
  for(let j =1;j<=9;j++){
    if(i % 2 == 0 || j % 2 == 0){
      continue;
    }
    console.log(`${i} * ${j} = ${i * j}`);
  }
}
```