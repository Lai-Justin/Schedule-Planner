const db = require("../models");
const User = db.user;


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

verifyToken = async (req, res, next) => {

   // res.status(401).send("THis is the test");

    let token = req.headers["x-access-token"];

    if (!token || token == "null" || !req.headers) {
        res.status(403).send({ message: "No access token provided!" })
        return ;
    }
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        
        const user = ticket.getPayload();
        if (!user) {
            return res.status(401).send({ message: "Unauthorized access token provided!" });
        }
        req.user = user;
        next();

    } catch (err) {
        console.log("VERIFICAITON ERROR");
        res.status(401).send({message: "Could not verify access token!"});
        //throw err;
    }

    return;
};

const authJwt = {
    verifyToken,
};
module.exports = authJwt;