
const MongoClient = require('mongodb').MongoClient;
//const dbUri = "mongodb+srv://eservice:admin@mongodb+srv://cluster0-jotbb.mongodb.net/test?retryWrites=true&w=majority";

const dbUri ='mongodb+srv://eservice:admin@cluster0-jotbb.mongodb.net/eservice?retryWrites=true&w=majority';

function initialize(dbName,collectionName,successCallback,failureCallback){
    MongoClient.connect(dbUri,function(err,dbInstance){

        if(err){
            console.log("Error while connecting to mongodb");
            console.log(err);
            failureCallback(err)
        }else{
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(collectionName);
            console.log("Connection to mongodb is success");
            successCallback(dbCollection);
        }
    });
}

module.exports ={
    initialize
}