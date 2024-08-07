import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Learning_Plan = { 'learningPlan': [{ 'topic': 'Gravitational Constant', 'description': 'Learn about the gravitational constant (G) and its value in SI units.' }, { 'topic': 'Relationship between Mass and Gravity', 'description': 'Understand the relationship between mass and gravity, specifically how an increase in mass leads to an increase in gravitational force.' }, { 'topic': 'Gravitational Force Calculation', 'description': 'Practice calculating the gravitational force between two objects using the formula F = G * (m1 * m2) / r^2.' }] }

const GetLessonPlan = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/userInfo')

    }
    return (
        <>
            <div className=' m-8 w-[60%] '>
                <h2 className='text-[#C2185B] font-semibold m-2 '>Lesson Plan</h2>
                <div className=' m-8'>
                    {
                        Learning_Plan['learningPlan'].map((value, index) =>

                        (<div key={index} className=' my-8'>

                            <h5 className=' font-semibold my-6 text-xl text-gray-700 '>{index + 1}. {value.topic}</h5>
                            <p className=' m-4 text-[#5F6F65]'>{value.description}</p>
                        </div>)
                        )
                    }
                </div>
            </div>
            <div className={`  bg-gray-200  w-[100%] fixed  bottom-0 z-10 text-center mt-10`}>
                <button className=' btn btn-primary my-2 shadow-md btn-md' onClick={() => handleClick()}>Want to generate another Quiz</button>
            </div>
        </>
    )
}

export default GetLessonPlan