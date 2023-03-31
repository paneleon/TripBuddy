import React, {useState} from 'react'

const CreateFAQ = () => {

    const [newQuestion, setNewQuestion] = useState(null)
    const [newAnswer, setNewAnswer] = useState(null)

    const createNewQuestion = async () => {

    }

  return (
    <div class="my-5 w-50">
        <input className='form-control' placeholder='Question' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)}/>
        <input className='form-control  mb-2' placeholder='Answer' value={newAnswer}  onChange={(e) => setNewAnswer(e.target.value)}/>
        <button className='btn btn-success'>Add</button>
    </div>
  )
}

export default CreateFAQ