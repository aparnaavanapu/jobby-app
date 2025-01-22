import Navbar from '../Navbar'
import './index.css'
import {useNavigate} from 'react-router-dom'

const Home=()=>{
    const navigate=useNavigate()

    const searchJobs=()=>{
        navigate('/jobs')

    }

   return(
    <div className="home-container">
        <Navbar/>
        <div className="home-bottom-section">
            <div className="bottom-container">
            <h1 className="home-heading">Find The Jobs That Fits Your Life</h1>
            <p  className="home-description">Millions of people are searching for jobs,salary information,company reviews.Find the job that fits your abilities and potential.</p>
            <button className="find-jobs-btn" onClick={searchJobs}>Find Jobs</button>
            </div>
        </div>
    </div>
   )
    
   

}
export default Home