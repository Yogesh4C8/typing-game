document.addEventListener("DOMContentLoaded", () => {
    const word = document.getElementById('word');
    const text = document.getElementById('text');
    const scoreEl = document.getElementById('score');
    const timeEl = document.getElementById('time');
    const endgameEl = document.getElementById('end-game-container');
    const settingsBtn = document.getElementById('settings-btn');
    const settings = document.getElementById('settings');
    const settingsForm = document.getElementById('settings-form');
    const difficultySelect = document.getElementById('difficulty');

    const words = ["friday","thor","steve","captain","hope","vision","peter","dormammu","hulk","asgard","bifrost","dormammu","LoKi","dormammu","dormammu","ragnarok","Ex-Wife","dormammu","valkyrie","malekith","dormammu","mjolnir","stormbreaker","gauntlet","dormammu","wanda","hawkeye","natasha","THAnos","dormammu","gamora","T'Challa","groot","dormammu","dormammu","S.H.I.E.L.D","scepter","3000","14000605","assemble","avengers","revengers","agamotto","happy","Ego","yondu","celestial","ultron","language","goose","tony","pepper","peggy","Bucky","december16","quantum","smash","JARVIS","mysterio","dormammu"]

    let randomWord, score = 0, time = 20;

    // if no difficulty is set then default is medium
    let difficulty = localStorage.getItem("difficulty") != null ?
                        localStorage.getItem('difficulty') :
                        'medium';
    difficultySelect.value = localStorage.getItem("difficulty") != null ?
                            localStorage.getItem('difficulty') :
                            'medium';

    // Focus on text on start
    text.focus();

    // Updating time
    const updateTime = () => {
      time--;
      timeEl.innerHTML = time + 's';
  
      if (time === 0) {
      clearInterval(timeInterval);
      // end the game
      gameOver();
      }
  }
    // Start counting down
    const timeInterval = setInterval(updateTime, 1000);

    // Generating random word from array
    const getRandomWord = () => {
       return words[Math.floor(Math.random() * words.length)];
      } 
    // Adding word to DOM
    const addWordToDOM = () => {
        randomWord = getRandomWord();
        console.log(randomWord)
        word.innerHTML = randomWord;
    }
    // Updating score
    const updateScore = () => {
        score++;
        scoreEl.innerHTML = score;
    }
    
    
    // Game over, show end screen
    const gameOver = () => {
        endgameEl.innerHTML = `
        <h1>Time ran out</h1><br>
        <p>Your final score is ${score}</p><br>
        <button onclick="location.reload()" id="reload">Try Again!</button>
        `;
    
        endgameEl.style.display = 'flex';
    }
    
    addWordToDOM();
    

    text.addEventListener('input', e => {
        const insertedText = e.target.value;
      
        if (insertedText === randomWord) {
          addWordToDOM();
          updateScore();
      
          // Clear
          e.target.value = '';
      
          if (difficulty === 'hard') {
            time += 2;
          } else if (difficulty === 'medium') {
            time += 3;
          } else {
            time += 5;
          }
      
          updateTime();
        }
      });
      
      // Settings btn click
      settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
      
      // Settings select
      settingsForm.addEventListener('change', e => {
        difficulty = e.target.value;
        localStorage.setItem('difficulty', difficulty);
      });
})