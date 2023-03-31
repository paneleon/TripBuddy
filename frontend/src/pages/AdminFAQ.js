import React, {useState, useEffect} from 'react'
import { Container, Accordion, Button } from 'react-bootstrap'
import CreateFAQ from '../components/CreateFAQ'
import EditFAQ from '../components/EditFAQ'
import ViewFAQ from '../components/ViewFAQ'

const sampleQuestions = [  
  {    question: "What is the capital of France?",    answer: "Paris" , },  
  {    question: "What is the largest mammal on Earth?",    answer: "Blue Whale"  },  
  {    question: "What is the boiling point of water?",    answer: "100 degrees Celsius"  },  
  {    question: "What is the chemical symbol for gold?",    answer: "Au"  },  
  {    question: "What is the tallest mountain in the world?",    answer: "Mount Everest"  },  
  {    question: "What is the largest organ in the human body?",    answer: "Skin"  },  
  {    question: "What is the currency of Japan?",    answer: "Yen"  },  
  {    question: "What is the largest desert in the world?",    answer: "Sahara"  },  
  {    question: "What is the distance around a circle called?",    answer: "Circumference"  },  
  {    question: "What is the smallest country in the world?",    answer: "Vatican City"  }]

const AdminFAQ = () => {

  const [questions, setQuestions] = useState([])
  const [editQuestion, setEditQuestion] = useState(null)

    const getQuestions = () => {
        setQuestions(sampleQuestions)
    }

    const updateQuestion = () => {

    }

    const deleteQuestion = () => {

    }
    
    useEffect(() => {
      getQuestions()
    }, [])

    useEffect(() => {
      console.log(editQuestion)
    }, [editQuestion])

  return (
    <div>
      <Container>
        <h3>Manage Frequently Asked Questions</h3>

        <CreateFAQ />

        {/* {editQuestion && <EditFAQ id={editQuestion?.id} question={editQuestion?.question} answer={editQuestion?.answer}/> } */}
        {editQuestion && <EditFAQ question={editQuestion} setQuestion={setEditQuestion}/> }

        <Accordion>
            {
                questions.map((q, i) => {
                    return (
                      <div>
                      <div className='d-flex flex-row justify-content-start align-items-center'>
                      <ViewFAQ question={q.question} answer={q.answer} eventKey={i}/>
                      <Button variant="secondary" className='ms-3' onClick={() => setEditQuestion(q)}>Edit</Button>
                      <Button variant="danger" className='ms-3' onClick={() => deleteQuestion()}>Delete</Button>
                    </div>

                    </div>
                  )
                })
            }

        </Accordion>
    </Container>
        
    </div>
  )
}

export default AdminFAQ