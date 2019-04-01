const port = 1337;
const querystring = require('querystring');
const User = require('./models/user');
const express = require('express');
const app = express();

const Restaurant = require('./models/restaurants');


app.get('/restaurants', async (req,res) =>{
    res.json(await Restaurant.getAll())
})

app.get('/users', async (req, res)=>{
    res.json(await User.getAll())
})

app.get('/users/:id', async (req, res)=>{
    const theUser = await User.getById(req.params.id)
    res.json(theUser);
})

app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`)
})