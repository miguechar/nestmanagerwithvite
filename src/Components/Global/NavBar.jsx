import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  User,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "./Icons.jsx";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Config.jsx";
import PopOver from "../Common/PopOver.jsx";
import Dialog from "../Common/Dialog.jsx";
import { userAvatarts } from "../icons/AvatarPP.jsx";
import { updateFB } from "./functions/firebase.jsx";

export const NavigationBar = () => {
  const [dialog, SetDialog] = useState({
    open: false,
    title: "",
    body: "",
    footer: "",
  });
  const [icon, setIcons] = useState([]);
  const [serverMessage, setServerMessage] = useState("Server is Down");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  async function logOut() {
    try {
      await signOut(auth);
      localStorage.setItem("userEmail", "");
      localStorage.setItem("userFirstName", "");
      localStorage.setItem("userLastName", "");
      localStorage.setItem("role", "");
      localStorage.setItem("project", "");
      navigateTo("/");
    } catch (err) {
      console.error(err);
    }
  }

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  function changeAvatar() {
    const changeAvatarIcon = ({ icon }) => {
      const userID = auth?.currentUser?.uid;
      updateFB("Users/" + userID, { avatar: icon });
      localStorage.setItem("avatar", icon);
      console.log("Users/" + userID + "/avatar", icon);
    };

    const body = (
      <div>
        <Select
          label="Choose Avatar"
          onChange={(e) => changeAvatarIcon({ icon: e.target.value })}
          placeholder={
            <Avatar
              alt={userAvatarts.id}
              className="flex-shrink-0"
              size="sm"
              src={localStorage.getItem("role")}
            />
          }>
          {userAvatarts.map((userAvatarts) => (
            <SelectItem
              key={userAvatarts.avatar}
              textValue={userAvatarts.avatar}
              value={userAvatarts.avatar}>
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={userAvatarts.name}
                  className="flex-shrink-0"
                  size="sm"
                  src={userAvatarts.avatar}
                />
                <div className="flex flex-col">
                  <span className="text-small">{userAvatarts.id}</span>
                  <span className="text-tiny text-default-400">
                    {userAvatarts.id}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </Select>
      </div>
    );

    const footer = (
      <div>
        <Button color="danger" onClick={() => handleDialogClose()}>
          Close
        </Button>
      </div>
    );

    SetDialog({
      open: true,
      body: body,
      title: "Choose avatar",
      footer: footer,
    });
  }

  function ProfileIconDrop() {
    return (
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: localStorage.getItem("avatar"),
              }}
              className="transition-transform"
              description = {localStorage.getItem("project") ? localStorage.getItem("role") + ", " + localStorage.getItem("project") : localStorage.getItem("role")}
              name={
                localStorage.getItem("userFirstName") +
                " " +
                localStorage.getItem("userLastName")
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">{localStorage.getItem("userEmail")}</p>
            </DropdownItem>

            {localStorage.getItem("role") === "Admin" && (
              <DropdownItem
                key="users"
                color="primary"
                onClick={() => navigateTo("/manageusers")}>
                Users
              </DropdownItem>
            )}

            {localStorage.getItem("userEmail") ===
              "miguel.charry@us.fincantieri.com" && (
              <DropdownItem
                key="users"
                color="primary"
                onClick={() => navigateTo("/projectmanager")}>
                Projects
              </DropdownItem>
            )}

            {localStorage.getItem("userEmail") ===
              "miguel.charry@us.fincantieri.com" && (
              <DropdownItem
                key="users"
                color="primary"
                onClick={() => navigateTo("/k2Project")}>
                K2 Project
              </DropdownItem>
            )}

            <DropdownItem
              key="changeavatar"
              color="primary"
              onClick={() => changeAvatar()}>
              Change Avatar
            </DropdownItem>

            <DropdownItem key="logout" color="danger" onClick={() => logOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }

  function handleDialogClose() {
    SetDialog({ ...dialog, open: false });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("http://10.102.30.12:8080/api/status")
        .then((response) => response.json())
        .then((data) => setServerMessage(data.status))
        .catch(() => setServerMessage("Server is Down"));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Navbar
        position="static"
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Nest Manager</p>
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Button
              color="primary"
              variant="light"
              onClick={() => navigateTo("/home")}>
              Home
            </Button>
          </NavbarItem>
        </NavbarContent>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light">
                Nests
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}>
            <DropdownItem
              key="usage_metrics"
              description="Create Nest by AutoComplete PDF, Upload CSV or manually enter"
              onClick={() => navigateTo("/createnewnest")}
              startContent={icons.activity}>
              Create New Nest
            </DropdownItem>
            <DropdownItem
              key="autoscaling"
              description="Scan Nest QR and record HN, SN"
              onClick={() => navigateTo("/recordnestdata")}
              startContent={icons.scale}>
              Record Nest Data
            </DropdownItem>
            <DropdownItem
              key="viewallnests"
              description="View Data Table of all create WE nests & generate report"
              onClick={() => navigateTo("/viewallnests")}
              startContent={icons.flash}>
              View All Nests
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light">
                Fabrication Requests
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}>
            {/* <DropdownItem
              key="usage_metrics"
              onClick={() => navigateTo("/fabricationrequests/home")}
              description="Fab Dashboard"
              startContent={icons.activity}
            >
              Fabrication Requests Dashboard
            </DropdownItem> */}
            <DropdownItem
              key="autoscaling"
              description=""
              onClick={() => navigateTo("/fabricationrequests/home")}
              startContent={icons.activity}>
              Home
            </DropdownItem>
            <DropdownItem
              key="autoscaling"
              description=""
              onClick={() => navigateTo("/fabricationrequests/requestfab")}
              startContent={icons.scale}>
              Request Fab Req
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description=""
              onClick={() =>
                navigateTo("/fabricationrequests/engineeringinbox")
              }
              startContent={icons.flash}>
              Engineering Inbox
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description=""
              onClick={() => navigateTo("/fabricationrequests/plateshopinbox")}
              startContent={icons.server}>
              Plateshop Inbox
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description=""
              onClick={() => navigateTo("/fabricationrequests/allfabs")}
              startContent={icons.user}>
              View All Fabrication Requests
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light">
                Subassemblies
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}>
            <DropdownItem
              key="autoscaling"
              description=""
              onClick={() => navigateTo("/subassemblies")}
              startContent={icons.scale}>
              View / Add
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarContent>
          <NavbarItem>
            <p
              style={{
                color: serverMessage === "Server is Down" ? "red" : "green",
              }}>
              {serverMessage}
            </p>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <PopOver
              buttonTitle={"About this App"}
              title={"Nest Manager"}
              message={
                "This app tries to improve traceability in SOC 1 implementing a 'Nest Manager' where Waterfront Engineers can upload their nest data and be able to record data such as heat# & SN. This can be done by uploading a PDF and 'Nest Manager' can automatically read the PDF and populate entry, The app does not store the PDF in any way just stores information such as part # and stock in a secure database backed by Google, otherwise known as 'Firebase'. This app also does not store pictures of any format or any sensitive information \n This app has other features such under 'Fabrication Requests' that looks to eliminate down time on messer table due to having to locate all code files for fab requests. "
              }
            />
          </NavbarItem>
          <NavbarItem>
            <ProfileIconDrop />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div>
        <Dialog
          open={dialog.open}
          title={dialog.title}
          body={dialog.body}
          footer={dialog.footer}
          onClose={handleDialogClose}
        />
      </div>
    </div>
  );
};
