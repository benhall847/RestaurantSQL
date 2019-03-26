const db = require('./conn')

class Restaurant {

    static getAll(){
        return db.any(`select * from restaurants`);
    }
}



module.exports = Restaurant