const express = require('express');
const app = express();
const port = 3011;

app.get('/health', (req, res) => res.sendStatus(200));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
