// array of words

const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// setting levels

const lvls = {
  "Easy": 5,
  "Normal": 3,
  "Hard": 2,
};

// default level


let defaultLevelName = "Normal";

let defaultLevelSeconds = lvls[defaultLevelName];



// catch selectors

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// setting level name + seconds + score

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// disable paste event

input.onpaste = function () {
  return false;
};

// start game

startButton.onclick = function () {
  this.remove();
  input.focus();
  // generate word function
  genWords();
};

function genWords() {
  // get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];

  // get word index

  let wordIndex = words.indexOf(randomWord);

  // remove the word from array

  words.splice(wordIndex, 1);

  // show the random word
  theWord.innerHTML = randomWord;

  // empty up comming words
  upcomingWords.innerHTML = "";
  // generate words
  for (let i = 0; i < words.length; i++) {
    // create div elment
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // call start play function
  startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // stop time
      clearInterval(start);
      // compare words

      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // empty input field
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call generate word
          genWords();
        }else {
            let span = document.createElement("span");
            span.className = 'good';
            let spanText = document.createTextNode("So good!");
            span.appendChild(spanText);
            finishMessage.appendChild(span);
            // remove upcoming words box
            upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
