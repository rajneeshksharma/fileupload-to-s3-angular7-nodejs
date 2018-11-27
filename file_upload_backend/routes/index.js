const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const Upload = require('../models/upload.model');
let bucket = "test-node-1";
let s3Client = new AWS.S3({
  accessKeyId: '*************',
  secretAccessKey: '*************'
});

var upload = multer({
  dest: './public/images'
});
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//FIRST SAVE IN LOCAL THEN SEND TO S3 Storage
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        code: 400,
        message: ' No file received.',
        data: []
      });
    } else {
      let pathname =
        s3Client.putObject({
          Bucket: bucket,
          Key: req.file.filename,
          ACL: 'public-read',
          Body: fs.readFileSync(req.file.path),
          ContentLength: req.file.size,
          ContentType: req.file.mimetype,
        }, function (err, data) {
          if (err) {
            return res.json({
              error: "Error while uploading image."
            });
          }
          let imageUrl = "https://s3.amazonaws.com/" + bucket + "/" + req.file.filename;
          Upload.create({
            name: req.body.name,
            image: imageUrl
          }).then(
            result => {
              return res.json({
                code: 200,
                message: 'Image uploaded successfully',
                data: [imageUrl]
              });
            }
          ).catch(
            err => {
              return res.json({
                code: 400,
                message: 'some error',
                data: []
              });
            }
          );
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

let upload2 = multer();
router.post('/uploads3', upload2.single('image'), async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.json({
        code: 400,
        message: ' No file received.',
        data: []
      });
    } else {
const fileName = Math.random()*21312534165+''+req.file.originalname;
      let pathname =
        s3Client.putObject({
          Bucket: bucket,
          Key: fileName,
          ACL: 'public-read',
          Body: req.file.buffer,
          ContentLength: req.file.size,
          ContentType: req.file.mimetype,
        }, function (err, data) {
          if (err) {
            return res.json({
              error: "Error while uploading image."
            });
          }
          let imageUrl = "https://s3.amazonaws.com/" + bucket + "/" + fileName;
          Upload.create({
            name: req.body.name,
            image: imageUrl
          }).then(
            result => {
              return res.json({
                code: 200,
                message: 'Image uploaded successfully',
                data: [imageUrl]
              });
            }
          ).catch(
            err => {
              return res.json({
                code: 400,
                message: 'some error',
                data: []
              });
            }
          );
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


module.exports = router;