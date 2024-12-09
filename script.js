const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraphs = [
        "Avoid daydreaming about the years to come.",
        "You are the most important person in my  life.",
        "Always be true to who you are, and ignore what other people have to say about you.",
        "Only demonstrate your strength when it’s really required."
    ];
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = '';
    for (const char of paragraphs[randomIndex]) {
        const span = document.createElement('span');
        span.textContent = char;
        typingText.appendChild(span);
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener("click", () => input.focus());
}

function initTyping() {
    const chars = typingText.querySelectorAll('span');
    const typedChars = input.value.split('');

    chars.forEach(span => span.classList.remove('correct', 'incorrect', 'active'));

    mistake = 0;

    chars.forEach((char, index) => {
        if (typedChars[index] == null) {
            // If no input for this character yet
            char.classList.remove('correct', 'incorrect');
        } else if (typedChars[index] === char.innerText) {
            // Correct character
            char.classList.add('correct');
        } else {
            // Incorrect character
            char.classList.add('incorrect');
            mistake++;
        }
    });

    if (typedChars.length < chars.length) {
        chars[typedChars.length].classList.add('active');
    }

    mistakes.innerText = mistake;
    cpm.innerText = Math.max(0, typedChars.length - mistake);

    if (!isTyping && timeLeft > 0) {
        timer = setInterval(initTime, 1000);
        isTyping = true;
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((input.value.length - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmVal > 0 ? wpmVal : 0;
    } else {
        clearInterval(timer);
    }
}

// Reset game
function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

// Event listeners
input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
loadParagraph();
