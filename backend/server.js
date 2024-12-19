require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');   
const app = express();
const userRoute = require('./routes/user.route.js');
const loginRoute = require('./routes/login.route.js');
const coachRoute = require('./routes/coach.route.js')
const fileRoute = require('./routes/file.route.js')
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
app.use("/coach",coachRoute);
app.use("/file",fileRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/abonnement', (req, res) => {
    const abonnement = ['1 Moi','2 Moi','3 Moi','4 Moi','5 Moi','6 Moi','7 Moi','8 Moi','9 Moi','10 Moi','11 Moi','12 Moi'];
    res.status(200).json(abonnement);
});
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error)=>{
    console.log('faild to connect to mongo db!!')
})
