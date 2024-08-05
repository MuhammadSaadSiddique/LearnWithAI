import React, { useState, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Pre_Assess_Quiz = [
    {
        question: "q1",
        options: [
            "option1",
            "option2",
            "option3",
            "option4"
        ]
    }, {
        question: "q3",
        options: [
            "option1",
            "option2",
            "option3",
            "option4"
        ]
    },
    {
        question: "q2",
        options: [
            "option1",
            "option2",
            "option3",
            "option4"
        ]
    }, {
        question: "q7",
        options: [
            "option1",
            "option2",
            "option3",
            "option4"
        ]
    }
]

const PreAssessQuiz = () => {
    const [Question, setQuestion] = useState(Pre_Assess_Quiz[0]);
    const index = useRef(0);
    const navigate = useNavigate();

    const handleQuizQuestion = () => {
        index.current += 1;
        if (index.current < Pre_Assess_Quiz.length) {
            setQuestion(Pre_Assess_Quiz[index.current]);
        } else {
          navigate("/generateQuiz")
        }

    }
    return (
        <>
            <h1 className=' text-center'>Test Your Knowledge Level?</h1>
            <p className=' text-center'>Take this quiz to measure how well you know [Topic], and we’ll tailor the questions to match your expertise!</p>
            <Form className=' p-12 border border-spacing-2 rounded-xl' >
                {

                    Question && <>
                        <Form.Label className=' font-semibold'>{Question.question}</Form.Label>

                        {
                            ['radio'].map((type) => (
                                <div key={`reverse-${type}`} className="mb-3 flex flex-col">
                                    <Form.Check
                                        inline
                                        label={Question.options[0]}
                                        name="group1"
                                        type={type}
                                        id={`reverse-${type}-1`}
                                    />
                                    <Form.Check
                                        inline
                                        label={Question.options[1]}
                                        name="group1"
                                        type={type}
                                        id={`reverse-${type}-2`}
                                    />
                                    <Form.Check
                                        inline
                                        label={Question.options[2]}
                                        type={type}
                                        id={`reverse-${type}-3`}
                                    />
                                    <Form.Check
                                        inline
                                        label={Question.options[3]}
                                        name="group1"
                                        type={type}
                                        id={`reverse-${type}-2`}
                                    />
                                </div>
                            ))
                        }
                        < button type='button' onClick={handleQuizQuestion} className=' float-end btn btn-outline-light btn-md mx-0 mx-sm-2 my-2 my-sm-0 text-light hero-header-buttons'> Next </button>
                    </>

                }

            </Form>
        </>
    )
}

export default PreAssessQuiz

