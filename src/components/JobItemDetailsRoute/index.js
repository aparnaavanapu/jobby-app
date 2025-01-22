import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { FaStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";
import Navbar from '../Navbar'


const JobItemDetailsRoute = () => {
    const { id } = useParams()
    const [jobItemDetails, setJobItemDetails] = useState(null)
    const [isLoadingJobItem, setIsLoadingJobItem] = useState(true)
    const [isError, setIsError] = useState(false)
    
    const fetchJobItemData = async () => {
        setIsLoadingJobItem(true)
        setIsError(false)

        const jwtToken = Cookies.get('jwt_token')
        const url = `https://apis.ccbp.in/jobs/${id}`
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                setJobItemDetails(data) // Set the full response data (job details + similar jobs)
                setIsLoadingJobItem(false) // Stop loading when data is fetched
            } else {
                setIsError(true)
                setIsLoadingJobItem(false) // Stop loading in case of an error
            }
        } catch (error) {
            setIsError(true)
            setIsLoadingJobItem(false) // Stop loading in case of an error
        }
    }

    useEffect(() => {
        fetchJobItemData()
    }, [id])

    const handleRetry = () => {
        fetchJobItemData()
    }

    const handleVisitCompanyWebsite = (url) => {
        window.open(url, '_blank')
    }

    return (
        <div>
            {isLoadingJobItem ? (
                <div className="flex flex-col bg-[#000000] min-h-screen">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                  <ThreeDots color="#4f46e5" height={50} width={50} />
                </div>
              </div>
            ) : isError ? (
                <div className="min-h-screen bg-neutral-950 flex flex-col">
                     <Navbar />
                     <div className="flex flex-col items-center justify-center text-center text-white bg-neutral-950 flex-grow">
                            <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failed" className="w-1/2 max-w-xs md:max-w-md mb-6"/>
                            <h1 className="text-3xl font-bold mb-4">Oops! Something Went Wrong</h1>
                            <p className="text-lg mb-4 px-4 max-w-md">We cannot seem to find the page you are looking for.</p>
                            <button onClick={handleRetry} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 focus:outline-none">Retry</button>
                    </div>
                </div>

            ) : (
                <div className="bg-[#000000] p-6 rounded-md shadow-md">
                    {jobItemDetails ? (
                        <div>
                            <div className="bg-[#272727] p-6 rounded-md shadow-md">
                            <div className="flex items-center mb-6">
                                <img src={jobItemDetails.job_details.company_logo_url} alt={jobItemDetails.job_details.title} className="w-12 h-12 mr-4" />
                                <div>
                                   <h1 className="text-2xl font-semibold text-white">{jobItemDetails.job_details.title}</h1>
                                   <div className="flex items-center text-sm mt-2">
                                      <FaStar style={{color : '#fbbf24'}} className="mr-1"/>
                                      <p className="text-[#f1f5f9]"> {jobItemDetails.job_details.rating}</p>
                                   </div>
                                </div> 
                            </div>


                            

                            {/* Location, Employment Type, and Package Section */}

                            <div className="flex items-center text-gray-400  mb-6">
                                <div className="flex items-center mr-6">
                                    <FaLocationDot className="mr-1 text-[#f1f5f9] text-lg"/>
                                    <p className="text-lg text-[#f1f5f9]">{jobItemDetails.job_details.location}</p>
                                </div>
                                <div className="flex items-center mr-6">
                                    <MdWork className="mr-1 text-[#f1f5f9] text-lg" />
                                    <p className="text-lg text-[#f1f5f9]">{jobItemDetails.job_details.employment_type}</p>
                                </div> 
                                <p className="ml-auto font-medium text-white text-xl">{jobItemDetails.job_details.package_per_annum}</p>
                            </div>
                            <hr className="border-gray-600 mb-6" />
                            <div className="flex items-center">
                                
                                <h1 className="text-[#ffffff] font-semibold text-xl mb-4">Description</h1>
                                <button onClick={() => handleVisitCompanyWebsite(jobItemDetails.job_details.company_website_url)} className="flex text-lg items-center text-blue-500 hover:underline mb-6 ml-auto">Visit <IoOpenOutline className="ml-1" /></button>
                            </div>
                            <p className="text-[#f1f5f9] leading-relaxed mb-6 text-lg">{jobItemDetails.job_details.job_description}</p>


                            <h2 className="text-xl text-white font-semibold mb-4">Skills</h2>
                            <ul className="flex flex-wrap gap-4 mb-6 grid grid-cols-3">
                                {jobItemDetails.job_details.skills && jobItemDetails.job_details.skills.map((skill, index) => (
                                    <li key={index} className="flex items-center gap-2 p-2 rounded">
                                        <img src={skill.image_url} alt={skill.name} className="w-14 h-14" />
                                        <span className="text-white ml-1 text-lg">{skill.name}</span>
                                    </li>
                                ))}
                            </ul>

                            <h2 className="text-xl text-white font-semibold mb-4">Life at Company:</h2>
                            <div className="flex gap-6 mb-6">
                                <p className="text-[#f1f5f9] flex-grow text-lg">{jobItemDetails.job_details.life_at_company?.description}</p>
                                <img
                                    src={jobItemDetails.job_details.life_at_company?.image_url}
                                    alt="Life at Company"
                                   className="w-1/2 rounded ml-2"
                                />
                            </div>
                         </div>

                        <div>

                            <h2 className="text-[#ffffff] text-2xl font-bold mb-4 mt-4">Similar Jobs:</h2>
                            <div className="p-2 rounded-md grid grid-cols-1 md:grid-cols-3 gap-10 m-3">
                                {jobItemDetails.similar_jobs && jobItemDetails.similar_jobs.length > 0 && (
                                    jobItemDetails.similar_jobs.map((similarJob, index) => (
                                        <div key={index} className="p-4 rounded shadow-md bg-[#272727]">
                                            
                                            <div className="flex items-center mb-4">
                                                <img src={similarJob.company_logo_url} alt={similarJob.title} className="w-12 h-12 mr-4"/>
                                                <div>
                                                    <h3 className="text-white font-medium text-xl">{similarJob.title}</h3>
                                                    <div className="flex  items-center text-sm mt-1">
                                                        <FaStar style={{color : '#fbbf24'}} className="mr-1"/>
                                                        <p className="text-[#f1f5f9] text-md">{similarJob.rating}</p>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                            <p className="text-[#ffffff] text-lg">{similarJob.job_description}</p>
                                            <div className="flex mt-6 mb-6 items-center">
                                                <div className="flex items-center mr-6">
                                                     <FaLocationDot className="mr-1 text-[#f1f5f9] font-lg"/>
                                                     <p className="text-lg text-[#f1f5f9]">{similarJob.location}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <MdWork className="mr-1 text-[#f1f5f9]" />
                                                    <p className="text-lg text-[#f1f5f9]">{similarJob.employment_type}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">Job details not available.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default JobItemDetailsRoute
