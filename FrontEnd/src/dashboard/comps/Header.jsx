import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({title, subtitle}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb={"20px"}>
      <Typography variant='h2' fontWeight={"bold"} sx={{ mb: "5px" }} color={colors.whiteAccent[300]}>
        {title}
      </Typography>
      <Typography variant='h5' color={colors.redAccent[100]}>{subtitle}</Typography>
    </Box>
  );
};

export default Header;
