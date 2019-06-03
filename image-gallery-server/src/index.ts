import express, {Express} from 'express';
import multer from 'multer';
import Loki from 'lokijs';
import {loadCollection} from './utils';
import fs from 'fs';
import path from 'path';

const port = 9000;
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

// app
const app = express();

app.listen(port, function () {
    console.log('listening on port' + port);
});

app.post('/images', upload.single('image'), async (req, res) => {
  try {
      const col = await loadCollection(COLLECTION_NAME, db);
      const data = col.insert(req.file);
      db.saveDatabase();
      res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
  } catch (err) {
      res.sendStatus(500);
  }
});

app.get('/images', async (req, res) => {
  try {
      const col = await loadCollection(COLLECTION_NAME, db);
      res.send(col.data);
  } catch (err) {
      res.sendStatus(500);
  }
});

app.get('/images/:id', async (req, res) => {
  try {
      const col = await loadCollection(COLLECTION_NAME, db);
      const result = col.get(req.params.id);

      if (!result) {
          res.sendStatus(404);
          return;
      };

      res.setHeader('Content-Type', result.mimetype);
      fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
  } catch (err) {
      res.sendStatus(500);
  }
})
