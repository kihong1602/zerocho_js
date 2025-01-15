# 학습 내용

- [DOM](#DOM)
- [이벤트/이벤트리스너](#이벤트--이벤트-리스너)
- [다양한 DOM 속성](#다양한-dom-속성)
- [window 객체](#window-객체)

## DOM

- JS로 HTML을 조작하려면 DOM과 선택자에 대해 이해해야한다.

#### 코드 컨벤션

- 변수명 앞에 `$$`이 붙으면 `NodeList`를 저장하는 변수
- 변수명 앞에 `$`이 붙으면 태그를 저장하는 변수

### 선택자

- 자바스크립트에서 HTML 태그를 가져오는 것을 선택한다고 표현한다.
- `document.querySelector()`라는 메서드를 사용한다.
- 선택자(selector)는 HTML 태그를 가져오게 도와주는 문자열이다.
- 여러개의 태그를 한번에 선택하고 싶다면 `document.querySelectorAll()`을 사용한다.

#### id 속성으로 특정 태그 선택하기

- `document.querySelector('#<attr_name>')` 형태로 호출한다.

#### class 속성으로 여러 태그 선택하기

- id 속성은 각 태그별로 고유하기 때문에 2개를 동시에 선택할 때는 사용할 수 없다.
- 이럴 때 HTML의 class 속성을 사용하여 여러 태그를 선택할 수 있다.
- `document.querySelectorAll('.<class_name>')` 형태로 호출한다.

**a 태그 안에 id가 b인 태그 안에 class가 c인 태그를 선택하려면 어떤 선택자를 사용해야 하나요?**

```javascript
document.querySelector('a #b .c');
```

#### 태그 안의 태그 선택하기

- 태그 내부의 다른 태그를 선택하는 방법도 있다.
    - 예를 들어 <div> 안에 <span>이 있다면,

```javascript
const $span = document.querySelector('div span');
```

### 태그의 값에 접근하기

- 태그 자체가 아니라 태그 내부에 있는 텍스트가 필요한 경우가 많다.
- 태그 내부의 텍스트를 JS로 가져오거나, 태그 내부에 접근해 텍스트를 수정해야하는 경우다.

#### 텍스트와 태그 가져오기

- `document.querySelector()`로 가져온 값에 `textContent`로 태그의 텍스트에 접근 가능하다.
- `innterHTML`을 사용하면 내부의 HTML 태그까지 전부 가져온다.

#### 텍스트와 태그 변경하기

- `textContent`에 값을 할당해주면 해당 태그 내부의 값이 변경된다.

#### 입력 태그의 값을 가져와 변경하기

- 입력태그의 값을 얻은 후 변경하기 위해선 `value`속성에 접근해야한다.
- input 태그는 값을 `value`속성에 저장하기 때문
- `focus()` 메서드는 입력태그 내부에 커서를 위치하게 한다.

## 이벤트 / 이벤트 리스너

- 사용자가 태그와 상호작용할 때 이벤트가 발생한다.
- input 태그에 입력하면 input 이벤트가, 버튼을 클릭하면 click 이벤트가 발생한다.
- JS는 이벤트를 자동으로 감지할 수 없으므로, 이벤트 리스너를 추가해서 이벤트를 감지한다.

### 이벤트 리스너

- 태그에 `addEventListener(<event_name>,<동작>)`를 사용해 이벤트를 감지한다.

```javascript
const onClickButton = () => {
  console.log('버튼 클릭');
}

const $button = document.querySelector('button');
$button.addEventListener('click', onClickButton);

const onInput = e => console.log('글자입력', e.target.value);

const $input = document.querySelector('input');
$input.addEventListener('input', onInput);
```

- 객체의 메서드 내부에서는 `this`가 바뀔 수 있다.
    - `addEventListener`는 `this`를 바꾸는 대표적인 메서드다.

```javascript
document.addEventListener('click', function () {
  console.log(this);
});
// 이벤트리스너가 this를 document로 변경하여 document가 출력됨.
```

- 이벤트 리스너를 제거하기 위해선 `removeEventListener()`를 사용한다.
    - 단, 익명함수를 이벤트 리스너로 등록한 경우 `removeEventListener`로 제거할 수 없다.

```javascript
function func() {

}

foo.addEventListener('click', func());
foo.removeEventListener('click', func());
```

### 키보드와 마우스 이벤트

#### 키보드 이벤트

- 키를 누를 때(keydown), 키를 뗐을 때(keyup) 발생하는 이벤트를 감지할 수 있다.

```javascript
window.addEventListener('keyup', e => console.log('keyup', e));
window.addEventListener('keydown', e => console.log('keydown,e'));
```

#### 마우스 이벤트

- 마우스를 움직이면 `mousemove`, 마우스를 클릭하면 `mousedown`, 클릭 후 뗄 때는 `mouseup`이벤트가 발생한다.
    - clientX,clientY: 현재 웹페이지 내에서의 x, y 좌표를 가리킨다.
    - pageX, pageY: 현재 웹페이지 내에서의 x, y 좌표를 가리키지만, 스크롤이 있으면 스크롤한 픽셀 값 까지 포함한다.
    - offsetX, offsetY: 이벤트를 연결한 대상을 기준으로 마우스의 x, y 좌표를 가져온다.
    - screenX,screenY: 모니터를 기준으로 모니터 왼쪽 모서리가 0이 된다.
    - movementX, movementY: 지난 mousemove 이벤트와 비교해 얼마나 마우스를 움직였는지 표시한다. mousemove 이벤트일 때만 실제 값이 잡힌다.

```javascript
window.addEventListener('mousedown', e => console.log('mousedown', e));
window.addEventListener('mousemove', e => console.log('mousemove', e));
window.addEventListener('mouseup', e => console.log('mouseup', e));
```

### 이벤트 버블링과 캡처링

#### 이벤트 버블링

- 이벤트가 발생할 때 부모 태그에도 동일한 이벤트가 발생하는 현상

```html

<body>
	<table style="border: solid">
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
		</tr>
	</table>
	<script>
		document.querySelector('td').addEventListener('click', () => console.log('td 클릭'));
		document.querySelector('tr').addEventListener('click', () => console.log('tr 클릭'));
		document.querySelector('table').addEventListener('click', () => console.log('table 클릭'));
	</script>
</body>
```

- 위 코드에서 td를 클릭해 click 이벤트가 발생하면 td 태그의 부모인 tr, tr 태그의 부모인 table 태그에도 이벤트가 발생한다.
- 이벤트 버블링이 발생하면 이벤트 리스너 콜백 함수의 event.target은 이벤트가 처음 발생한 태그로 바뀐다.
- 이벤트가 발생한 태그가 아닌 이벤트를 연결한 태그에 접근하고 싶다면 `event.currentTarget`을 사용하거나, 함수 선언문과 this를 사용해야 한다.

#### 이벤트 캡처링

- 이벤트가 자식 태그로 전파되어 내려가는 현상
- `addEventListener`의 세 번째 파라미터로 true를 넣으면 이벤트가 자식 태그로 전파된다.

```html

<script>
	document.querySelector('td').addEventListener('click', e => {
		console.log('td');
		console.log(e.target);
		console.log(e.currentTarget);
	}, true)
</script>
```

**2. 버튼을 클릭하면 'hello, event bubbling'을 대화상자에 표시하도록 alert()를 사용해 다음 코드를 수정해보세요. 단, 이벤트리스너를 button태그에 달아서는 안됩니다.**

```html

<header>
	<div>
		<button>클릭</button>
	</div>
</header>
<script>
	document.querySelector('div').addEventListener('click', () => alert('hello,event bubbling'), true);
</script>
```

## 다양한 DOM 속성

### 태그 속성 다루기

- input 태그의 type, name, value 속성은 다음과 같이 접근할 수 있다.

```javascript
const $input = document.querySelector('input');
$input.type;
$input.name;
$input.value;
```

- 만약 속성이름에 `-`이 들어가 있다면 카멜케이스로 사용해야한다.
- HTML class 속성은 JS의 class와 헷갈릴 수 있으므로 className을 사용한다.

```javascript
tag.className = '클래스1 클래스2';
// 이런식으로 하면 기존 클래스를 새로 덮어 씌운다.

tag.classList.add('클래스1', '클래스2');
// classList를 사용해 add, replace, remove를 할 수 있다.
```

**다음 태그의 클래스는 어떻게 될까요?**

```javascript
tag.clssName = 'wow';
tag.classList.add('hello', 'hi', 'hello', 'bye');
tag.classList.replace('bye', 'seeu');
tag.classList.remove('bye');

// wow hello hi seeu
```

#### 부모와 자식 태그 찾기

- `parentNode`, `children` 속성을 사용해 태그의 부모나 자식 태그를 찾을 수 있다.
- 자식 태그는 여러 개일 수 있으므로 유사배열 객체가 나온다.

#### 새로운 태그 만들기

- `document.createElement`와 `document.createTextNode`는 각각 태그와 텍스트를 만드는 메서드다.
- 다른 태그 내부에 만든 태그를 추가하려면 `append()`나 `appendChild()` 메서드를 호출해야한다.

```javascript
const $button = document.createElement('button');
$button.classList.add('login');
$button.style.fontSize = '15px';
$button.textContent = '버튼';

document.body.append($button);
```

## window 객체

- window는 웹 브라우저를 가리키는 객체다.
    - 웹 브라우저가 제공하는 기본 객체는 대부분 window 객체안에 있다.

### 대화상자

- `alert()`메서드는 대화 상자를 띄울 수 있는 메서드다.
- `prompt()`는 사용자가 직접 프로그램에 값을 전달할 수 있다.
- `confirm()`은 사용자가 확인을 누르면 true, 취소를 누르면 false가 전달된다.

### Math

- Math 객체는 수학에 사용하는 다양한 메서드가 있다.

```javascript
Math.ceil(5.2) // 올림, 6
Math.round(4.5) // 반올림, 5
Math.floor(2.8) // 내림, 2

Math.max(5, 3, 6) // 최대, 6
Math.min(2, 5, 8, 4) // 최소, 2
Math.sqrt(25) // 제곱근, 5
```

### Date

- 날짜 계산을 할 때는 Date를 사용한다.

```javascript
const now = new Date();
const datetime = new Date(year, month, date, hour, minutes, seconds, microSeconds);
```

**2024년 2월 21일과 2024년 3월3일은 며칠 차이가 날까요? 며칠 차이가 나는지를 계산하는 자바스크립트 함수를 만들고 정답을 구해보세요.**

```javascript
const solution = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate - startDate) / (1000 * 60 * 60 * 24);
}

const result = solution('2024-02-21', '2024-03-03');
console.log(result);
```