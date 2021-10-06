// Global variables, set currentEmoji to be an empty string at first
let currentEmoji = '';
let sideLength = 0;
const DIFFERENT_EMOJI = '😈';
let diffEmojiPos = [0, 0]; // Let the different emoji start at 0, 0
const emojis = ['✌', '😂', '😝', '😁', '😱', '👉', '🙌', '🍻', '🔥', '🌈', '☀', '🎈', '🌹', '💄', '🎀', '⚽', '🎾', '🏁', '😡', '👿', '🐻', '🐶', '🐬', '🐟', '🍀', '👀', '🚗', '🍎', '💝', '💙', '👌', '❤', '😍', '😉', '😓', '😳', '💪', '💩', '🍸', '🔑', '💖', '🌟', '🎉', '🌺', '🎶', '👠', '🏈', '⚾', '🏆', '👽', '💀', '🐵', '🐮', '🐩', '🐎', '💣', '👃', '👂', '🍓', '💘', '💜', '👊', '💋', '😘', '😜', '😵', '🙏', '👋', '🚽', '💃', '💎', '🚀', '🌙', '🎁', '⛄', '🌊', '⛵', '🏀', '🎱', '💰', '👶', '👸', '🐰', '🐷', '🐍', '🐫', '🔫', '👄', '🚲', '🍉', '💛', '💚'];

// Create container for the buttons and the output
const buttonContainer = document.createElement('div');
const emojiOutput = document.createElement('p');
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
      if (sideLength !== 1 && i === diffEmojiPos[0] && j === diffEmojiPos[1]) {
        output += DIFFERENT_EMOJI;
      } else output += emoji;
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
    diffEmojiPos = [0, 0];
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
    } else if (sideLength > 1) {
      // If sidelength is more than 1, check if key pressed is one of the directional arrows
      // Then set the different emoji position accordingly, taking into account the edge cases
      if (e.key === 'ArrowUp') {
        diffEmojiPos[0] = diffEmojiPos[0] === 0 ? sideLength - 1 : diffEmojiPos[0] - 1;
        drawEmojis(currentEmoji);
      } else if (e.key === 'ArrowDown') {
        diffEmojiPos[0] = diffEmojiPos[0] === sideLength - 1 ? 0 : diffEmojiPos[0] + 1;
        drawEmojis(currentEmoji);
      } else if (e.key === 'ArrowLeft') {
        diffEmojiPos[1] = diffEmojiPos[1] === 0 ? sideLength - 1 : diffEmojiPos[1] - 1;
        drawEmojis(currentEmoji);
      } else if (e.key === 'ArrowRight') {
        diffEmojiPos[1] = diffEmojiPos[1] === sideLength - 1 ? 0 : diffEmojiPos[1] + 1;
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
