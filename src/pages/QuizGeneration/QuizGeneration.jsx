import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import MarkQuizAnswer from '../../components/MarkQuizAnswer/MarkQuizAnswer'

const Generated_Quiz =
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

const QuizGeneration = () => {

  const [SelectedAnswer, setSelectedAnswer] = useState({})
  const [Submit, setSubmit] = useState(false);
  // const SelectedAnswer=useRef({});

  const handleChange = (index, value) => {
    SelectedAnswer.current = { ...SelectedAnswer.current, [index]: value };

    setSelectedAnswer((prev) => ({ ...prev, [index]: value }));
  }

  return (
    <div className='w-[100%] '>
     { !Submit && <div className={` w-[100%]  d-flex flex-col align-items-center justify-content-center`} >
        <div className=' p-2 m-12  w-[60%]' >
          <h2 className='text-[#C2185B] font-semibold m-6 '>Quiz Generated On Given Topic</h2>
          {
            Generated_Quiz.map((Question, index) => (
              <div key={index} className=' m-8'>

                <Form.Label className=' font-semibold my-2 text-lg '>{index + 1}.   {Question.question}</Form.Label>
                {
                  ['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3 flex flex-col ">
                      <Form.Check
                        inline
                        label={Question.options[0]}
                        value={Question.options[0]}
                        name={`group-${index}-1`}
                        type={type}
                        id={`inline-${index}-1`}
                        className='my-3'
                        onChange={(event) => handleChange(index, event.target.value)}
                        checked={SelectedAnswer[index] === Question.options[0]}
                      />
                      <Form.Check
                        inline
                        label={Question.options[1]}
                        value={Question.options[1]}
                        name={`group-${index}-2`}
                        type={type}
                        id={`inline-${index}-2`}
                        className='my-3'
                        onChange={(event) => handleChange(index, event.target.value)}
                        checked={SelectedAnswer[index] === Question.options[1]}
                      />
                      <Form.Check
                        inline
                        label={Question.options[2]}
                        value={Question.options[2]}
                        type={type}
                        name={`group-${index}-3`}
                        id={`inline-${index}-3`}
                        className='my-3'
                        onChange={(event) => handleChange(index, event.target.value)}
                        checked={SelectedAnswer[index] === Question.options[2]}
                      />
                      <Form.Check
                        inline
                        label={Question.options[3]}
                        value={Question.options[3]}
                        name={`group-${index}-4`}
                        type={type}
                        id={`inline-${index}-4`}
                        className='my-3'
                        onChange={(event) => handleChange(index, event.target.value)}
                        checked={SelectedAnswer[index] === Question.options[3]}
                      />
                    </div>
                  ))
                }
              </div>
            ))
          }

        </div>

        <div className={`  bg-gray-200  w-[100%] fixed  bottom-0 z-10 text-center mt-10`}>
          <button className=' btn btn-success my-2 shadow-md btn-md' onClick={() => setSubmit(true)}>Submit</button>
        </div>
      </div>
}
     {Submit && <div className=' w-[100%]  d-flex flex-col align-items-center justify-content-center' >
        <MarkQuizAnswer SelectedAnswer={SelectedAnswer} Generated_Quiz={Generated_Quiz} />
      </div>}



    </div>
  )
}

export default QuizGeneration


