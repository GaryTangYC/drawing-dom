// Global variables, set currentEmoji to be an empty string at first
let currentEmoji = '';
let sideLength = 0;
const emojis = ['✌', '😂', '😝', '😁', '😱', '👉', '🙌', '🍻', '🔥', '🌈', '☀', '🎈', '🌹', '💄', '🎀', '⚽', '🎾', '🏁', '😡', '👿', '🐻', '🐶', '🐬', '🐟', '🍀', '👀', '🚗', '🍎', '💝', '💙', '👌', '❤', '😍', '😉', '😓', '😳', '💪', '💩', '🍸', '🔑', '💖', '🌟', '🎉', '🌺', '🎶', '👠', '🏈', '⚾', '🏆', '👽', '💀', '🐵', '🐮', '🐩', '🐎', '💣', '👃', '👂', '🍓', '💘', '💜', '👊', '💋', '😘', '😜', '😵', '🙏', '👋', '🚽', '💃', '💎', '🚀', '🌙', '🎁', '⛄', '🌊', '⛵', '🏀', '🎱', '💰', '👶', '👸', '🐰', '🐷', '🐍', '🐫', '🔫', '👄', '🚲', '🍉', '💛', '💚'];

// Create container for the buttons and the output
const buttonContainer = document.createElement('div');
const emojiOutput = document.createElement('p');
emojiOutput.style.fontSize = '16px';
document.body.appendChild(buttonContainer);
document.body.appendChild(emojiOutput);

// Create randomize button
const randomButton = document.createElement('button');
randomButton.innerText = 'Randomize';

// Function to draw the emoji output based on emoji input and number of rows
const drawEmojis = (emoji) => {
  let output = '';

  for (let i = 0; i < sideLength; i += 1) {
    for (let j = 0; j < sideLength; j += 1) {
      output += emoji;
    }
    output += '<br>';
  }

  emojiOutput.innerHTML = output;
};

// Fill the button container with buttons corresponding to each emoji in the global array
emojis.forEach((emoji) => {
  const button = document.createElement('button');
  button.innerText = emoji;
  button.addEventListener('click', () => { // when button is clicked, set current emoji
    currentEmoji = emoji;
    sideLength = 0;
    emojiOutput.innerHTML = '';
  });
  buttonContainer.appendChild(button);
});

buttonContainer.appendChild(randomButton);

// If the user hits a key
document.addEventListener('keydown', (e) => {
  if (currentEmoji !== '') {
    if (!Number.isNaN(Number(e.key)) && e.key !== 0) {
      // If the key is a number 1-9, then set side length and display square of that current emoji
      sideLength = Number(e.key);
      drawEmojis(currentEmoji);
    } else if (sideLength !== 0 && e.key === 'ArrowUp') {
      // If the key is arrowup and sideLength has been set,
      // increase font size by 1 to make square bigger
      const curFontSize = parseInt(emojiOutput.style.fontSize, 10);
      emojiOutput.style.fontSize = `${curFontSize + 1}px`;
      drawEmojis(currentEmoji);
    } else if (sideLength !== 0 && e.key === 'ArrowDown') {
      // If the key is arrowdown and sideLength has been set,
      // decrease font size by 1 to make square smaller
      const curFontSize = parseInt(emojiOutput.style.fontSize, 10);
      if (curFontSize > 1) {
        emojiOutput.style.fontSize = `${curFontSize - 1}px`;
        drawEmojis(currentEmoji);
      }
    }
  }
});

// If the user clicks on the randomize button
randomButton.addEventListener('click', () => {
  // Generate a random side length from 1 to 9, and get a random emoji from the array
  // Display square of the random emoji with that side length
  sideLength = Math.ceil(Math.random() * 9);
  currentEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  drawEmojis(currentEmoji);
});
