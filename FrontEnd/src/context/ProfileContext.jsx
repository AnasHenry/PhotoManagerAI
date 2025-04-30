import { createContext, useState, useContext } from "react";
const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    profilepic: "", 
    companyname: "",
  });
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
