const port = 1337;
const express = require('express');
const app = express();
const handlers = require('./handlers');
const {getRestaurants, getUsers, getUserById, createUser, updateUser, deleteUser} = handlers;

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