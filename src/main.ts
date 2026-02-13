import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';

const app = express();
const PORT:Number=3001;

// bodyparser

app.use(bodyParser.json())
// Handling GET / Request
app.use('/', router)

// Server setup
app.listen(PORT,() => {
    console.log('The application is listening ' + 'on port http://localhost:' +PORT);
})