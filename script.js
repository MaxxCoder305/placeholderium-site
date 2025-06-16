function signup() {
  const user = document.getElementById('signupUsername').value;
  const pass = document.getElementById('signupPassword').value;

  if (!user || !pass) return alert('Please enter all fields');
  if (localStorage.getItem(`user_${user}`)) return alert('Username already taken');

  localStorage.setItem(`user_${user}`, JSON.stringify({ password: pass, friends: [] }));
  localStorage.setItem('currentUser', user);
  alert('Account created!');
  window.location.href = 'profile.html';
}

function login() {
  const user = document.getElementById('loginUsername').value;
  const pass = document.getElementById('loginPassword').value;

  const data = localStorage.getItem(`user_${user}`);
  if (!data) return alert('User not found');

  const parsed = JSON.parse(data);
  if (parsed.password !== pass) return alert('Incorrect password');

  localStorage.setItem('currentUser', user);
  alert('Login successful!');
  window.location.href = 'index.html';
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

function loadSession() {
  const user = localStorage.getItem('currentUser');
  document.getElementById('username-label').innerText = user || 'Guest';
}

function loadProfile() {
  loadSession();
  const user = localStorage.getItem('currentUser');
  if (!user) window.location.href = 'login.html';
  document.getElementById('profileName').innerText = user;
}

function loadFriends() {
  loadSession();
  const user = localStorage.getItem('currentUser');
  if (!user) window.location.href = 'login.html';

  const data = JSON.parse(localStorage.getItem(`user_${user}`));
  const list = document.getElementById('friendList');
  list.innerHTML = '';
  data.friends.forEach(friend => {
    const li = document.createElement('li');
    li.innerText = friend;
    list.appendChild(li);
  });
}

function addFriend() {
  const target = document.getElementById('friendName').value;
  const user = localStorage.getItem('currentUser');

  if (!target || target === user) return alert('Invalid friend name');
  const friendData = localStorage.getItem(`user_${target}`);
  if (!friendData) return alert('User not found');

  const userData = JSON.parse(localStorage.getItem(`user_${user}`));
  if (userData.friends.includes(target)) return alert('Already friends');

  userData.friends.push(target);
  localStorage.setItem(`user_${user}`, JSON.stringify(userData));
  alert('Friend added!');
  loadFriends();
}