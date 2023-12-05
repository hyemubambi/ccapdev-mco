const mongoose = require('mongoose');

const User = require('./models/user.js');
const Condo = require('./models/condo.js');
const Review = require('./models/review.js');
const Comment = require('./models/comment.js');

const add_data = {
    populateCondo: function(){
        var condo = [{
            cName: 'Manila Residences',
            description: `The Manila Residences is a towering 39-storey office, commercial and residential condominium designed to provide quality and luxury living at very affordable prices.`,
            lRange: 14000.00,
            hRange: 30000.00,
            nReviews: 0,
            rating: 0,
            photo: 'https://res.cloudinary.com/dzadlrvwt/image/upload/v1701762515/manilaresidences_lexlcr.jpg',
        },
        {
            cName: 'Studio Zen',
            description: `Discover the best investment you can give your children at Studio Zen, a 21-storey condominium development located along Taft Avenue in Metro Manila. With a host of student-oriented amenities, Zen-inspired features, and functional building facilities, it is ideal for students living independently and entrepreneurs who want to take advantage of the ready rental market in the area.`,
            lRange: 16000.00,
            hRange: 30000.00,
            nReviews: 0,
            rating: 0,
            photo: 'https://res.cloudinary.com/dzadlrvwt/image/upload/v1701762515/studiozen_hwz8ii.jpg',
        },
        {
            cName: 'One Archers Place',
            description: `One Archers Place is a 2 tower high-rise residential condominium project in Taft Avenue, Manila, carrying the Eton Properties Philippines brand. The development promises to deliver an exclusive and distinctive living experience.`,
            lRange: 12000.00,
            hRange: 24000.00,
            nReviews: 0,
            rating: 0,
            photo: 'https://res.cloudinary.com/dzadlrvwt/image/upload/v1701762515/onearchers_k1nf1w.jpg',
        },
        {
            cName: 'Green Residences',
            description: `Located right beside De La Salle University in Manila, Green Residences Taft gives you a great place to live out the best parts of college life: a stress-free, easy, and fun one that every college student should experience.`,
            lRange: 16000.00,
            hRange: 34000.00,
            nReviews: 0,
            rating: 0,
            photo: 'https://res.cloudinary.com/dzadlrvwt/image/upload/v1701762515/greenresidence_xuafel.jpg',
        },
        {
            cName: `D' University Place`,
            description: `D University Place features a modern grand lobby, leading to the sky lounge elevator lobby and a multi-functional deck, where residents can enjoy their downtime, with an infinity pool and gym to be used for their pleasure.`,
            lRange: 16000.00,
            hRange: 32000.00,
            nReviews: 0,
            rating: 0,
            photo: 'https://res.cloudinary.com/dzadlrvwt/image/upload/v1701762515/duniversityplace_adqava.jpg',
        },
        {
            cName: 'WH Taft Residence',
            description: `From studio rooms to study and game rooms, WH Taft Residences has rooms conducive for play, study, and work activities. Look no further as our amenities are suited to compliment your student life.`,
            lRange: 18000.00,
            hRange: 34000.00,
            nReviews: 0,
            rating: 0,
            photo: 'https://res.cloudinary.com/dzadlrvwt/image/upload/v1701762516/whtaft_bbafic.jpg',
        }

        ]

        Condo.insertMany(condo);
    },

    populateUsers: function() {
        var user = [{
            username: 'simjake2002',
            password: 'Enhypen1!',
            fName: 'Jake',
            lName: 'Sim',
            email: 'jakesim@gmail.com',
            uCondo: 'Green Residences',
            bio: 'We go shout shout shout when we\'re together!',
            pfp: 'uploads/jake.jpg',
            admin: false,
        },
        {
            username: 'jennierubyjane',
            password: 'Blackpink1!',
            fName: 'Jennie',
            lName: 'Kim',
            email: 'jenniekim@gmail.com',
            uCondo: 'Manila Residences',
            bio: 'I love you and me, dancing in Manila',
            pfp: 'uploads/jennie.jpg',
            admin: false,
        },
        {
            username: 'balletzuha',
            password: 'Lesserafim1!',
            fName: 'Kazuha',
            lName: 'Nakamura',
            email: 'kazuhanakamura@gmail.com',
            uCondo: 'One Archers Place',
            bio: 'I\'m Fearless',
            pfp: 'uploads/kazuha.jpg',
            admin: false,
        },
        {
            username: 'SabrinaKarpintero',
            password: 'Soloist1!',
            fName: 'Sabrina',
            lName: 'Carpenter',
            email: 'sabrinacarpenter@gmail.com',
            uCondo: 'One Archers Place',
            bio: 'I\'m talking all around the clock',
            pfp: 'uploads/sabrina.png',
            admin: false,
        },
        {
            username: 'ItsSunghoon',
            password: 'Enhypen1!',
            fName: 'Sunghoon',
            lName: 'Park',
            email: 'sunghoonpark@gmail.com',
            uCondo: 'WH Taft Residence',
            bio: 'It\'s you and me in this world~',
            pfp: 'uploads/sunghoon.jpg',
            admin: false,
        },
        {
            username: 'operayunjin',
            password: 'Lesserafim1!',
            fName: 'Yunjin',
            lName: 'Huh',
            email: 'yunjinhuh@gmail.com',
            uCondo: 'Manila Residences',
            bio: 'I=/=DOLL',
            pfp: 'uploads/yunjin.jpg',
            admin: false,
        },
        {
            username: 'webAdmin',
            password: 'Hello12345!',
            fName: 'Admin',
            lName: 'A',
            email: 'admin@gmail.com',
            uCondo: '',
            bio: 'Admin of Taft Tower Talk.',
            pfp: 'images/default-pfp.jpg',
            admin: true,
        },
        ]

        User.insertMany(user);
    }

}

module.exports = add_data;