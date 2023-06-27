const db = require("../models");
const Major = db.major;

exports.majorNames = async (req, res) =>{
    Major.find({}).exec((err, search) => {
        if(err){
            res.status(500).send({message: err})
            return;
        }

        let namesList = []
        for(let i =0; i < search.length; i++){
            namesList.push(search[i].name)
        }
        //console.log(namesList)
        res.status(200).send(namesList)
        return namesList;
    });
};

exports.majorInfo = async (req, res) =>{
    //console.log(Fetching major info for: ", req.query);
    Major.find({name: req.query.major}).exec((err,search) =>{
        if(err){
            res.status(500).send({message: err})
            return;
        }

        //console.log(search);

        res.status(200).send(search)
    })
};