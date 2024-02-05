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

  const limit = +req.query.limit || 10;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
  );
  const users = await response.json();

  res.send(`
    <h1 class="text-2xl font-bold my-4">Users</h1>
    <ul>
      ${users.map((user) => `<li>${user.name}</li>`).join('')}
    </ul>
  `);
});

// Handle POST request for temp conversion
app.post('/convert', (req, res) => {
  const fahrenheit = parseFloat(req.body.fahrenheit);
  const celsius = (fahrenheit - 32) * (5 / 9);

  res.send(`
  <p>
    ${fahrenheit}&deg;F is equal to ${celsius.toFixed(2)}&deg;C.
  </p>
  `);
});

let counter = 0;

// Handle GET request for polling example
app.get('/poll', (req, res) => {
  counter++;

  const data = { value: counter };
  res.json(data);
});

let currentTemperature = 20;

// Handle GET request for weather
app.get('/get-temperature', (req, res) => {
  currentTemperature += Math.random() * 2 - 1; // Random temp change
  res.send(currentTemperature.toFixed(1) + '°C');
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
