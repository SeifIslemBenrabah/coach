require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const userRoute = require('./routes/user.route.js');
const loginRoute = require('./routes/login.route.js');
const coachRoute = require('./routes/coach.route.js')
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin:'http://localhost:3000',
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// Routes
app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/coach",coachRoute)

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error)=>{
    console.log('faild to connect to mongo db!!')
})
