import React from 'react'

const GetStarted = () => {
  return (
    <div className='complete-screen-container'>
        <div>
            <div className='title'></div>
            <div className='form'>
                <form action="" method="post">
                    <div className='form-group'>
                        <label htmlFor="email-address">Email address</label>
                        <input type="email" className='form-control' id='email-address' name='email-address'/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" className='form-control' id='password' name='password'/>
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
            <div className='login'></div>
        </div>
    </div>
  )
}

export default GetStarted