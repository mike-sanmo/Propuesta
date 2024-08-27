var byline = document.getElementsByTagName("h2");   // Find the H2
var bylineText = byline[0].innerHTML;                    // Get the content of the H2
var bylineArr = bylineText.split('');                 // Split content into array
document.getElementById("byline").innerHTML = '';                            // Empty current content

var span;         // Create variables to create elements
var letter;

for(let i=0;i<bylineArr.length;i++){                  // Loop for every letter
    span = document.createElement("span");          // Create a <span> element
    letter = document.createTextNode(bylineArr[i]); // Create the letter

    if(bylineArr[i] == ' ') {                       // If the letter is a space...
        document.getElementById("byline").appendChild(letter);         // ...Add the space without a span
    } else {
        span.appendChild(letter);           // Add the letter to the span
        document.getElementById("byline").appendChild(span);           // Add the span to the h2
    }
}

const $index = document.querySelector('h2')
$index.addEventListener('click',() => {
    window.location.href = 'index.html'
})

const $bg = document.querySelector('img')

$bg.addEventListener('mouseover', function() {

    const audio = new window.Audio('./src/game_over.mp3');
    audio.play();
});
