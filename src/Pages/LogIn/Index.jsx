import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import LCSjpg from "../../assets/imgs/lcs4.jpg";
import { useState } from "react";
import { MailIcon } from "../../Components/icons/MailIcon";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFB } from "../../Components/Global/functions/firebase";

export default function LogIn() {
  const [userDetails, setUseDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  const auth = getAuth();

  async function setInitialUserData(useremail) {
    try {
      const users = await getFB("Users/");
      const currentUser = Object.values(users).find(
        (user) => user.email === useremail
      );

      if (currentUser) {
        localStorage.setItem("userEmail", useremail);
        localStorage.setItem("userFirstName", currentUser.firstName);
        localStorage.setItem("userLastName", currentUser.lastName);
        localStorage.setItem("role", currentUser.role);
        localStorage.setItem("avatar", currentUser.avatar);
        if (
          auth?.currentUser?.email === "miguel.charry@us.fincantieri.com"
        ) {
          localStorage.setItem("project", "0434");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      // Consider how to handle this situation - maybe redirect to an error page or show a message
    }
  }

  const logIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      const user = userCredential.user;
      if (user != null) {
        const userEmail = auth?.currentUser?.email;
        await setInitialUserData(userEmail); // Ensure user data is set
        navigateTo("/home"); // Navigate after successful login and data setup
      } else {
        localStorage.removeItem("userEmail");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Ensure loading is set to false in all cases
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        filter: "blur(0px)",
      }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          filter: "blur(0px)",
        }}>
        <img
          src={LCSjpg}
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Card
          style={{
            zIndex: 1,
          }}>
          <CardHeader>Log In - Nest Manager</CardHeader>
          <CardBody
            style={{
              padding: "20px", // Add padding all around
              mt: "10px",
            }}>
            <div>
              <Box>
                <Input
                  isClearable
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  labelPlacement="outside"
                  startContent={<MailIcon />}
                  onChange={(e) =>
                    setUseDetails({ ...userDetails, email: e.target.value })
                  }
                />
                <Input
                  isClearable
                  type="password"
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setUseDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
                />
              </Box>

              <Box mt={"15px"}>
                <Button color="primary" isLoading={loading} onClick={logIn}>
                  Log In
                </Button>
              </Box>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
