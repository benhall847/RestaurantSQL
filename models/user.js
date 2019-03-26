// bring in the database connection

const db = require('./conn');


// classes should start with an Upper-Case letter
// instances of classes

class User {

    constructor(id, first_name, last_name, email, password){
        // in python we say "self" in javascript "this"
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
    }
    // static means that the function is something the class can do
    // but an instance of the class cannot.
    static getById(id){
        // db.any always returns an array
        
        return db.one(`select * from users where id=${id}`)
                    .then((userData)=>{
                        const userInstance = new User(userData.id, userData.first_name, userData.last_name, userData.email, userData.password);
                        return userInstance;
                    })
                    .catch(()=>{
                        return null;
                    })
    }
    // no "static" because this is an "instance method"
    // the active instance of this class can use this method.


    save(){
        // use .result when you might want a report about 
        // how many rows got affected
        return db.result(`

        update users set
            first_name='${this.firstName}',
            last_name='${this.lastName}',
            email='${this.email}',
            password='${this.password}'
        where id = ${this.id}
        
        `)
    }
}

User.getById(3)
    .then((user)=>{
        // console.log(user)
    })

// export my User model
module.exports = User;