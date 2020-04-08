const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load person model
const Person = require("../../models/Person");

//Load profile model
const Profile = require("../../models/Profile");

// Lord Question model
const Question = require("../../models/Question");

//@type     GET
//@route    /api/question
//@desc     route for personnal user profile
//@access   PUBLIC
// dammi route
// router.get("/", (req, res) => {
//     res.json({
//         question: "question is success"
//     });
// })



//@type     GET
//@route    /api/question
//@desc     route for showing all questions
//@access   PUBLIC

router.get("/", (req, res) => {
    Question.find()
        .sort({
            date: 'desc'
        })
        .then(question => res.json(question))
        .catch(err => res.json({
            noQuestions: "no Questions to disaplay"
        }));
})


//@type     POST
//@route    /api/questions/
//@desc     route for submiting questions
//@access   PRIVATE

router.post("/", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const newQuestion = new Question({
        textone: req.body.textone,
        texttwo: req.body.texttwo,
        user: req.body.user,
        name: req.body.name
    });
    newQuestion.save()
        .then(question => res.json(question))
        .catch(err => console.log("Unable to push question to database" + err))
})



// @type     POST
// @route    /api/question/answers/:id
// @desc     route for submittig answers to questions
// @access   PRIVATE

router.post("/answers/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Question.findById(req.params.id)
        .then(question => {
            const newAnswer = {
                user: req.user.id,
                name: req.body.name,
                text: req.body.text
            };
            question.answers.unshift(newAnswer)

            question.save()
                .then(question => res.json(question))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

})


// @type     POST
// @route    /api/questions/upvote/:id
// @desc     route for upvoting
// @access   PRIVATE


router.post('/upvote/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Question.findById(req.params.id)
                .then(question => {
                    if (question.upvotes.filter(upvote => upvote.user.toString() === req.user.id.toString()).length > 0) {
                        
                        return res.status(400).json({
                            noUpvote: "user already upvoted"
                        })
                        //assignment 
                        // remove the user upvote 
                        //send a message that "you down voted successfully"
                    }
                    question.upvotes.unshift({
                        user: req.user.id
                    })
                    question.save()
                        .then(question => res.json(question))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})



//asignments
//1. delete questions
//2. delete all questions
//3. create separate route for linux questions "1. description, 2. code, 3. header "
//4. comment and love 

module.exports = router;