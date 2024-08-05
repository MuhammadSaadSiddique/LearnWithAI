import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PreAssessQuiz from '../../components/PreAssessQuiz/PreAssessQuiz';

const UserInfo = () => {
    const [QuestionsDiv, setQuestionsDiv] = useState(false);
    return (
        <div className='full-screen d-flex flex-col align-items-center justify-content-center text-light'>
            <section className={`${QuestionsDiv?" hidden":" block "} w-[40%]  `}>
                <h2 className='text-center'>Quiz Builder</h2>
                <p className='text-center'>Tailor Quizzes by Topic and Class</p>
                <Form className=' p-12 border border-spacing-2 rounded-xl '>
                    <Form.Label htmlFor="class">Your Education Level</Form.Label>
                    <Form.Select aria-label="Default select example" className=''>
                        <option value='0'>Primary</option>
                        <option value="1">Secondary</option>
                        <option value="2">Metric</option>
                        <option value="3">Intermediate</option>
                        <option value="3">Graduate</option>
                        <option value="3">Post-Graduate</option>
                        <Form.Control id="class" aria-describedby="class" />
                    </Form.Select>

                    <Form.Label htmlFor="topic" className=' mt-6'>Topic</Form.Label>
                    <InputGroup className="my-0">
                        <Form.Control
                            placeholder="Topic"
                            aria-label="Topic"
                            aria-describedby="topic"
                        />
                        {/* <Form.Control id="topic" aria-describedby="topic" /> */}
                    </InputGroup>
                    <div className='mt-3'>
                    {/* <Link to="/userInfo"> */}
                    <button type='button' onClick={() => setQuestionsDiv(true)} className=' float-end btn btn-outline-light btn-md mx-0 mx-sm-2 my-2 my-sm-0 text-light hero-header-buttons'> Next </button>
                    {/* </Link> */}
                    </div>
                </Form>
            </section>

            <section className={`${QuestionsDiv ? " block" : " hidden"} w-[40%] `}>
                <PreAssessQuiz />
            </section>

        </div>
    )
}

export default UserInfo