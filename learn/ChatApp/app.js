const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  fs.readFile('message.txt', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      data = 'No chat exists';
    }
    res.send(
      `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')"><input type="text" name="message" id="message"><input type="hidden" name="username" id="username"><button type="submit">Send</button></form>`
    );
  });
});

app.post('/', (req, res) => {
  console.log(req.body.username);
  console.log(req.body.message);
  fs.appendFile('message.txt', `${req.body.username}: ${req.body.message}\n`, (err) =>
    err ? console.log(err) : res.redirect('/')
  );
});

app.get("/login", (req, res) => {
  res.send('<form action="/" method="POST" onSubmit="localStorage.setItem(\'username\', document.getElementById(\'username\').value)"><input type="text" name="username" id="username"><button type="submit">Login</button></form>');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
