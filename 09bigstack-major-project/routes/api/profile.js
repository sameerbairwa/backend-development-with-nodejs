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

router.get(
    "/",
    passport.authenticate("jwt", {
        session: false,
    }),
    (req, res) => {
        Profile.findOne({
                user: req.user.id,
            })
            .then((profile) => {
                if (!profile) {
                    return res.status(404).json({
                        profileNotFound: "NO profile found",
                    });
                }
                res.json(profile);
            })
            .catch((err) => console.log("got some error in profile " + err));
    }
);

// router.get("/", (req, res) =>
//   res.json({
//     profile: "profile is success"
//   })
// );

//@type     POST
//@route    /api/profile
//@desc     route for UPDATING/SAVING user profile
//@access   PRIVATE

router.post(
    "/",
    passport.authenticate("jwt", {
        session: false,
    }),
    (req, res) => {
        const profileValues = {};
        profileValues.user = req.user.id;
        if (req.body.username) profileValues.username = req.body.username;
        if (req.body.website) profileValues.website = req.body.website;
        if (req.body.country) profileValues.country = req.body.country;
        if (req.body.protfolio) profileValues.protfolio = req.body.protfolio;
        if (typeof req.body.username !== undefined) {
            profileValues.languages = req.body.languages.split(",");
        }
        profileValues.date = Date.now;
        //get social links
        profileValues.social = {};
        if (req.body.youtube) profileValues.social.youtube = req.body.youtube;
        if (req.body.facebook) profileValues.social.facebook = req.body.facebook;
        if (req.body.instagram) profileValues.social.instagram = req.body.instagram;

        //Do datbase stuff
        Profile.findOne({
                user: req.user.id,
            })
            .then((profile) => {
                if (profile) {
                    Profile.findOneAndUpdate({
                            user: req.user.id,
                        }, {
                            $set: profileValues,
                        }, {
                            new: true,
                        })
                        .then((profile) => res.json(profile))
                        .catch((err) => console.log("Problem in Update" + err));
                } else {
                    Profile.findOne({
                            username: profileValues.username,
                        })
                        .then((profile) => {
                            //Username already exists
                            if (profile) {
                                res.status(400).json({
                                    username: "username already exists",
                                });
                            }
                            // save user
                            new Profile(profileValues)
                                .save()
                                .then((profile) => res.json(profile))
                                .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log("Problem in fetching profile" + err));
    }
);

//@type     GET
//@route    /api/profile/:username
//@desc     route for getting user profile based on USERNAME
//@access   PUBLIC

router.get("/:username", (req, res) => {
    Profile.findOne({
            username: req.params.username
        })
        .populate("user", ["name", "profilepic"])
        .then((profile) => {
            if (!profile) {
                res.status(404).json({
                    userNotFound: "User not found"
                });
            }
            res.json(profile);
        })
        .catch((err) => console.log("Error in fetching username" + err));
});

//@type     GET
//@route    /api/profile/fnid/everyone
//@desc     route for getting user profile based on EVERYONE
//@access   PUBLIC

router.get("/find/everyone", (req, res) => {
    Profile.find()
        .populate("user", ["name", "profilepic"])
        .then((profile) => {
            if (!profile) {
                res.status(404).json({
                    userNotFound: "NO profiles found"
                });
            }
            res.json(profile);
        })
        .catch((err) => console.log("Error in fetching username" + err));
});

//@type     DELETE
//@route    /api/profile/
//@desc     route for deleting user based on ID
//@access   PRIVATE

router.delete(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
            user: req.user.id
        })
        Profile.findOneAndRemove({
                user: req.user.id
            })
            .then(() => {
                Person.findOneAndRemove({
                        _id: req.user.id
                    })
                    .then(() => res.json({
                        success: "delete was successful"
                    }))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }
);

//@type     POST
//@route    /api/profile/mywork
//@desc     route for adding work profile of a person
//@access   PRIVATE

router.post("/workrole", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {

            // if profile found or not 
            const newwork = {
                role: req.body.role,
                company: req.body.company,
                country: req.body.country,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                details: req.body.details
            }
            profile.workrole.unshift(newwork);
            profile.save()
                .then(profile => res.json(profile))
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err))
})


//@type     DELETE
//@route    /api/profile/workrole/:w_id
//@desc     route for delete workrole
//@access   PRIVATE

router.delete("/workrole/:w_id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            // assignment to check if we got a profile
            const removethis = profile.workrole
                .map(item => item.id)
                .indexOf(req.params.w_id);

            profile.workrole.splice(removethis,1);
            profile.save()
            .then(profile => res.json(profile))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))


})

module.exports = router;