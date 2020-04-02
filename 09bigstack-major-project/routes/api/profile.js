const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load person model
const Person = require("../../models/Person");

//Load profile model
const Profile = require("../../models/Profile");


//@type     GET
//@route    /api/profile
//@desc     route for personnal user profile
//@access   PRIVATE

router.get("/",
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
                user: req.user.id
            })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json({
                        profileNotFound: "NO profile found"
                    })
                }
                res.json(profile);
            })
            .catch(err => console.log("got some error in profile " + err));

    })

router.get("/", (req, res) => res.json({
    profile: "profile is success"
}));


//@type     POST
//@route    /api/profile
//@desc     route for UPDATING/SAVING user profile
//@access   PRIVATE

router.post("/",
    passport.authenticate('jwt', {
        session: false
    }), 
    (res,req) =>{
         
    }
)

module.exports = router;