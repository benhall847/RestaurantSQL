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

async function main(){
    const user3 = await getUserNames(2);
    console.log(user3);
    console.log("yes")
}
// main()

async function yes(){
    const idArray = [1,2,3,4];

    const userPromiseArray = idArray.map(function(id){
        return getUserNames(id);
    });

    return Promise.all(userPromiseArray)
}
// console.log(yes())


// getUserNames(1).then(console.log)
//     .then(()=>{
//         getUserNames(2).then(console.log)
//     })
//     .then(()=>{
//         getUserNames(3).then(console.log)
//     })



async function main5(){
    const user3 = await getUserNames(3);
    const user2 = await getUserNames(2);
    console.log(user2)
    console.log(user3)
}
main5()