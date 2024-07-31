import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import ChooseSection from '../../components/ChooseSection/ChooseSection';
import StartCoursesImg from '../../utils/images/start-courses-img.jpg';
import FaqAccordition from '../../components/FaqAccordition/FaqAccordition';
// import { Card } from 'react-bootstrap';


function Home(){
    return(
        <div className='home-page'>
            <header className='h-100 min-vh-100 d-flex align-items-center text-light'>
                <div className='container d-flex flex-column align-items-center'>
                    <h2>Welcome To</h2>                    
                    <h1 className='text-center fw-semibold'>Punjab University Students Interaction Portal (PU-SIP)</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odit, id quidem eaque nam quibusdam praesentium expedita numquam consectetur nobis, ex voluptatum quasi animi dignissimos impedit iste aliquid, eveniet sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem nisi nesciunt maxime voluptate quidem officiis veniam amet, error quasi nostrum ab, modi consequuntur aperiam mollitia. Eligendi iure laborum optio tempora!
                    </p>                
                    <div className='d-flex flex-column flex-sm-row align-items-center'>
                        <Link to="/courses">
                        <button type='button' className='btn btn-outline-light btn-lg mx-0 mx-sm-2 my-2 my-sm-0 text-light'> Our Course </button>
                        </Link>
                        <Link to="/contact">
                        <button type='button' className='btn btn-outline-light btn-lg mx-0 mx-sm-2 my-2 my-sm-0'> Contact Us </button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className='py-5'>
                <ChooseSection/>
            </div>
            <div className='py-5 bg-light'>
                <div className="container">
                    <div className='row d-flex align-items-center justify-content-around'>
                        <div className='col-lg-5'>
                            <h2 className="text-capitalize">2024 start courses</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores corrupti consequuntur, aut iusto voluptatem molestiae officia quasi itaque, accusamus soluta harum. Quae magni natus inventore exercitationem possimus officiis autem molestias.</p>
                            <Link to="/courses">
                            <button type='button' className='btn btn-outline-light btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>Learn More
                            </button>
                            </Link>
                        </div>
                        <div className='col-lg-5 mt-5 mt-lg-0'>
                            <img src={StartCoursesImg} className='img=fluit' alt='' />
                        </div>
                    </div>
                </div>

            </div>
            <div className="py-5">
                <FaqAccordition/>
            </div>

        </div>
    )

}
export default Home;