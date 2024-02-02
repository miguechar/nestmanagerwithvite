import React from "react";
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

export const NavigationBar = () => {
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

  function ProfileIconDrop() {
    return (
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: "https://images.unsplash.com/broken",
              }}
              className="transition-transform"
              description={localStorage.getItem("role")}
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
            {localStorage.getItem("role") === "Admin" ? (
                <DropdownItem key="users" color="primary">
                  Users
                </DropdownItem>
            ) : (
              <div></div>
            )}

            <DropdownItem key="logout" color="danger" onClick={() => logOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
          <Avatar
            showFallback
            name={
              localStorage.getItem("userFirstName").charAt(0).toUpperCase() +
              localStorage.getItem("userLastName").charAt(0).toUpperCase()
            }
            src="https://images.unsplash.com/broken"
          />
        </Dropdown>
      </div>
    );
  }

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
            <DropdownItem
              key="usage_metrics"
              onClick={() => navigateTo("/fabricationrequests/home")}
              description="Create Nest by AutoComplete PDF, Upload CSV or manually enter"
              startContent={icons.activity}>
              Fabrication Requests Dashboard
            </DropdownItem>
            <DropdownItem
              key="autoscaling"
              description="Scan Nest QR and record HN, SN"
              onClick={() => navigateTo("/fabricationrequests/requestfab")}
              startContent={icons.scale}>
              Request Fab Req
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="View Data Table of all create WE nests & generate report"
              onClick={() =>
                navigateTo("/fabricationrequests/engineeringinbox")
              }
              startContent={icons.flash}>
              Engineering Inbox
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
              onClick={() => navigateTo("/fabricationrequests/plateshopinbox")}
              startContent={icons.server}>
              Plateshop Inbox
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
              onClick={() => navigateTo("/fabricationrequests/allfabs")}
              startContent={icons.user}>
              View All Fabrication Requests
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
    </div>
  );
};
