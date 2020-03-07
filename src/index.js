const app = require('./server.js');
require('./database.js')

app.listen(app.get('port'), ()=>{
    console.log('server on por 3000');
});
