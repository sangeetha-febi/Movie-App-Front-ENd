const userModel = require("../model/UserModel");

// registerAPI
const registerAPI = (req, res) => {
    const{name, email, password, role} = req.body;

    if(!name || !email || !password || !role){
        return res.status(400).json({message: "All fields are required"});
    }

    const existingUser = userModel.find(savedUser => savedUser.email === email);
    if(existingUser){
        return res.status(400).json(
            {message: "User mail already registered, try to login in your account"});
    }

    const newUser = {
        id: userModel.length ? userModel[userModel.length - 1].id + 1 : 1,
        name,
        email,
        password,
        role
    };
    userModel.push(newUser);
    res.status(201).json({message: "Registration successfully completed", newUser});
}


// loginAPI
const loginAPI = (req, res) => {
    const { email, password } = req.body;

    const user = userModel.find(savedUser => savedUser.email === email && savedUser.password === password);

    if(!user){
        return res.status(401).json({message: "Credentials mismatch"});
    }

    res.status(200).json({message: "Login successful", user});
}

module.exports = {registerAPI, loginAPI};