// bring in the database connection

const db = require('./conn');

const Review = require('./reviews');

const bcrypt = require('bcryptjs');



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
    static getAll(){
        return db.any(`select * from users`)
            .then((arrayOfUsers)=>{
                return arrayOfUsers.map((eaUser)=>{
                    return new User(
                        eaUser.id,
                        eaUser.first_name,
                        eaUser.last_name,
                        eaUser.email,
                        eaUser.password
                    )
                })
            }
            )
    }

    static delete(id){
        return db.result('delete from users where id=$1', [id]);
    }

    static add(userData){
        return db.one(`
        insert into users
        (first_name, last_name, email, password)
        values
        ($1, $2, $3, $4)
        returning id, first_name
        `), [userData.first_name, userData.last_name, userData.email, userData.password]
        .then((data)=>{
            console.log("yuups")
            return data.id
        });
    }
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
    setPassword(newPassword){
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(newPassword, salt);
        this.password = hash;
    }
    checkPassword(password){
        
        return bcrypt.compareSync(password,this.password)
    }
    get reviews(){
        return db.any(`select * from reviews where user_id=${this.id}`)
            .then((arrayOfReviews)=>{
                return arrayOfReviews.map((reviewData)=>{
                    return new Review(
                        reviewData.id,
                        reviewData.score,
                        reviewData.textContent,
                        reviewData.restaurant_id,
                        reviewData.user_id)
                })
            })
    }
}

User.getById(3)
    .then((user)=>{
        // console.log(user)
    })

// export my User model
module.exports = User;