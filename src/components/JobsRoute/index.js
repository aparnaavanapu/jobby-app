import Navbar from '../Navbar';
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Profile from '../Profile';
import EmploymentItem from '../EmploymentItem';
import SalaryItem from '../SalaryItem';
import JobItem from '../JobItem';
import { IoIosSearch } from 'react-icons/io';

const status_names = {
    loading : 'loading',
    active : 'success',
    failure : 'failure'
}

const JobsRoute = (props) => {
  const { employmentTypesList, salaryRangesList } = props;

  const [status, setStatus] = useState(status_names.loading);
  const [isLoadingProfile,setIsLoadingProfile]=useState(false)
  const [profileError, setProfileError] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('');

  useEffect(() => {
    getProfile();
}, []);
  
  useEffect(() => {
    
    getJobs();
  }, [selectedEmploymentTypes, selectedSalaryRange,searchInput]);

  useEffect(() => {
    if (searchInput) {
        const filteredResults = jobsData.filter((job) =>
            job.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredJobs(filteredResults);
    } else {
        setFilteredJobs(jobsData);
    }
}, [searchInput, jobsData]);



  // Get profile API
  const getProfile = async () => {
    setIsLoadingProfile(true);
    const jwtToken = Cookies.get('jwt_token');
    const url = 'https://apis.ccbp.in/profile';
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
  
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const fetchedProfile = await response.json();
        const formattedProfileData = {
          name: fetchedProfile.profile_details.name,
          profileImgUrl: fetchedProfile.profile_details.profile_image_url,
          shortBio: fetchedProfile.profile_details.short_bio,
        };
        setProfileData(formattedProfileData);
      } else {
        console.error('Failed to fetch profile:', response.status, response.statusText);
        setProfileError(true);
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      setProfileError(true);
    } finally {
      setIsLoadingProfile(false);
    }
  };
  

  // Get jobs API
  const getJobs = async () => {
    console.log('Setting status to loading...');
    setStatus(status_names.loading); // Ensure this is called before the API fetch
    console.log('Status set to loading');
  
    const jwtToken = Cookies.get('jwt_token');
    const queryParams = [];
  
    if (searchInput) queryParams.push(`search=${searchInput}`);
    if (selectedEmploymentTypes.length)
      queryParams.push(`employment_type=${selectedEmploymentTypes.join(',')}`);
    if (selectedSalaryRange)
      queryParams.push(`minimum_package=${selectedSalaryRange}`);
  
    const url = `https://apis.ccbp.in/jobs${queryParams.length ? `?${queryParams.join('&')}` : ''}`;
  
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
  
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const fetchedJobs = await response.json();
        const formattedJobsData = fetchedJobs.jobs.map((job) => ({
          id: job.id,
          title: job.title,
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
        }));
        setJobsData(formattedJobsData);
        setStatus(status_names.success);
      } else {
        setStatus(status_names.failure);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
      setStatus(status_names.failure);
    }
  };
  
  


  const onSearch = () => {
    getJobs();
    
  };

  const handleOnChangeSalary = (id) => {
    setSelectedSalaryRange(id);
  };

  const handleOnChangeEmployment = (id) => {
    const updatedTypes = selectedEmploymentTypes.includes(id)
      ? selectedEmploymentTypes.filter((typeId) => typeId !== id)
      : [...selectedEmploymentTypes, id];
    setSelectedEmploymentTypes(updatedTypes);
  };


  const handleRetry = () => {
    getProfile()
}

  const failureView=()=>{
    return(
            <div className="flex flex-col items-center justify-center text-center text-white bg-neutral-950 flex-grow">
                <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png' alt='failure-img' className="m-6"/>
                <h1 className='text-3xl font-bold mb-4'>Oops! Something Went Wrong</h1>
                <p className='text-lg mb-4 px-4 max-w-md'>We cannot seem to the page you are looking for.</p> 
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none" onClick = {getJobs}>Retry</button>
            </div>
    )
  }
 const noJobsFound=()=>{
    return(
        <div className="flex flex-col items-center justify-center text-center text-white bg-neutral-950 flex-grow">
                <img src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png ' alt='failure-img' className='failure-img'/>
                <h1  className="text-3xl font-bold mb-4">No jobs found</h1>
                <p className="text-lg mb-4 px-4 max-w-md">We could not find any jobs.Try other filters.</p> 
        </div>
    )

 }
  
  // Render Jobs Section using switch-case
  const renderJobs = () => {
    switch (status) {
      case status_names.loading:
        return (<div className="flex justify-center items-center min-h-[70vh]">
            <ThreeDots color="#4f46e5" height={50} width={50} />
          </div>
        )
      case status_names.failure:
        return failureView();
        case status_names.success:
            return filteredJobs.length === 0 ? noJobsFound() : (
              <ul>
                {filteredJobs.map((job) => (
                  <JobItem jobDetails={job} key={job.id} />
                ))}
              </ul>
            );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />

    <div className="bg-neutral-950 min-h-[90vh] flex flex-col lg:flex-row">
        {/* Profile Section */}
    <div className="p-10 text-white w-full lg:w-1/4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-neutral-950" style={{ position: "sticky" }}>
        <div className="mb-6">
          {isLoadingProfile? (
            <div className="flex justify-center items-center">
                <ThreeDots color="#4f46e5" height={50} width={50} />
            </div>
          )  : profileError ? (<div className="flex justify-center items-center"><button onClick={handleRetry} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none">Retry</button></div>):(
            <Profile profileData={profileData} getProfile={getProfile} />
          )}
        </div>

        {/* Filters */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Employment Types</h4>
          <ul className="space-y-2">
            {employmentTypesList.map((item) => (
              <EmploymentItem key={item.employmentTypeId} details={item} handleOnChangeEmployment={handleOnChangeEmployment}/>
            ))}
          </ul>
          <h4 className="text-lg font-semibold mt-6 mb-4">Salary Range</h4>
          <ul className="space-y-2">
            {salaryRangesList.map((item) => (
              <SalaryItem key={item.salaryRangeId} details={item} handleOnChangeSalary={handleOnChangeSalary}/>
            ))}
          </ul>
        </div>
    </div>
    {/* Main Content Section */}
    <div className="p-6 mt-5 flex-1 text-white justif-start">
        {/* Search Bar */}
        <div className="flex items-center bg-transparent rounded-md border border-[#cbd5e1] p-1.5 mb-6 max-w-md">
          <input type="search" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="bg-transparent flex-grow text-white placeholder-gray-400 outline-none px-2 h-8"/>
          <button className="ml-2 bg-[#272727] p-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 h-8 w-8 flex items-center justify-center" onClick={onSearch}>
            <IoIosSearch className="text-white w-5 h-5" />
          </button>
        </div>

        {/* Jobs Section */}
        <div>{renderJobs()}</div>
    </div>
    </div>
    </div>
  );
};

export default JobsRoute;