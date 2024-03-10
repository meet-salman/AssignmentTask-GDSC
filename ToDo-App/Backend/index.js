import express from 'express';
import cors from 'cors';
import mongoDB from './config/mongoDB.js';
import router from './routes/router.js';
const app = express();

// Middle Ware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoDB.connection
  .once('open', () => {
    app.listen(3000);
    console.log("Database Connected!");
  })
  .on('error', (error) => {
    console.log("Error in Connecting DB! => ", error);
  })


  app.use('/', router);