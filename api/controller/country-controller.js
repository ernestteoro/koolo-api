const mongoose = require('mongoose');
const CountryModel = require('../model/country');

// get all countrys or one country using its id
exports.get_country = (req, res, next) => {
    const countryId = req.params._id;
    if (countryId) {
        CountryModel.findById(countryId).select('_id name description created').populate('createdby','email istasker isLogin').then(country => {
            return res.status(200).json({
                country
            });
        }).catch(err => {
            return res.status(404).json({
                message: 'No user data found'
            });
        });
    } else {
        CountryModel.find().select('_id name description created').populate('createdby','email istasker isLogin').then(countries => {
            if (countries) {
                const response = {
                    count: countries.length,
                    countries: countries
                }
                return res.status(200).json({
                    response
                });
            } else {
                return res.status(404).json({
                    message: 'No user data found'
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: err.message
            });
        });
    }
}


// Method to add a country
exports.add_country=(req, res, next)=>{
    const country = new CountryModel({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description,
        createdby:req.userData.userId
        //user:req.userData.userId
    });
    country.save().then(savedcountry=>{
        res.status(200).json({
            country:savedcountry,
            request:{
                type:'GET',
                url:'http://localhost:8080/countries/'+savedcountry._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a country
exports.update_country=(req, res, next)=>{

    const _id = req.params._id;
    const country ={
        name:req.body.name,
        description:req.body.description,
    };
    CountryModel.update({_id:_id},country).then(updatedcountry=>{
        country._id=_id;
        res.status(200).json({
            country:country,
            request:{
                type:'GET',
                url:'http://localhost:8080/countrys/'+country._id
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a country
exports.delete_country=(req, res, next)=>{
    const _id = req.params._id;
    countryModel.deleteOne({_id:_id}).then(deletedcountry=>{
        res.status(200).json({
            country:deletedcountry,
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}