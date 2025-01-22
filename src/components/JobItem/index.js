import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";

const JobItem = (props) => {
    const { jobDetails } = props;
    const { id, title, companyLogoUrl, employmentType, jobDescription, location, packagePerAnnum, rating } = jobDetails;

    const navigate = useNavigate();

    const handleJobClick = () => {
        // Navigate to the job details page
        navigate(`/jobs/${id}`);
    };

    return (
        <div
            className="bg-[#202020] p-6 rounded-lg mb-5 hover:shadow-lg hover:bg-[#262626] min-h-[300px] transition duration-200"
            onClick={handleJobClick}
            role="button"
            tabIndex={0} // Optional for accessibility
        >
            {/* Company Logo and Title Section */}
            <div className="flex items-center mb-4">
                <img
                    src={companyLogoUrl}
                    alt={title}
                    className="w-12 h-12 mr-4"
                    onError={(e) => e.target.src = 'path/to/fallback-image.jpg'}
                />
                <div>
                    <h1 className="text-lg font-semibold text-white">{title}</h1>
                    <div className="flex items-center text-sm text-[#fbbf24]">
                        <FaStar style={{ color: '#fbbf24' }} className="mr-1" />
                        <h2>{rating}</h2>
                    </div>
                </div>
            </div>

            {/* Location, Employment Type, and Package Section */}
            <div className="flex items-center text-gray-400 text-sm mb-4">
                <div className="flex items-center mr-6">
                    <FaLocationDot className="mr-1 text-[#94a3b8] font-lg" />
                    <p>{location}</p>
                </div>
                <div className="flex items-center mr-6">
                    <MdWork className="mr-1 text-[#94a3b8]" />
                    <p>{employmentType}</p>
                </div>
                <p className="ml-auto font-medium text-white">{packagePerAnnum}</p>
            </div>
            <hr className="border-gray-600 mb-4" />
            <h1 className="mb-3 text-lg font-semibold text-[#f1f5f9]">Description</h1>
            <p className="text-gray-300 text-base leading-relaxed">{jobDescription}</p>
        </div>
    );
};

export default JobItem;
