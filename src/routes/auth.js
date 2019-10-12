const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerValidation = require('../validation/register');
const loginValidation = require('../validation/login');

router.post('/auth/register', async (req, res) => {

    const {error} = registerValidation(req.body);

    if (error) return res.status(400).json(error.details[0]);

    const emailExist = await User.findOne({email: req.body.email});

    if (emailExist) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        delete savedUser.password;
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/auth/login', async (req, res) => {
    const {error} = loginValidation(req.body);

    if (error) return res.status(400).json(error.details[0]);

    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(400).json({
            message: 'Email or password is wrong'
        });
    }    

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
        return res.status(400).json({
            message: 'Email or password is wrong'
        });
    }

    const token = jwt.sign({
        _id: user.id,
        email: user.email
    }, process.env.TOKEN_SECRET);
    
    const bearerToken = `Bearer ${token}`;
    
    res.header('Authorization', bearerToken);
    
    res.json({access_token: bearerToken});

});

module.exports = router;