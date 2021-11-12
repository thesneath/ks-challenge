let apiUrl = 'https://jsonplaceholder.typicode.com';
const modal = document.querySelector('.modal');

const addUser = (user) => {
  let userTable = document.querySelector('.user-table');

  let row = document.createElement('tr');
  let userElement = document.createElement('td');
  
  userElement.classList.add('user');
  userElement.innerText = user.username;

  row.appendChild(userElement);
  userTable.appendChild(row);

  addDetailsListener(userElement, user);
}

const getUsers = () => {
  return fetch(`${apiUrl}/users`)
    .then(response => response.json())
    .then(json => {
      json.forEach(item => {
        let user = {
          id: item.id,
          username: item.username,
        };
        addUser(user);
      })
    })
    .catch(e => console.error(e));
};

const addPost = (post) => {
  const postsContainer = document.querySelector('.posts-container');

  let currentPost = document.createElement('div');
  currentPost.classList.add('post');

  let postTitle = document.createElement('h3');
  postTitle.innerText = post.title;

  let postBody = document.createElement('p');
  postBody.innerText = post.body;

  currentPost.appendChild(postTitle);
  currentPost.appendChild(postBody);
  postsContainer.appendChild(currentPost);
}

const getPosts = (user) => {
  return fetch(`${apiUrl}/posts?userId=${user.id}`)
    .then(response => response.json())
    .then(json => {
      json.forEach(item => {
        let post = {
          id: item.id,
          title: item.title,
          body: item.body
        }
        addPost(post);
      });
    })
    .catch(e => console.error(e))
}

const showModal = (user) => {
  modal.style.display = "block"
  let userContainer = document.querySelector('.user-container');

  let close = document.createElement('span');
  close.innerText = 'x'
  close.classList.add('close');

  let nameElement = document.createElement('h2');
  nameElement.innerText = user.username;

  userContainer.appendChild(nameElement);
  userContainer.appendChild(close);

  addCloseListener(close)
}

const closeModal = () => {
  modal.style.display = "none";
  modal.scrollTop = 0;
  document.querySelector('.user-container').innerHTML = '';
  document.querySelector('.posts-container').innerHTML = '';
}

window.onclick = (event) => {
  if(event.target === modal) {
    closeModal();
  }
}

const showUser = (user) => {
  getPosts(user).then(() => showModal(user));
};

const addDetailsListener = (div, user) => {
  div.addEventListener('click', () => showUser(user))
};

const addCloseListener = (close) => {
  close.addEventListener('click', () => closeModal())
}

getUsers();