const User = require('../models/user');
const Restaurant = require('../models/restaurants');


const Review = require('../models/reviews')
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();



describe('Users model', ()=>{
    // 💩

    it('should be able to retrieve by id',async()=>{
        const theUser = await User.getById(3);
        // theUser.should.have.length(1)
        theUser.should.be.an.instanceOf(User)
    });


    it('should error if no user by id',async()=>{
        const theUser = await User.getById(2346);
        expect(theUser).to.be.null
    });


    it('should update the user',async()=>{
        // grab a user with id = 2 
        const theUser = await User.getById(2);
        // update the email value
        theUser.email = 'supermail@pooty.poo';
        // save the user 

        await theUser.save()
        const sameUser = await User.getById(2);

        expect(sameUser.email).to.equal('supermail@pooty.poo')
        
    });

});


describe('Restaurant model', ()=>{
        it('should be able to grab an array of restaurants',async ()=>{
            const arrayOfRestaurants = await Restaurant.getAll()
            expect(arrayOfRestaurants).to.be.instanceOf(Array);
        });
});





describe('Users model', ()=>{

})

describe('Reviews model', ()=>{
    // can i get one review?
    it('should be able to retrieve a review by id', async()=>{
        // hopes and dreams
        const aReview = await Review.getById(1);
        expect(aReview).to.be.an.instanceOf(Review);
    })
    // can i get all reviews?

    it('should be able to retrieve all reviews', async()=>{
        const aBunchOfReviews = await Review.getAll();
        expect(aBunchOfReviews).to.be.an.instanceOf(Array);

        for( let i=0; i<aBunchOfReviews.length; i++){
            expect(aBunchOfReviews[i]).to.be.an.instanceOf(Review);
        }
    })
})

describe ('Users and Reviews', ()=>{
    // can i get a review by a user?
    it('a User instance should be able to retrieve all their reviews',async()=>{
        // grab a user by id
        const theUser = await User.getById(3);
        // then get all their reviews
        const theReviews = await theUser.reviews;
        // confirm that their reviews are in an array
        expect(theReviews).to.be.an.instanceOf(Array)
        expect(theReviews).to.have.lengthOf(2)
        // and that each one is an instance of reviews
        for (let i = 0; i<theReviews.length;i++){
            expect(theReviews[i]).to.be.an.instanceOf(Review)
        }
    })
})

