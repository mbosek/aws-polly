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
