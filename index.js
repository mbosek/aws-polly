const AWS = require('aws-sdk')
const Fs = require('fs')
const uuid = require('node-uuid');

const s3 = new AWS.S3();

const bucketName = 'audio-bucket-' + uuid.v4();
const keyName = 'beercoders.mp3';

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

const params = {
    'Text': 'Hi, good to here you!',
    'OutputFormat': 'mp3',
    'VoiceId': 'Justin'
}

Polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
    console.log(err.code)
  } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        s3.createBucket({ Bucket: bucketName }, () => {
          let params = { Bucket: bucketName, Key: keyName, Body: data.AudioStream };
          s3.putObject(params, (err, data) => {
            if (err)
              console.log(err)
            else
              console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
          });
        });
      }
    }
});
