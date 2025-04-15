document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const spaceBackground = document.getElementById('spaceBackground');
  const bgMusic = new Audio('assets/sounds/cosmic_bg.wav');

  bgMusic.loop = true;
  bgMusic.volume = 0.8;

  const quotes = [
      "🛸 'Don't forget Earth things!'",
      "👾 'You're doing stellar, human!'",
      "🚀 'Add more tasks for universal domination!'",
      "🧠 'Big brains love organization!'",
      "🌌 'One task a day keeps the asteroid away!'"
  ];

  function showToast(msg) {
      let toast = document.createElement('div');
      toast.className = 'toast show';
      toast.innerText = msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
  }

  function randomQuote() {
      return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function createSpaceBackground() {
      
      createStars();
      createPlanets();
      createAsteroids();
  }

  function createStars() {
      const starCount = 100;
      const starColors = ['#fff', '#fff9c4', '#f8bbd0', '#bbdefb'];
      
      for (let i = 0; i < starCount; i++) {
          const star = document.createElement('div');
          star.classList.add('star');
    
          const size = Math.random() * 3 + 1;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.left = `${Math.random() * 100}vw`;
          star.style.top = `${Math.random() * 100}vh`;
          star.style.setProperty('--duration', `${Math.random() * 4 + 2}s`);
          star.style.backgroundColor = starColors[Math.floor(Math.random() * starColors.length)];
          star.style.boxShadow = `0 0 ${size + 2}px ${star.style.backgroundColor}`;
          
          star.addEventListener('click', () => {
              showToast(['✨ Star power!', '💫 Make a wish!', '⭐ Twinkle twinkle!'][Math.floor(Math.random() * 3)]);
              confetti({
                  particleCount: 20,
                  spread: 30,
                  origin: { x: parseInt(star.style.left) / 100, y: parseInt(star.style.top) / 100 }
              });
          });
          
          spaceBackground.appendChild(star);
      }
  }

  function createPlanets() {
      const planetCount = 6;
      const planetColors = [
          { light: '#ff9e80', dark: '#bf360c', glow: 'rgba(255, 87, 34, 0.4)' }, 
          { light: '#b39ddb', dark: '#4527a0', glow: 'rgba(103, 58, 183, 0.4)' },
          { light: '#81d4fa', dark: '#01579b', glow: 'rgba(3, 169, 244, 0.4)' },  
          { light: '#ffcc80', dark: '#e65100', glow: 'rgba(255, 152, 0, 0.4)' },  
          { light: '#c5e1a5', dark: '#33691e', glow: 'rgba(139, 195, 74, 0.4)' },
          { light: '#90a4ae', dark: '#263238', glow: 'rgba(96, 125, 139, 0.4)' }  
      ];
      
      const ringColors = [
          { color1: '#ffb74d', color2: '#e65100', glow: 'rgba(255, 152, 0, 0.3)' },
          { color1: '#b39ddb', color2: '#4527a0', glow: 'rgba(103, 58, 183, 0.3)' },
          { color1: '#81d4fa', color2: '#01579b', glow: 'rgba(3, 169, 244, 0.3)' }
      ];
      
      for (let i = 0; i < planetCount; i++) {
          const planet = document.createElement('div');
          planet.classList.add('planet');
          
          
          const size = Math.random() * 60 + 40;
          planet.style.width = `${size}px`;
          planet.style.height = `${size}px`;
          
          
          let posX, posY;
          if (Math.random() > 0.5) {
              
              posX = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
              posY = Math.random() * 100;
          } else {
              
              posX = Math.random() * 100;
              posY = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
          }
          
          
          const orbitXStart = posX;
          const orbitYStart = posY;
          const orbitXEnd = orbitXStart + (Math.random() * 20 - 10);
          const orbitYEnd = orbitYStart + (Math.random() * 20 - 10);
          
          planet.style.setProperty('--orbit-x-start', `${orbitXStart}vw`);
          planet.style.setProperty('--orbit-y-start', `${orbitYStart}vh`);
          planet.style.setProperty('--orbit-x-end', `${orbitXEnd}vw`);
          planet.style.setProperty('--orbit-y-end', `${orbitYEnd}vh`);
          
          
          planet.style.setProperty('--orbit-duration', `${Math.random() * 60 + 40}s`);
          
          
          const colorIndex = Math.floor(Math.random() * planetColors.length);
          planet.style.setProperty('--planet-light', planetColors[colorIndex].light);
          planet.style.setProperty('--planet-dark', planetColors[colorIndex].dark);
          planet.style.setProperty('--planet-glow', planetColors[colorIndex].glow);
          
          
          planet.style.setProperty('--beam-color', planetColors[colorIndex].glow.replace('0.4', '0.8'));
          
          
          if (Math.random() < 0.3) {
              const ring = document.createElement('div');
              ring.classList.add('planet-ring');
              
              const ringWidth = size * 1.8;
              ring.style.width = `${ringWidth}px`;
              ring.style.top = `${size / 2 - 5}px`;
              ring.style.left = `${size / 2 - ringWidth / 2}px`;
              
              const ringColorIndex = Math.floor(Math.random() * ringColors.length);
              ring.style.setProperty('--ring-color-1', ringColors[ringColorIndex].color1);
              ring.style.setProperty('--ring-color-2', ringColors[ringColorIndex].color2);
              ring.style.setProperty('--ring-glow', ringColors[ringColorIndex].glow);
              
              planet.appendChild(ring);
          }
          
          
          planet.addEventListener('click', () => {
              showToast(['🪐 Space explorer!', '🌌 Cosmic vibes!', '🌍 Greetings, earthling!'][Math.floor(Math.random() * 3)]);
              confetti({
                  particleCount: 30,
                  spread: 60,
                  colors: [planetColors[colorIndex].light, planetColors[colorIndex].dark],
                  origin: { x: parseInt(planet.style.getPropertyValue('--orbit-x-start')) / 100, y: parseInt(planet.style.getPropertyValue('--orbit-y-start')) / 100 }
              });
          });
          
          spaceBackground.appendChild(planet);
      }
  }

  function createAsteroids() {
      
      const asteroidCount = 2;
      
      for (let i = 0; i < asteroidCount; i++) {
          const asteroid = document.createElement('div');
          asteroid.classList.add('asteroid');
          
          
          const size = Math.random() * 20 + 10;
          asteroid.style.width = `${size}px`;
          asteroid.style.height = `${size}px`;
          
          
          const floatY = Math.random() * 80 + 10;
          asteroid.style.setProperty('--float-y', `${floatY}vh`);
          
          
          asteroid.style.setProperty('--float-duration', `${Math.random() * 20 + 15}s`);
          
          
          asteroid.style.transform = `rotate(${Math.random() * 360}deg)`;
          
          
          asteroid.addEventListener('click', () => {
              showToast(['☄️ Zooming by!', '🌠 Space rock!', '💥 Asteroid field ahead!'][Math.floor(Math.random() * 3)]);
              confetti({
                  particleCount: 15,
                  spread: 40,
                  colors: ['#888', '#555', '#aaa'],
                  origin: { x: 0.5, y: floatY / 100 }
              });
          });
          
          spaceBackground.appendChild(asteroid);
          
          
          setTimeout(() => {
              asteroid.remove();
              createAsteroids();
          }, parseFloat(asteroid.style.getPropertyValue('--float-duration')) * 5000);
      }
  }

  async function loadTasks() {
      try {
          const res = await fetch('/api/tasks');
          const tasks = await res.json();
          taskList.innerHTML = '';

          tasks.forEach(task => {
              const li = document.createElement('li');
              li.className = task.priority;
              li.innerHTML = `
                  <strong>${task.title}</strong><br/>
                  ${task.description || ''}<br/>
                  <em>Priority: ${task.priority}</em><br/>
                  <button onclick="completeTask(${task.id}, ${!task.is_completed})">
                      ${task.is_completed ? '🧹 Uncomplete' : '✅ Complete'}
                  </button>
                  <button onclick="editTask(${task.id}, '${task.title.replace(/'/g, "\\'")}', '${task.description ? task.description.replace(/'/g, "\\'") : ''}', '${task.priority}')">✏️ Edit</button>
                  <button onclick="deleteTask(${task.id})">🗑️ Delete</button>
              `;
              if (task.is_completed) {
                  li.style.textDecoration = 'line-through';
                  li.style.opacity = '0.6';
              }
              taskList.appendChild(li);
          });
      } catch (err) {
          console.error('Error loading tasks:', err);
      }
  }

  taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const priority = document.getElementById('priority').value;

      if (!title.trim()) return showToast("🚨 Whoa! You forgot the title.");

      try {
          await fetch('/api/tasks', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title, description, priority })
          });
          taskForm.reset();
          showToast("🪐 Task added!");
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
          loadTasks();
      } catch (err) {
          console.error('Failed to add task:', err);
          showToast("👽 Server error! Try again.");
      }
  });

  window.completeTask = async function (id, is_completed) {
    try {
        await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_completed })
        });
        showToast(is_completed ? "🎯 Mission complete!" : "🔄 Unmarked");
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        loadTasks();
    } catch (err) {
        showToast("🚧 Update failed!");
    }
};

  window.deleteTask = async function (id) {
      if (!confirm("Are you sure? This task will be jettisoned into space! ☄️")) return;
      try {
          await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
          showToast("🗑️ Task deleted.");
          confetti({ particleCount: 20, spread: 50, origin: { x: Math.random(), y: Math.random() } });
          loadTasks();
      } catch (err) {
          showToast("💥 Deletion failed!");
      }
  };

  window.editTask = function(id, currentTitle, currentDesc, currentPriority) {
      const taskElement = document.querySelector(`li [onclick*="editTask(${id}"]`).parentNode;
      
      if (taskElement.classList.contains('editing')) return;
      taskElement.classList.add('editing');
      
      taskElement.innerHTML = `
          <div class="edit-form">
              <input type="text" id="edit-title-${id}" value="${currentTitle}" class="form-input">
              <textarea id="edit-desc-${id}" class="form-input">${currentDesc || ''}</textarea>
              <select id="edit-priority-${id}" class="form-input">
                  <option value="low" ${currentPriority === 'low' ? 'selected' : ''}>Low - 🪐 Meh</option>
                  <option value="medium" ${currentPriority === 'medium' ? 'selected' : ''}>Medium - 👽 Watch Out</option>
                  <option value="high" ${currentPriority === 'high' ? 'selected' : ''}>High - 🚨 Red Alert</option>
              </select>
              <div class="edit-buttons">
                  <button onclick="saveTask(${id})" class="button">💾 Save</button>
                  <button onclick="loadTasks()" class="button">❌ Cancel</button>
              </div>
          </div>
      `;
  };

  window.saveTask = async function(id) {
      const title = document.getElementById(`edit-title-${id}`).value;
      const description = document.getElementById(`edit-desc-${id}`).value;
      const priority = document.getElementById(`edit-priority-${id}`).value;

      if (!title.trim()) {
          showToast("🛑 Title can't be empty!");
          return;
      }

      try {
          await fetch(`/api/tasks/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  title: title,
                  description: description,
                  priority: priority,
                  category: '',
                  is_completed: false
              })
          });
          showToast(randomQuote());
          loadTasks();
      } catch (err) {
          showToast("❌ Update failed.");
      }
  };

  
  const toggleUI = document.createElement('div');
  toggleUI.className = 'toggle-wrapper';
  toggleUI.innerHTML = `
      <button class="toggle-btn" id="darkModeBtn">🌓 Toggle Dark Mode</button>
      <button class="toggle-btn" id="musicBtn">🎵 Play Space Beats</button>
  `;
  document.querySelector('.container').appendChild(toggleUI);

  document.getElementById('darkModeBtn').onclick = () => {
      document.body.classList.toggle('dark');
      showToast(document.body.classList.contains('dark') ? "🌑 Dark side activated!" : "☀️ Back to the light!");
  };

  let musicPlaying = false;
  document.getElementById('musicBtn').onclick = () => {
      musicPlaying = !musicPlaying;
      if (musicPlaying) {
          bgMusic.play();
          showToast("🎶 Beats engaged!");
      } else {
          bgMusic.pause();
          showToast("🔇 Music stopped.");
      }
  };

  
  function maintainSpaceObjects() {
      
      setInterval(() => {
          if (document.querySelectorAll('.asteroid').length < 6) {
              createAsteroids();
          }
      }, Math.random() * 30000 + 30000);
  }

  
  createSpaceBackground();
  maintainSpaceObjects();
  loadTasks();
});