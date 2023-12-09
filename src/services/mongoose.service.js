const mongoose = require('mongoose');
const config = require('../configs/db.config');

exports.connectDb = ( ) => {
    let url = config.mongo.uri;
    mongoose.connect(url, {})
    .then(() => console.log('Connection reussi à mongodb'))
    .catch((err) => console.log('Connection echoué', err));
};