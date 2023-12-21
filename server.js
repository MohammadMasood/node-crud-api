const cluster = require('cluster');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');

dotenv.config();
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Replace the dead worker
  });

} else {
  
  const app = express();
  const workerId = cluster.worker.id;
  const BASE_PORT = parseInt(process.env.PORT) || 4000;
  const workerPORT = BASE_PORT + workerId - 1;

  app.use(bodyParser.json());

  // Routes for users module
  app.use('/api/users', userRoutes);

  // Handling 404 for non-existing endpoints
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });

  // Start the server
  const server = app.listen(workerPORT, () => {
    console.log(`Worker ${cluster.worker.id} running on http://localhost:${workerPORT}`);
  });

  // Export the app and server objects
  module.exports = { app, server };
}