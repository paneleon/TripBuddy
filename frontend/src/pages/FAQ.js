import React, {useEffect, useState} from 'react'
import { Container, Accordion, Button } from 'react-bootstrap'
import ViewFAQ from '../components/ViewFAQ'


const sampleQuestions = [  {    question: "What is the capital of France?",    answer: "Paris"  },  {    question: "What is the largest mammal on Earth?",    answer: "Blue Whale"  },  {    question: "What is the boiling point of water?",    answer: "100 degrees Celsius"  },  {    question: "What is the chemical symbol for gold?",    answer: "Au"  },  {    question: "What is the tallest mountain in the world?",    answer: "Mount Everest"  },  {    question: "What is the largest organ in the human body?",    answer: "Skin"  },  {    question: "What is the currency of Japan?",    answer: "Yen"  },  {    question: "What is the largest desert in the world?",    answer: "Sahara"  },  {    question: "What is the distance around a circle called?",    answer: "Circumference"  },  {    question: "What is the smallest country in the world?",    answer: "Vatican City"  }]

const FAQ = () => {

    const [questions, setQuestions] = useState([])

    const getQuestions = () => {
        setQuestions(sampleQuestions)
    }

    useEffect(() => {
        getQuestions()
    }, [])

  return (
    <div>
    <Container>
        <h3>Frequently Asked Questions</h3>


        <Accordion>
            {
                questions.map((q, i) => {
                    return <ViewFAQ question={q.question} answer={q.answer} eventKey={i} />
                    
                })
            }

        </Accordion>
    </Container>

    </div>
  )
}

export default FAQ