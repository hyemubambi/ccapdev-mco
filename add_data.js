const mongoose = require('mongoose');

const User = require('./models/user.js');
const Condo = require('./models/condo.js');
const Review = require('./models/review.js');
const Comment = require('./models/comment.js');

const add_data = {
    populateCondo: function(){
        var condo = [{
            cName: 'Manila Residences',
            description: `THE MANILA RESIDENCES TOWER II is a 39-storey office, commercial and residential condominium strategically located at 2310 Taft Avenue, Malate, Manila. It is in close proximity to various establishments such as Dela Salle University (0.16 Km), College of St. Benilde (0.4 Km), St. Scholastica's College (0.5 Km), SM Hypermart (0.85 Km), Harrison Plaza (1.3 Km), nearby restaurants, hospitals, churches and other places of cultural interest and entertainment.`,
            lRange: 16000.00,
            hRange: 32000.00,
            nReviews: 0,
            rating: 0,
            photo: 123546
        },
        {
            cName: 'Studio Zen',
            description: `THE MANILA RESIDENCES TOWER II is a 39-storey office, commercial and residential condominium strategically located at 2310 Taft Avenue, Malate, Manila. It is in close proximity to various establishments such as Dela Salle University (0.16 Km), College of St. Benilde (0.4 Km), St. Scholastica's College (0.5 Km), SM Hypermart (0.85 Km), Harrison Plaza (1.3 Km), nearby restaurants, hospitals, churches and other places of cultural interest and entertainment.`,
            lRange: 16000.00,
            hRange: 32000.00,
            nReviews: 0,
            rating: 0,
            photo: 123546
        },
        {
            cName: 'One Archers Place',
            description: `THE MANILA RESIDENCES TOWER II is a 39-storey office, commercial and residential condominium strategically located at 2310 Taft Avenue, Malate, Manila. It is in close proximity to various establishments such as Dela Salle University (0.16 Km), College of St. Benilde (0.4 Km), St. Scholastica's College (0.5 Km), SM Hypermart (0.85 Km), Harrison Plaza (1.3 Km), nearby restaurants, hospitals, churches and other places of cultural interest and entertainment.`,
            lRange: 16000.00,
            hRange: 32000.00,
            nReviews: 0,
            rating: 0,
            photo: 123546
        },
        {
            cName: 'The Green Residence',
            description: `THE MANILA RESIDENCES TOWER II is a 39-storey office, commercial and residential condominium strategically located at 2310 Taft Avenue, Malate, Manila. It is in close proximity to various establishments such as Dela Salle University (0.16 Km), College of St. Benilde (0.4 Km), St. Scholastica's College (0.5 Km), SM Hypermart (0.85 Km), Harrison Plaza (1.3 Km), nearby restaurants, hospitals, churches and other places of cultural interest and entertainment.`,
            lRange: 16000.00,
            hRange: 32000.00,
            nReviews: 0,
            rating: 0,
            photo: 123546
        },
        {
            cName: `D' University Place`,
            description: `THE MANILA RESIDENCES TOWER II is a 39-storey office, commercial and residential condominium strategically located at 2310 Taft Avenue, Malate, Manila. It is in close proximity to various establishments such as Dela Salle University (0.16 Km), College of St. Benilde (0.4 Km), St. Scholastica's College (0.5 Km), SM Hypermart (0.85 Km), Harrison Plaza (1.3 Km), nearby restaurants, hospitals, churches and other places of cultural interest and entertainment.`,
            lRange: 16000.00,
            hRange: 32000.00,
            nReviews: 0,
            rating: 0,
            photo: 123546
        },
        {
            cName: 'WH Taft Residence',
            description: `THE MANILA RESIDENCES TOWER II is a 39-storey office, commercial and residential condominium strategically located at 2310 Taft Avenue, Malate, Manila. It is in close proximity to various establishments such as Dela Salle University (0.16 Km), College of St. Benilde (0.4 Km), St. Scholastica's College (0.5 Km), SM Hypermart (0.85 Km), Harrison Plaza (1.3 Km), nearby restaurants, hospitals, churches and other places of cultural interest and entertainment.`,
            lRange: 16000.00,
            hRange: 32000.00,
            nReviews: 0,
            rating: 0,
            photo: 123546
        }

        ]

        Condo.insertMany(condo);
    }

}


module.exports = add_data;