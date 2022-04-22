/**
 * HallPass Project
 * 
 * Copyright © 2021 Finer Engineering Inc. All rights reserved.
 * Created Dec 8, 2021
 * 
 * @author CJF
 * 
 */

import express from 'express';
import 'basenode';

const app = express();
const port = 8080;
app.get('*.*', express.static("html"))

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

const apiRouter = express.Router();
app.use('/api', apiRouter);

// apiRouter.use((req, res, next) => {
//   console.log("%o: %o => %o", req.method, req.path, req.query);
//   next();
// })

import { endpoint } from './endpoints/endpoints.js';
new endpoint(apiRouter);

app.get('*', (req, res) => {
  res.sendFile(new URL('../html/index.html', import.meta.url).pathname)
})

/*--- non-GET calls are invalid at this point --- */
app.all('*', (req, res) => {
  res.status(404).json("not found")
})