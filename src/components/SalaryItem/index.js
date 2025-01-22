const SalaryItem = (props) => {
    const { details, handleOnChangeSalary } = props;
    const { salaryRangeId, label } = details;
  
    const selectSalaryRange = (event) => {
      handleOnChangeSalary(salaryRangeId); // Pass the selected salary range ID to the parent handler
    };
  
    return (
      <li className="flex items-center p-2 space-x-2">
        <input type="radio" id={`salary-${salaryRangeId}`} name="salary-range" onChange={selectSalaryRange} className="h-4 w-4"/>
        <label htmlFor={`salary-${salaryRangeId}`} className="text-sm tex-[#f1f5f9] font-medium cursor-pointer">{label}</label>
      </li>
    );
  };
  
  export default SalaryItem;
  