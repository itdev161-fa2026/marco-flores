import express from 'express';
import connectDataBase from './config/db.js';

const app = express();

connectDataBase();

app.get('/', (req, res) =>
res.send('http get request sent to root api endpoint')
);

app.listen(3000, () => console.log(`Express server running on port 3000`));