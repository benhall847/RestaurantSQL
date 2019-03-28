const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const User = require('./models/user');

const Restaurant = require('./models/restaurants');

const server = http.createServer(async(req,res)=>{
    console.log(req.url);
    res.statusCode = 200;

    res.setHeader('Content-Type', 'application/JSON');
    let response = '';
    // if req.url === "/restaurants"
    // send all restaurants
    // if req.url === "/users"
    // send all users

    // else send a welcome message

    if (req.url === '/restaurants'){
        response = await Restaurant.getAll();
        response = JSON.stringify(response);

    }else if (req.url.startsWith('/users')){
        const reqURL = req.url.split('/');

        if (reqURL.length === 2){
            response = await User.getAll();
            response = JSON.stringify(response);

        }else if (reqURL.length === 3){
            response = await User.getById(reqURL[2])
            response = JSON.stringify(response);
        }else{
            res.statusCode = 404;
            res.end('ACCESS DENIED')
        }

    }else{
        response = `{
            message:"Thanks BRO!"
        }`
    }

    res.end(response);
})
server.listen(port, hostname, ()=>{
    console.log(`listening on http://${hostname}:${port}`)
})