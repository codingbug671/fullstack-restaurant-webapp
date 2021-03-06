const express= require('express');
const app= express();
const mongoose= require('mongoose');
const env= require('dotenv').config();
const PORT= process.env.PORT || 2000;
const adminRoutes= require('./routes/admin/auth');
const restaurantRoutes= require('./routes/restaurant')
const cors= require('cors');
const path= require('path');

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.e4r3t.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log('Database connected');
});

app.use(cors());
app.use('/public', express.static(path.join(__dirname,'uploads')));
app.use(express.json());
app.use('/api', adminRoutes);
app.use('/api', restaurantRoutes);


if(process.env.NODE_ENV=='production'){
    app.use(express.static("frontend/build"))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })

    
}



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
