const Question = require("../models/question.model");
const User = require("../models/user.model");

exports.deleteQuestion = async (req, res) =>{
    try{
        const Id = req.params.id;
        const questions = await Question.findById(Id)
        const questionBy = questions.questionBy;
        const userId = res.locals.userId
        
        if(userId == questionBy)
        {
            const result = await Question.findByIdAndRemove(Id);          
            return res.status(200).json(result); 
        }
        else
        {
            return res.status(400).json({error: "Question not found"});
        }
              
    }catch (error) {
    return res.status(500).send({message: `Server error: ${error.message}`})
    }
  }