const express =  require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

// Settings
app.set('port',process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/login',require('./routes/login'));
app.use('/personal-medico',require('./routes/personal-medico'));
app.use('/horarios',require('./routes/horarios'));
app.use('/roles',require('./routes/roles'));
app.use('/pacientes',require('./routes/pacientes'));


app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});

