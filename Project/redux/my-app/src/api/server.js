const express = require('express');

const app = express();

const port = 4000;

const reactions = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
};
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next();
});
  
const posts = [
  { id: '1', date: new Date().toISOString(), title: 'First Post!', content: 'Hello!', user: '1', reactions: Object.assign({}, reactions) },
  { id: '2', date: new Date().toISOString(), title: 'Second Post!', content: 'More text!', user: '2', reactions: Object.assign({}, reactions) },
  { id: '3', date: new Date().toISOString(), title: '欢迎来到Post大家庭!', content: '迫不及待地发下一条post吧!', user: '0', reactions: Object.assign({}, reactions) },      
];

const notifications = [
  { id: '1', date: new Date().toISOString(), user: '2', content: 'says hi', action: '1' },
  { id: '2', date: new Date().toISOString(), user: '0', content: 'Glad to be friend!', action: '2' }
];

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/fakeApi/getPosts', (req, res) => {
  res.send(posts);
});

app.get('/fakeApi/getPost/:postId', (req, res) => {
  res.send(posts.find(post => post.id === req.params.postId));
});

app.get('/fakeApi/getNotifications', (req, res) => {
  res.send(notifications);
});

app.post('/fakeApi/addPost', (req, res, next) => {
  const newPost = req.body;
  posts.push(newPost);
  res.send({status: "complete"});
})

app.listen(port, () => {
  console.log("Server start");
})
