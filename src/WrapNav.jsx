import { Typography } from "@mui/material";
import { NavigationBar } from "./Components/Global/NavBar";

export const WrapNav = ({ component, title, subtitle }) => {
  return (
    <div>
      <NavigationBar />
      <div style={{ textAlign: "left", marginTop: "5px"}}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="grey"
          sx={{ marginBottom: "5px" }}>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="green">
          {subtitle}
        </Typography>
      </div>
      <div style={{ marginTop: "15px" }}>{component}</div>
    </div>
  );
};
