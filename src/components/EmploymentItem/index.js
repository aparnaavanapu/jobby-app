const EmploymentItem = (props) => {
    const { details, handleOnChangeEmployment } = props; // Add callback prop
    const { label, employmentTypeId } = details;
  
    const onChangeEmploymentType = (event) => {
      handleOnChangeEmployment(employmentTypeId, event.target.checked); // Pass employment type ID and checkbox status
    };
  
    return (
      <li className="flex items-center space-x-2 p-2">
        <input type="checkbox" id={employmentTypeId} value={employmentTypeId} onChange={onChangeEmploymentType} className="h-4 w-4 border-gray-300 rounded focus:ring focus:ring-blue-300"/>
        <label htmlFor={employmentTypeId} className="text-sm text-[#f1f5f9] font-medium cursor-pointer">{label}</label>
      </li>
    );
  };
  
  export default EmploymentItem;
  