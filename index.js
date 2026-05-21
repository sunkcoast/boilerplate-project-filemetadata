'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res, next) => {
  upload.single('upfile')(req, res, (err) => {
    if (err) return res.json({ error: err.message });
    if (!req.file) return res.json({ error: 'no file uploaded' });

    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('File Metadata running on port ' + PORT));

module.exports = app;
