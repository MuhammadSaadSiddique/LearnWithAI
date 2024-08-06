import './Home.css';
import {Link} from 'react-router-dom';


function Home(){
    return(
        <div className='home-page'>
            <header className='h-100 min-vh-100 d-flex align-items-center text-light'>
                <div className='container d-flex flex-column align-items-center'>                    
                    <h1 className='text-center fw-semibold'>Learn With AI</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odit, id quidem eaque nam quibusdam praesentium expedita numquam consectetur nobis, ex voluptatum quasi animi dignissimos impedit iste aliquid, eveniet sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem nisi nesciunt maxime voluptate quidem officiis veniam amet, error quasi nostrum ab, modi consequuntur aperiam mollitia. Eligendi iure laborum optio tempora!
                    </p>                
                    <div className='d-flex flex-column flex-sm-row align-items-center hero-header-buttons-container my-4 '>
                        {/* <Link to="/sign_up">
                        <button type='button' className="btn btn-outline-light btn-sm mx-0 mx-sm-2 my-2 my-sm-0 text-light hero-header-buttons"> Sign up </button>
                        </Link>
                        <Link to="/login">
                        <button type='button' className='btn btn-outline-light btn-sm mx-0 mx-sm-2 my-2 my-sm-0 text-light hero-header-buttons'> Log in </button>
                        </Link> */}
                         <div><Link to="/userInfo">
                        <button type='button' className='btn btn-outline-light btn-lg mx-0 mx-sm-2 my-2 my-sm-0 text-light hero-header-buttons'> Get Started </button>
                        </Link></div>
                    </div>
                </div>
            </header>

        </div>
    )

}
export default Home;