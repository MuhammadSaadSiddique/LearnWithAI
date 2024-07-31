import React from 'react'

const PromptQuiz = () => {
  return (
    <section className=' my-5 border border-gray-300 rounded-lg h-96 shadow-xl'>
      <div className=' w-[70%] m-auto  p-14'>
        <input type='text' className='  bg-inherit p-3 rounded-lg w-[90%] border-2 border-secondary ' placeholder='Write a topic or detail desciption... ' />
      </div>
    </section>
  )
}

export default PromptQuiz