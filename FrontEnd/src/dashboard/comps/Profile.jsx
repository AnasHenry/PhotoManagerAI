import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ImgCropper from "./cropper";
import Cropper from "react-easy-crop";
import Modal from "@mui/material/Modal";
import axios from "../../axiosInstance";
import { useProfile } from "../../context/ProfileContext";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { profile, setProfile } = useProfile();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixel, setCroppedPixel] = useState(null);
  const [cropModalOpen, SetCropModalOpen] = useState(false);
  const [imageForCrop, setImageForCrop] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });
        // console.log(response.data);
        const data = response.data;
        setLocalProfile({
          fname: data.fname || "",
          lname: data.lname || "",
          email: data.email || "",
          mobile: data.mobile || "",
          billingPlan: "Free",
          companyname: data.companyname || "",
          profilepic:  `http://localhost:5000/api/auth/profilepic/${data.id}`,
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
      const reader = new FileReader();
      reader.onload = () => {
        setImageForCrop(reader.result);
        SetCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (_, croppedPixels) => {
    setCroppedPixel(croppedPixels);
  };

  const handleCropSave = async () => {
    try {
      const { file, url } = await ImgCropper(imageForCrop, croppedPixel);
      setSelectedImage(file);
      setLocalProfile((prev) => ({
        ...prev,
        profilepic: url,
      }));
      SetCropModalOpen(false);
    } catch (err) {
      console.error("Cropping failed", err);
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
      if(selectedImage){
        formData.append("profilepic", selectedImage);
      }
      try {
        await axios.post("/auth/updateProfile", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
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
        maxHeight: 550,
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');`}
      </style>
      <Modal open={cropModalOpen} onClose={() => setCropModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}>
          <Cropper
            image={imageForCrop}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <Box mt={2} display='flex' justifyContent='space-between'>
            <Button variant='contained' onClick={() => setCropModalOpen(false)}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleCropSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Apply font only inside this component */}
      <div
        style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          minHeight: "100vh",
          padding: "2rem 1rem",
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
            color={colors.primary[400]}
            variant='outlined'
            onClick={() => (window.location.href = "/billing")}>
            Upgrade
          </Button>
          <Button
            variant='contained'
            sx={{
              ml: 4,
              borderRadius: "20px",
              px: 4,
            }}
            onClick={handleButtonClick}>
            {isEditing ? "Update" : "Edit"}
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default ProfilePage;
