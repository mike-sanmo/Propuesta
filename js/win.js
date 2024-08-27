
var end = Date.now() + (60 * 1000);

// go Buckeyes!
var colors = ['#bb0000', '#ffffff'];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());

const $bg = document.querySelector('body')

$bg.addEventListener('mouseover', function() {

    const audio = new window.Audio('./src/victory.mp3');
    audio.volume = 0.2;
    audio.play();
});

const $heart = document.querySelector('button')
$heart.addEventListener('click',() => {
    window.location.href = 'heart.html'
})