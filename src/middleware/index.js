const bcrypt = require('bcrypt');
const User = require ('../users/userModel');
const jwt = require('jsonwebtoken')
exports.hashPass = async(req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
};
exports.comparePass = async(req, res, next) => {
    try {
        req.user = await User.findOne({username: req.body.username});
        // console.log("user found in my data")
        console.log(req.body.password, req.user.password);
        if (req.user && await bcrypt.compare(req.body.password, req.user.password)){
            console.log("username exists and plan text password matches hashed password");
            next()
        }
        else {
            throw new Error ("incorrect username or password")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
};
exports.validateUser = (req, res, next) => {
    // console.log(req)
    const usernameTest = /^[a-zA-Z0-9]{1,255}$/,
    passwordTest = /^(?=.{8,255}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).*$/,
    emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const body = req.body;
    // console.log(body);
    // console.log("Body above")
    try {
        if (
        body.username &&
        body.email && 
        body.password
        )
        {
            if (
                body.username.match(usernameTest) && 
                body.email.match(emailTest) && 
                body.password.match(passwordTest)
                )
                {
                next()
                }                        
            else if (!(body.username.match(usernameTest))){throw new Error ('Validation failed on username')}
            else if (!(body.email.match(emailTest))){throw new Error ('Validation failed on email')}
            else if (!(body.password.match(passwordTest))){throw new Error ('Validation failed on password')}
            else {throw new Error ('Validation failed, please ensure all fields are filled correctly')}
        }
        else if (!(body.username)){throw new Error ('Validation failed on username')}
        else if (!(body.email)){throw new Error ('Validation failed on email')}
        else if (!(body.password)){throw new Error ('Validation failed on password')}
        else {throw new Error ('Validation failed, please ensure all fields are filled')}
}
    catch (error) {
        console.log(error);
        res.status(500).send({error: error.message})
    }
};
exports.validateListing = async(req, res, next) => {
    const nameTest = /^[\w\s\',.#\$%^&*-_=+-]{0,255}$/,
    priceTest = /^\d{1,5}(\.\d{0,2})?$/
    try {
        const seller = await User.findOne({username: req.body.seller})
        if (
            req.body.name.match(nameTest) &&
            req.body.price.match(priceTest) &&
            seller
        ){
            next();
        }
        else if (!(req.body.name.match(nameTest))){throw new Error ('Invalid listing name')}
        else if (!(req.body.price.match(priceTest))){throw new Error ('Invalid listing price')}
        else if (!(seller)){throw new Error ('No such seller')}
    } catch (error) {
        res.status(500).send({error: error.message})
    }

}

exports.tokenCheck = async (req, res, next) => {
    try {
        //get the token thats passed in the headers 
        const token = req.header("Authorization").replace("Bearer ", "")

        //throw an error if no token is passed in the request
        if (!token) {
            console.log("no token passed")
            throw new Error ("No token passed")
        }

        // decode the token using the jwt verify method. we pass the method two parameters.
        //encoded token that we got on line  51 and the secret password we encoded in the token when we generated it 
        const decodedToken = await jwt.verify(token, process.env.SECRET)
        // console.log(decodedToken)
        // console.log(decodedToken._id)
        
        //decodedToken is an object containing the users unique id. 
        //we can then use that unique id to find our user in our database =
        const user = await User.findById(decodedToken._id)
        // console.log("find by ID")
        // console.log(user)
        //if user is not null. move onto the controller
        //else throw a new error that user is not authorised or doesn't exist in our database
        console.log(user)
        if(user) {
            req.authUser = user
            next()
        } else {
            throw new Error ("user is not authorised")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error : error.message})
    }
}