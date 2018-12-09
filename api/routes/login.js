const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

router.post('/', async (req, res, next) => {
    // retrieve user and password from body
    const { email, password } = req.body;
    try {
      // find a matching user in our db by email addres
      const user = await User.findOne({ email })
      // check the password the user provided against the password in the db
      if (user && user.password === password) {
        // if they match, send back the user
        res.status(200).json(user);
      } else {
        // if they don't match, send back a 401
        next (new Error('unauthorized'))
      }
    } catch (e) {
      next (e)
    }
  });

exports.router = router;