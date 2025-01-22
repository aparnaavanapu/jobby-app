const Profile = (props) => {
    const { profileData, getProfile } = props; 
  
    if (!profileData) {
      return <button onClick={getProfile} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Retry</button>;
    }
  
    const { name, profileImgUrl, shortBio } = profileData;
  
    return (
      <div className="bg-[url(https://assets.ccbp.in/frontend/react-js/profile-bg.png)] bg-no-repeat bg-cover flex-column align-items:center p-6 rounded-t-md rounded-b-xl">
          <img src={profileImgUrl} alt={name}  className="w-14 h-14  mb-4"/>
          <p className="text-indigo-500 text-lg font-medium">{name}</p>
          <p className="text-gray-600 text-sm  mt-2 font-medium">{shortBio}</p>
      </div>
    );
  };
  
  export default Profile;
  