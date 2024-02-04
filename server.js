import express from 'express';

const app = express();

const port = process.env.PORT || 3001;

// Static folder
app.use(express.static('public'));
// Parse url-encoded bodies (from HTML Forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (sent by API Clients)
app.use(express.json());

// Handle GET requests to fetch users
app.get('/users', async (req, res) => {
  // const users = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //   },
  //   {
  //     id: 2,
  //     name: 'Bob Williams',
  //   },
  //   {
  //     id: 3,
  //     name: 'Shannon Jackson',
  //   },
  // ];

  setTimeout(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    res.send(`
      <h1 class="text-2xl font-bold my-4">Users</h1>
      <ul>
        ${users.map((user) => `<li>${user.name}</li>`).join('')}
      </ul>
    `);
  }, 10000);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
