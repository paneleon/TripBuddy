const Question = require("../models/question.model");
const User = require("../models/user.model");

exports.deleteQuestion = async (req, res) =>{
    try {
        const userId = res.locals.userId;
        const user = await User.findById(userId);

        if (user && user.isAdmin) {
            const id  = req.params;
            const result = await Question.findByIdAndRemove(id);
            if (result) {
                return res.status(200).json({message: "Question is deleted sucessfully"});
            } else {
                return res.status(404).json({error: "Question not found"});
            }
        } else {
            return res.status(403).json({error: "User does not have the premission to perform this action"});
        }
    } catch (error) {
        return res.status(500).json({error: `Server error: ${error.message}`});
    }
 }
