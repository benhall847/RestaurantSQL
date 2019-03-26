const db = require("./conn")

function getUsahBy(theId){
    return db.any(`SELECT * FROM users where id=${theId}`)
}

// getUsahBy(1).then(console.log)
//     .then(()=>{
//         getUsahBy(2).then(console.log)
//     })
//     .then(()=>{
//         getUsahBy(3).then(console.log)
//     })

function getUserNames(theId){
    return db.any(`SELECT first_name, last_name FROM users WHERE id=${theId}`)
}

getUserNames(1).then(console.log)
    .then(()=>{
        getUserNames(2).then(console.log)
    })
    .then(()=>{
        getUserNames(3).then(console.log)
    })

