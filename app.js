const port = 1337;
const User = require('./models/user');
const express = require('express');
const app = express();
var multer = require('multer');
var upload = multer();

const Restaurant = require('./models/restaurants');

app.use(express.urlencoded({extended:true}));


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

app.post('/users', async (req, res) => {
    const {first_name, last_name, email, password} = req.body;

    await User.add(first_name, last_name, email, password)
    res.send(`added a new user ${req.body}`)
});

// app.post('/users', async(req,res) => {
//     req.on('end',()=>{
//         const parsedBody = querystring.parse(body)
//         console.log(parsedBody)
//     })
//     res.send("You added a user!")
// })

app.put('/users/:id', async (req, res) => {
    res.send(`You updated user: ${req.params.id}`)
})
app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    await User.delete(id);
    res.send(`You deleted user: ${id}`);
})
app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`)
})