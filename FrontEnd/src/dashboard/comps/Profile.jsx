import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import axios from "../../axiosInstance";
import { useProfile } from "../../context/ProfileContext";
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [localprofile, setLocalProfile] = useState({
    fname: "",
    lname: "",
    companyname: "",
    profilepic: "",
    email: "",
    mobile: "",
    billingPlan: "Free",
  });
  const { profile, setProfile } = useProfile();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });
        console.log(response.data);
        const data = response.data;

        setLocalProfile({
          fname: data.fname || "",
          lname: data.lname || "",
          email: data.email || "",
          mobile: data.mobile || "",
          billingPlan: "Free",
          companyname: data.companyname || "",
          profilepic: data.profilepic
            ? "http://localhost:5000" + data.profilepic
            : "/defaultProfile.jpg",
        });
      } catch (err) {
        console.error("Error in fetching Profile..: " + err);
      }
    };
    fetchProfile();
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setLocalProfile((prev) => ({
        ...prev,
        profilepic: URL.createObjectURL(file),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = async () => {
    if (isEditing) {
      const formData = new FormData();
      formData.append("fname", localprofile.fname);
      formData.append("lname", localprofile.lname);
      formData.append("email", localprofile.email);
      formData.append("mobile", localprofile.mobile);
      formData.append("companyname", localprofile.companyname);
      if (selectedImage) {
        formData.append("profilepic", selectedImage);
      }
      try {
        await axios.post("/auth/updateProfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Updation Success");
        setProfile(localprofile);
      } catch (err) {
        console.error("Error in updation: ", err);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}>
      {/* Profile Picture */}
      <Box
        sx={{ display: "flex", justifyContent: "center", mb: 3 }}
        onClick={handleImageClick}
        style={{ cursor: isEditing ? "pointer" : "default" }}>
        <Avatar
          src={localprofile.profilepic}
          sx={{ width: 100, height: 100 }}
        />
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: "none" }}
          accept='image/*'
          onChange={handleImageChange}
        />
      </Box>

      {/* Name */}
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={5}>
          <TextField
            fullWidth
            label='First Name'
            name='fname'
            value={localprofile.fname}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            label='Last Name'
            name='lname'
            value={localprofile.lname}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
      </Grid>

      {/* Email */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <TextField
          fullWidth
          label='Email'
          name='email'
          value={localprofile.email}
          onChange={handleChange}
          disabled
        />
      </Box>

      {/* Phone */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <TextField
          fullWidth
          label='Mobile Number'
          name='mobile'
          value={localprofile.mobile}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </Box>
      {/* Company Name */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <TextField
          fullWidth
          label='Company Name'
          name='companyname'
          value={localprofile.companyname}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </Box>

      {/* Billing Plan */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
        <Typography sx={{ flexGrow: 1 }}>
          Billing Plan: <strong>{localprofile.billingPlan}</strong>
        </Typography>
        <Button
          variant='outlined'
          onClick={() => (window.location.href = "/billing")}>
          Upgrade
        </Button>
      </Box>
      <Button
        variant='contained'
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          borderRadius: "20px",
          px: 4,
        }}
        onClick={handleButtonClick}>
        {isEditing ? "Update" : "Edit"}
      </Button>
    </Box>
  );
};

export default ProfilePage;
