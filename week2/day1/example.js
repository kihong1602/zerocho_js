// 1. 다음에 나온 func() 함수가 3.5초 뒤에 실행되도록 코드를 작성해보세요.
function func() {
  console.log('hello');
}

setTimeout(func, 3500);

// 2. 다음 코드를 콘솔에서 실행하면 어떤 메시지가 출력될 지 예상해 보세요.
const intervalId = setInterval(() => {
  console.log('2초마다 실행됩니다.');
}, 2000);

setTimeout(() => {
  clearInterval(intervalId);
}, 5000); // 4초까지 총 2번 intervalId가 실행되고, 5초가 된 시점에 setTimeout이 실행되며 intervalId를 clear한다.

// 3. 다음 코드를 setInterval() 함수와 같은 효과를 내는 setTimeout() 함수로 바꿔보세요.
setInterval(() => {
  console.log('hello');
}, 1000);

const print = () => {
  console.log('hello');
  setTimeout(print, 1000);
}

setTimeout(print, 1000);