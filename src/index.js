import './style.css';

const GAME_ID = 'A3rG0OpQT3sMg6TOxC8S';
const form = document.querySelector('form');
const userInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const addScoreSection = document.querySelector('.add-score');
const refreshBtn = document.querySelector('#refresh-scores');
const scoresList = document.querySelector('ul');

const addNewScore = async (obj) => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${
      GAME_ID
    }/scores/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    },
  );
  return response;
};

const getScores = async () => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${
      GAME_ID
    }/scores/`,
  );
  return response;
};

const addMessage = (msg, type) => {
  const div = document.createElement('div');
  if (type === 1) {
    div.classList.add('success');
  } else {
    div.classList.add('failure');
  }

  div.innerHTML = msg;
  addScoreSection.append(div);
  setTimeout(() => {
    div.remove();
  }, 2000);
};

const displayScores = (arr) => {
  scoresList.innerHTML = '';
  arr.forEach((element) => {
    scoresList.innerHTML += `<li>${element.user}: ${element.score}</li>`;
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userScore = {
    user: userInput.value,
    score: parseInt(scoreInput.value, 10),
  };

  addNewScore(userScore)
    .then((response) => {
      if (response.status === 201) {
        addMessage('Score Added Successfully', 1);
        userInput.value = '';
        scoreInput.value = '';
      }
    })
    .catch(() => {
      addMessage('Oops! Something went wrong.', 0);
    });
});

refreshBtn.addEventListener('click', () => {
  getScores()
    .then((response) => response.json())
    .then((json) => {
      displayScores(json.result);
    });
});