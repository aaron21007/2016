const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const moment = require('moment')
const transcriptor = require('./stt')
let aux_archivo = ''
// create express app
const app = express();

// upload file path
const FILE_PATH = './audios';

// configure multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${FILE_PATH}/`)
  },
  filename: function (req, file, cb) {
    aux_archivo = moment().format('YYYY-MM-DD_HH:mm:ss') + '-' + file.originalname
    cb(null, aux_archivo)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // allow images only
    if (!file.originalname.match(/\.(mp3|wav)$/)) {
      return cb('Solo se admiten archivos de Audio', true);
    }
    cb(null, true);
  }
});

// enable CORS
app.use(cors());

// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));

// start the app 
const port = process.env.PORT || 3001;

app.post('/upload-audio', upload.single('audio'), async (req, res) => {
  try {
    const audio = req.file;

    // make sure file is available
    if (!audio) {
      res.status(400).send({
        status: false,
        data: 'No file is selected.'
      });
    } else {
      // send response
      let transcripcion = await transcriptor.transcribe(`${FILE_PATH}/${aux_archivo}`).then((result) => {
        return result
      }).catch((err) => {
        console.error(err);
        return "NA"
      });
      res.send({
        status: true,
        message: 'File is uploaded.',
        data: {
          name: audio.originalname,
          mimetype: audio.mimetype,
          size: audio.size,
          guardado: aux_archivo,
          transcripcion: transcripcion
        }
      });
    }

  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () =>
  console.log(`App is listening on port ${port}.`)
);