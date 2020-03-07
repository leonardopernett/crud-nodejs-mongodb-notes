const {connect, set}= require('mongoose');

// const {MONGO_HOST, MONGO_DATABASE} = process.env
// const MONGO_URI= `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`;

set('useCreateIndex', true);

connect('mongodb://localhost/node-app',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(console.log('db is connected'))
.catch(err=> console.log(err))