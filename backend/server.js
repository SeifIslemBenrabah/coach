require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin:'http://localhost:3000',
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.send('Express Backend is Running');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});
mongoose.connect('mongodb://localhost:27017/<your_database_name>', {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error)=>{
    console.log('faild to connect to mongo db!!');
})
