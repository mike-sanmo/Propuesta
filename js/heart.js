const $bt = document.querySelector('button')

$bt.addEventListener('click', function(){
    var duration = 120 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
});

$bt.addEventListener('click', function(){
    var duration = 120 * 1000;
    var animationEnd = Date.now() + duration;
    var skew = 1;
    var unicorn = confetti.shapeFromText({ text: '♥'});

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: (Math.random() * skew) - 0.2
        },
        //colors: ['#ffffff'],
        shapes: [unicorn],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 2.5),
        drift: randomInRange(-0.4, 0.4)
    });

    if (timeLeft > 0) {
        requestAnimationFrame(frame);
    }
    }());    
});

const $bg = document.querySelector('#letter-image')

$bg.addEventListener('click', function() {

    const audio = new window.Audio('./src/hold_on.mp3');
    audio.volume = 0.2;
    audio.play();
    $bt.style.display = 'inline';
});