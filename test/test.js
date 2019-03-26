const assert = require('assert');
const User = require('../models/user');
const chai = require('chai');
const Restaurant = require('../models/restaurants');
const Review = require('../models/reviews')
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
        theUser.save()
            .then(async (report)=>{
                // console.log(report);
                // re-grab the user
                const sameUser = await User.getById(2);
                // expect the email value.
                expect(sameUser.email).to.equal('supermail@pooty.poo')
            });

        
    });
});


describe('Restaurant model', ()=>{
        it('should be able to grab an array of restaurants',async ()=>{
            const arrayOfRestaurants = await Restaurant.getAll()
            expect(arrayOfRestaurants).to.be.instanceOf(Array);
        });
});


describe('Review model', ()=>{
    it('should return an array of user reviews',async()=>{
        const userReviews = await Review.getById(2);
        expect(userReviews).to.be.instanceOf(Array);
    });
});


