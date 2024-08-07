import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PreAssessQuiz from '../../components/PreAssessQuiz/PreAssessQuiz';
import Alert from 'react-bootstrap/Alert';

// /Soft Blush Pink: #FBE9E7
// Delicate Rose Pink: #F8BBD0
// Elegant Peony Pink: #F48FB1
// Deep Rosewood Pink: #C2185B.
// Rich Rose Pink: #D81B60

// #5F6F65

const UserInfo = () => {
    const [QuestionsDiv, setQuestionsDiv] = useState(false);
    const [CheckInput, setCheckInput] = useState("");
    const [formData, setFormData] = useState({
        educationLevel: '',
        topic: '',
        grade: '',
        country: 'Pakistan'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const inputRestriction = () => {
        if (formData.country === "" || formData.topic === "" || formData.grade === "") {
            setCheckInput("All fields are required");
            return false
        }
        else {
            setCheckInput("");
            return true
        }

    }
    const handleSubmit = async () => {
        try {
            if (inputRestriction()) {
                // const response = await axios.post('http://localhost:8000/generate_quiz', formData);
                // console.log(response.data);
                setQuestionsDiv(true);
                
            }
            

        } catch (error) {
            console.error("Error generating quiz:", error);
        }
    };
    return (
        <div className='full-screen d-flex flex-col align-items-center justify-content-center text-dark '>
            {CheckInput != "" && <div className='alert alert-danger'>{CheckInput}</div>}
            <section className={`${QuestionsDiv ? " hidden" : " block "} w-[55%]  `}>
                <h2 className='text-center text-[#C2185B]   '>Quiz Builder</h2>
                <p className='text-center '>Tailor Quizzes by Topic and Class</p>
                <Form className=' p-12 border border-spacing-2 rounded-xl   shadow-md  bg-white'>
                    <Form.Label htmlFor="class" className=' font-semibold text-lg text-[#D81B60]'>Your Education Level</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                    >
                        <option value=''>Select Level</option>
                        <option value='Primary'>Primary</option>
                        <option value='Secondary'>Secondary</option>
                        <option value='Metric'>Metric</option>
                        <option value='Intermediate'>Intermediate</option>
                        <option value='Graduate'>Graduate</option>
                        <option value='Post-Graduate'>Post-Graduate</option>
                    </Form.Select>

                    <Form.Label htmlFor="topic" className=' mt-6 font-semibold text-lg text-[#D81B60]'>Topic</Form.Label>
                    <InputGroup className="my-0">
                        <Form.Control
                            placeholder="Topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            aria-label="Topic"
                            aria-describedby="topic"
                        />
                    </InputGroup>
                    <Form.Label htmlFor="grade" className=' mt-6 font-semibold text-lg text-[#D81B60]'>Grade</Form.Label>
                    <InputGroup className="my-0">
                        <Form.Control
                            placeholder="Grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            aria-label="Grade"
                            aria-describedby="grade"
                        />
                    </InputGroup>
                    {/* <Form.Label htmlFor="country" className=' mt-6 font-semibold text-lg text-[#D81B60]'>Country</Form.Label>
                    <Form.Control
                            placeholder="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            aria-label="Country"
                            aria-describedby="country"
                        /> */}
                    <div className='mt-3'>
                        <button type='button' onClick={() => handleSubmit()} className=' float-end btn btn-primary px-4  btn-md mx-0 mx-sm-2 my-2 my-sm-0 text-light '> Next </button>
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