import React, { useState, useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Pre_Assess_Quiz =
    //  {
    //     "questions": 
    [
        {
            "question": "What is the force that attracts two objects towards each other called?",
            "options": ["Gravity", "Magnetism", "Friction", "Static Electricity"],
            "answer": "Gravity"
        },
        {
            "question": "What is the formula for calculating gravitational force?",
            "options": ["F = m * a", "F = m * g", "F = a * m", "F = g * m"],
            "answer": "F = m * g"
        },
        {
            "question": "What is the value of the gravitational constant (G) in SI units?",
            "options": ["6.674 × 10^-11 N(m/kg)^2", "9.81 m/s^2", "1.62 × 10^-19 C", "3.00 × 10^8 m/s"],
            "answer": "6.674 × 10^-11 N(m/kg)^2"
        },
        {
            "question": "What is the relationship between mass and gravity?",
            "options": ["As mass increases, gravity decreases", "As mass increases, gravity increases", "There is no relationship between mass and gravity", "As mass decreases, gravity increases"],
            "answer": "As mass increases, gravity increases"
        },
        {
            "question": "What is the force of gravity between two objects with masses of 10 kg and 20 kg separated by a distance of 1 meter?",
            "options": ["0.49 N", "1.96 N", "9.81 N", "196 N"],
            "answer": "1.96 N"
        },
        {
            "question": "What is the acceleration due to gravity on the surface of the Earth?",
            "options": ["9.81 m/s^2", "1.62 m/s^2", "3.00 m/s^2", "6.674 m/s^2"],
            "answer": "9.81 m/s^2"
        },
        {
            "question": "What is the gravitational force between the Earth and the Moon?",
            "options": ["6.674 × 10^-11 N", "9.81 N", "1.98 × 10^20 N", "6.674 × 10^20 N"],
            "answer": "6.674 × 10^20 N"
        },
        {
            "question": "What is the gravitational force between two objects with masses of 1 kg and 2 kg separated by a distance of 0.5 meters?",
            "options": ["0.49 N", "1.96 N", "9.81 N", "196 N"],
            "answer": "0.49 N"
        },
        {
            "question": "What is the gravitational force between two objects with masses of 5 kg and 10 kg separated by a distance of 2 meters?",
            "options": ["0.98 N", "1.96 N", "9.81 N", "49 N"],
            "answer": "0.98 N"
        },
        {
            "question": "What is the gravitational force between two objects with masses of 100 kg and 200 kg separated by a distance of 5 meters?",
            "options": ["0.98 N", "1.96 N", "9.81 N", "196 N"],
            "answer": "1.96 N"
        }
    ]
//   }

const PreAssessQuiz = () => {
    const [Question, setQuestion] = useState(Pre_Assess_Quiz[0]);
    const index = useRef(0);
    const [ShowAns, setShowAns] = useState(false);
    const [SelectedAnswer, setSelectedAnswer] = useState("");
    const [DisableRadio, setDisableRadio] = useState(false);
    const MarkGrade=useRef(0);
    const navigate = useNavigate();

    const handleQuizQuestion = (answer) => {
        index.current += 1;
        setShowAns(false);
        setDisableRadio(false);
        if (index.current < Pre_Assess_Quiz.length) {
            setQuestion(Pre_Assess_Quiz[index.current]);
            if (SelectedAnswer == answer) {
                MarkGrade.current+=1;
                Pre_Assess_Quiz[index.current].result=true
            }else{
                Pre_Assess_Quiz[index.current].result = false
            }
        } else {
            alert(MarkGrade.current);
            navigate("/generateQuiz")
        }

    }

    return (
        <>
            <h1 className=' text-center text-[#C2185B]'>Test Your Knowledge Level?</h1>
            <p className=' text-center'>Take this quiz to measure how well you know [Topic], and we’ll tailor the questions to match your expertise!</p>
            <Form className=' p-12 border border-spacing-2 rounded-xl shadow-md' >
                {
                    Question && <>
                        <Form.Label className=' font-semibold mb-3 text-xl text-[#D81B60]'>{index.current+1}. {Question.question}</Form.Label>
                        {
                            ['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3 flex flex-col">
                                    <Form.Check
                                        inline
                                        label={Question.options[0]}
                                        value={Question.options[0]}
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        onChange={(event) => setSelectedAnswer(event.target.value)}
                                        checked={SelectedAnswer === Question.options[0]}
                                        disabled={DisableRadio}
                                    />
                                    <Form.Check
                                        inline
                                        label={Question.options[1]}
                                        value={Question.options[1]}
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        onChange={(event) => setSelectedAnswer(event.target.value)}
                                        checked={SelectedAnswer === Question.options[1]}
                                        disabled={DisableRadio}
                                    />
                                    <Form.Check
                                        inline
                                        label={Question.options[2]}
                                        value={Question.options[2]}
                                        type={type}
                                        id={`inline-${type}-3`}
                                        onChange={(event) => setSelectedAnswer(event.target.value)}
                                        checked={SelectedAnswer === Question.options[2]}
                                        disabled={DisableRadio}
                                    />
                                    <Form.Check
                                        inline
                                        label={Question.options[3]}
                                        value={Question.options[3]}
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        onChange={(event) => setSelectedAnswer(event.target.value)}
                                        checked={SelectedAnswer === Question.options[3]}
                                        disabled={DisableRadio}
                                    />
                                </div>
                            ))
                        }
                        <div className=' flex flex-row my-4 items-baseline'>
                            < button type='button' onClick={() => { setShowAns(!ShowAns); setDisableRadio(true) }} className='  btn btn-danger px-4 btn-md mx-0 mx-sm-2 my-2 my-sm-0 text-light '> Submit Answer </button>
                            <p className={`${ShowAns ? "block" : "hidden"} font-semibold`}>{Question.answer}</p>
                        </div>
                        < button type='button' onClick={()=>handleQuizQuestion(Question.answer)} className=' float-end btn btn-primary btn-md px-4 mx-0 mx-sm-2 my-2 my-sm-0 text-light '> Next </button>
                    </>

                }

            </Form>
        </>
    )
}

export default PreAssessQuiz

