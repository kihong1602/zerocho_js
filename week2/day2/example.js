// 1. 다음 코드를 실행할 때 콘솔에 어떤 순서로 알파벳이 출력되는지 호출 스택과 이벤트 루프를 사용해 설명해 보세요.

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
/*
 첫 번째 setTimeout을 실행하며 console.log('a')와 aaa()가 호출된다. 동기 코드이므로 호출 스택에는 console.log('a')가 쌓이고, aaa() 에서 console.log('c')가 호출 스택으로,
 setTimeout(()=>console.log('d')) 가 백그라운드로 이동. 지정된 시간 후 태스크 큐로 이동함.
 두 번째 setTimeout을 실행하며 aaa()와 console.log('b')가 호출. aaa()에서 console.log('c')가 호출 스택으로, setTimeout이 백그라운드로 이동. 이후 console.log('b')가 호출 스택으로 이동.
 호출 스택: a c c b, 백그라운드: d d 로 정리되며, 지정된 시간(0ms)이후 백그라운드에서 태스크 큐로 d d 가 순서대로 이동하며 출력.
 */

// 2. 본문의 setTimeoutPromise를 사용해 다음 프로미스 코드를 async/await 문법으로 변경해보세요.

const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
});

setTimeoutPromise(0)
.then(() => {
  return 'a';
})
.then((data) => {
  console.log(data);
  return 'b';
})
.then(data => {
  console.log(data);
});

// 답
await setTimeoutPromise(0);
const data1 = await 'a';
console.log(data1);
const data2 = await 'b';
console.log(data2);