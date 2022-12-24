const bcrypt = require('bcrypt');
const User = require ('../users/userModel');
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
    const usernameTest = /^[a-zA-Z0-9]{1,255}$/,
    passwordTest = /^(?=.{8,255}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).*$/,
    emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    try {
        if (
        req.body.username &&
        req.body.username.match(usernameTest) &&
        req.body.email && 
        req.body.email.match(emailTest) && 
        req.body.password && 
        req.body.password.match(passwordTest)
        ){
        next()
        }
        else if (!(req.body.username.match(usernameTest))){throw new Error ('Validation failed on username')}
        else if (!(req.body.email.match(emailTest))){throw new Error ('Validation failed on email')}
        else if (!(req.body.password.match(passwordTest))){throw new Error ('Validation failed on password')}
        else {throw new Error ('Validation failed, please ensure all fields are filled correctly')}
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