import express from 'express';

const app = express();

const port = process.env.PORT || 3001;

// Static folder
app.use(express.static('public'));
// Parse url-encoded bodies (from HTML Forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (sent by API Clients)
app.use(express.json());

app.listen(port, () => console.log(`listening on http://localhost:${port}`));