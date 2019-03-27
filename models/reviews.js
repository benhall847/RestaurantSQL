const db = require('./conn');

class Review{
    constructor(id, score, textContent, restaurant_id, user_id){
        this.id = id
        this.score = score
        this.textContent = textContent
        this.restaurantId = restaurant_id
        this.userId = user_id
    }
    static getById(id){
        return db.one(`select * from reviews where id=${id}`)
            .then((reviewData)=>{
                const reviewInstance = new Review(reviewData.id, reviewData.score, reviewData.textContent, reviewData.restaurant_id, reviewData.user_id)
                return reviewInstance
            })
    }

    static getAll(){
        return db.any(`select * from reviews `)
        .then((arrayOfReviews)=>{
            return arrayOfReviews.map((reviewData)=>{
                return  new Review(
                    reviewData.id, 
                    reviewData.score, 
                    reviewData.textContent, 
                    reviewData.restaurant_id, 
                    reviewData.user_id
                    )

            })

        })
    }
    
}

module.exports = Review;