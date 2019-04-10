const port = 1338;
const express = require('express');
const app = express();
const handlers = require('./handlers');
const axios = require('axios');
const {getRestaurants, getUsers, getUserById, createUser, updateUser, deleteUser} = handlers;
const es6Renderer = require('express-es6-template-engine');

const session = require('express-session');
const fileStore = require('session-file-store')(session);

const User = require('./models/user');

app.use(express.urlencoded({extended:true}));
app.engine('html',es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

// set the "views" to the "views" folder

app.use(session({
    store: new fileStore(),
    secret: "awjio35974(Q!(#)*Q@KEF)(_mudfoig!*&Y@E&IQFIB E98nfivfrysGE&*@TEWDFYIUSHV#W(^&t7fiywt08ufg"
}));


app.get('/login', (req,res)=>{
    res.render('login-form',{
        locals: {
            email: '',
            message: ''
        }

    })
})

app.post('/login', async (req,res)=>{
    console.log(req.body)
    const newUser = await User.getByEmail(req.body.email)
    if(newUser.checkPassword(req.body.password)){
        req.session.user = newUser.id;
        // save the users ID to the session

        // then make sure the session is saved BEFORE we redirect.
        req.session.save(()=>{
            res.redirect('/dashboard')
        })
    }
    else{
        res.render('login-form',{
            locals: {
                email: req.body.email,
                message: "ACCESS DENIED"
            }
        });
    };



});

app.get('/dashboard', (req,res)=>{
    console.log(`the user is ${req.session.user}`)
    res.send("WELCOME TO YO PAGE!")
});



app.get('/fetchme',async (req, res)=>{
    const URL = 'http://yerkee.com/api/fortune';
    // axios.get(URL)
    res.send((await axios.get(URL)).data)
})


app.get('/restaurants', getRestaurants);

app.get('/users', getUsers);

app.get('/users/:id', getUserById);

app.post('/users', createUser);

app.put('/users/:id', updateUser);

app.delete('/users/:id', deleteUser);

app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`)
})