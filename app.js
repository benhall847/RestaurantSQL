const port = 1337;
const express = require('express');
const app = express();
const handlers = require('./handlers');
const axios = require('axios');
const {getRestaurants, getUsers, getUserById, createUser, updateUser, deleteUser} = handlers;
const es6Renderer = require('express-es6-template-engine');


app.engine('html',es6Renderer);
app.set('view engine', 'html');

app.set('views', 'views');
// set the "views" to the "views" folder


app.get('/login', (req,res)=>{
    res.render('login-form')
})



app.get('/fetchme',async (req, res)=>{
    const URL = 'http://yerkee.com/api/fortune';
    // axios.get(URL)
    res.send((await axios.get(URL)).data)
})

app.use(express.urlencoded({extended:true}));

app.get('/restaurants', getRestaurants);

app.get('/users', getUsers);

app.get('/users/:id', getUserById);

app.post('/users', createUser);

app.put('/users/:id', updateUser);

app.delete('/users/:id', deleteUser);

app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`)
})