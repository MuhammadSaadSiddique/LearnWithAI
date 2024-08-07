import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import GetLessonPlan from '../GetLessonPlan/GetLessonPlan';

const MarkQuizAnswer = ({ SelectedAnswer, Generated_Quiz }) => {

  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(true);

  const [Result, setResult] = useState(0);
  const [Percentage, setPercentage] = useState(0)

  const [LessonPlan, setLessonPlan] = useState(false);

  useEffect(() => {
    let score = 0;
    Generated_Quiz.forEach((value, index) => {
      if (SelectedAnswer[index] && SelectedAnswer[index] === value.answer) {
        score += 1;
      }
    });
    setResult(score);
    setPercentage((score / Generated_Quiz.length) * 100);

    if (Percentage < 50) {
      setError(true);
      setSuccess(false)

    } else if (Percentage >= 50) {
      setError(false);
      setSuccess(true)
    }
  }, [Error, Success])

  return (
    <>
      {!LessonPlan && <>
        <div className=' m-8 w-[60%] '>
          {Error && <div class={` alert alert-danger mt-8`}>
            <h5 className=' font-semibold'>Result</h5>
            <p className=' text-4xl font-bold'>{Percentage}%</p>
            <p>{Result} out of {Generated_Quiz.length} questions are answered correctly</p>

          </div>}
          {Success && <div class={` alert alert-success mt-8`}>
            <h5 className=' font-semibold'>Result</h5>
            <p className=' text-4xl font-bold'>{Percentage}%</p>
            <p>{Result} out of {Generated_Quiz.length} questions are answered correctly</p>

          </div>}

          <div className=' p-4 m-8  '  >
            {
              Generated_Quiz.map((Question, index) => (
                <div key={index} className=' '>

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
                          className={`my-3 
                          ${Generated_Quiz[index].answer === Question.options[0] || (SelectedAnswer[index] === Generated_Quiz[index].answer && SelectedAnswer[index] === Question.options[0]) ? "bg-green-200 m-2 p-1 rounded-sm" :
                              SelectedAnswer[index] !== Generated_Quiz[index].answer && SelectedAnswer[index] === Question.options[0] ? "bg-red-200 m-2 p-1 rounded-sm" :
                                "none"
                            }  
                          `}
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
                          className={`my-3 ${Generated_Quiz[index].answer === Question.options[1] || (SelectedAnswer[index] === Generated_Quiz[index].answer && SelectedAnswer[index] === Question.options[1]) ? "bg-green-200 m-2 p-1 rounded-sm" :
                            SelectedAnswer[index] !== Generated_Quiz[index].answer && SelectedAnswer[index] === Question.options[1] ? "bg-red-200 m-2 p-1 rounded-sm" :
                              "none"
                            }   `}
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
                          className={`my-3 ${Generated_Quiz[index].answer === Question.options[2] || (SelectedAnswer[index] === Generated_Quiz[index].answer && SelectedAnswer[index] === Question.options[2]) ? "bg-green-200 m-2 p-1 rounded-sm" :
                            SelectedAnswer[index] !== Generated_Quiz[index].answer && SelectedAnswer[index] === Question.options[2] ? "bg-red-200 m-2 p-1 rounded-sm" :
                              "none"
                            }   `}
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
                          className={`my-3 ${Generated_Quiz[index].answer === Question.options[3] || (SelectedAnswer[index] === Generated_Quiz[index].answer && Generated_Quiz[index].answer === Question.options[3]) ? "bg-green-200 m-2 p-1 rounded-sm" :
                            SelectedAnswer[index] !== Generated_Quiz[index].answer && SelectedAnswer[index] === Question.options[3] ? "bg-red-200 m-2 p-1 rounded-sm" :
                              "none"
                            }   `}
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

        </div>
        <div className={`  bg-gray-200  w-[100%] fixed  bottom-0 z-10 text-center mt-10`}>
          <button className=' btn btn-primary my-2 shadow-md btn-md' onClick={() => setLessonPlan(true)}>Get Lesson Plan</button>
        </div>
      </>}

      {LessonPlan && <div className=' w-[100%]  d-flex flex-col align-items-center justify-content-center' >
        <GetLessonPlan />
      </div>}
    </>
  )
}

export default MarkQuizAnswer