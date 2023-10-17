document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('counter');
    const plusButton = document.getElementById('plus');
    const minusButton = document.getElementById('minus');
    const likeButton = document.getElementById('like');
    const pauseButton = document.getElementById('pause');
    const restartButton = document.getElementById('restart');
    const commentInput = document.getElementById('commentInput');
    const commentButton = document.getElementById('commentButton');
    const commentsList = document.getElementById('comments');
  
    let count = 0;
    let isPaused = false;
    let intervalId;
    const likes = {};
  
    function updateCounter() {
      counter.innerText = count;
    }
  
    function updateLikes() {
      const currentCount = counter.innerText;
      likes[currentCount] = (likes[currentCount] || 0) + 1;
    }
  
    function displayLikes() {
      const currentCount = counter.innerText;
      likeButton.innerText = `Like (${likes[currentCount] || 0})`;
    }
  
    plusButton.addEventListener('click', () => {
      if (!isPaused) {
        count += 1;
        updateCounter();
      }
    });
  
    minusButton.addEventListener('click', () => {
      if (!isPaused) {
        count -= 1;
        updateCounter();
      }
    });
  
    likeButton.addEventListener('click', () => {
      if (!isPaused) {
        updateLikes();
        displayLikes();
      }
    });
  
    pauseButton.addEventListener('click', () => {
      if (isPaused) {
        isPaused = false;
        intervalId = setInterval(() => {
          count += 1;
          updateCounter();
        }, 1000);
        pauseButton.innerText = 'Pause';
        plusButton.disabled = false;
        minusButton.disabled = false;
        likeButton.disabled = false;
        restartButton.disabled = false;
      } else {
        isPaused = true;
        clearInterval(intervalId);
        pauseButton.innerText = 'Resume';
        plusButton.disabled = true;
        minusButton.disabled = true;
        likeButton.disabled = true;
        restartButton.disabled = true;
      }
    });
  
    restartButton.addEventListener('click', () => {
      count = 0;
      updateCounter();
    });
  
    commentButton.addEventListener('click', () => {
      const commentText = commentInput.value;
      if (commentText) {
        const commentItem = document.createElement('li');
        commentItem.innerText = commentText;
        commentsList.appendChild(commentItem);
        commentInput.value = '';
      }
    });
  
    // Start the timer
    intervalId = setInterval(() => {
      if (!isPaused) {
        count += 1;
        updateCounter();
      }
    }, 1000);
  });
  