const db = require('./conn');

class Review{
    static getById(id){
        return db.any(`select * from reviews where user_id=${id}`)
    }
}

module.exports = Review;