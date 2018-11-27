const mongoose = require('mongoose');
var uri =  process.env.MONGODB_URI || "mongodb://localhost/rk_cmsapp";
var options = {
    user: '',
    pass: '',
    // server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
    reconnectTries: 10,
    useNewUrlParser: true 
};

 mongoose.Promise =global.Promise
 mongoose.connect(uri, options).then(
 () => {console.log('Database is connected')},
 () => {console.log('Connection not connected')}
 )
