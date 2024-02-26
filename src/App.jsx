import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LogIn from "./Pages/LogIn/Index";
import { WrapNav } from "./WrapNav";
import { Home } from "./Pages/Home/Index";
import { CreateNest } from "./Pages/CreateNest";
import { ViewAllNests } from "./Pages/ViewAllNests/Index";
import { RecordNestData } from "./Pages/RecordNestData/Index";
import { FabricationRequests } from "./Pages/FabricationRequests/Index";
import { RequestFab } from "./Pages/FabricationRequests/RequestFabrication/Index";
import { ViewAllFabs } from "./Pages/FabricationRequests/ViewAllFabReqs/Index";
import { EngineeringInbox } from "./Pages/FabricationRequests/EngineeringInbox";
import { PlateshopInbox } from "./Pages/FabricationRequests/PlateshopInbox";
import { ManageUsers } from "./Pages/AvatarPages/ManageUsers/Index";
import { K2Project } from "./Pages/K2Project/Index";
import { ProjectManager, ProjectManagerBC } from "./Pages/ProjectManager/Index";
import {
  ViewModule,
  ViewModuleBC,
} from "./Pages/ProjectManager/viewmodule/Index";
import { Subassemblies } from "./Pages/Subassemblies";
import { Inventory, InventoryBC } from "./Pages/ProjectManager/inventory/Index";
import {
  ProjectSettings,
  SettingsBC,
} from "./Pages/ProjectManager/projectsettings";
import { LocalNews } from "./Pages/LocalNews/Index";
import { FabHome } from "./Pages/FabricationRequests/Home/Index";
import {
  StandardParts,
  StandardPartsBC,
} from "./Pages/ProjectManager/StandardParts/Index";
import { TestingPage } from "./Pages/Testing/Index";
import { PCPage } from "./Pages/BOM/Index";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, obtain the username or any unique identifier
        const username = user.email; // Or any other identifier
        setCurrentUser(username);
        // Send the username to Flask backend
        sendUsernameToFlask(username);
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });

    // Setup interval to send username every 10 seconds
    const interval = setInterval(() => {
      if (currentUser) {
        sendUsernameToFlask(currentUser);
      }
    }, 10000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [currentUser]);

  function sendUsernameToFlask(username) {
    // fetch("http://10.102.30.12:8080/update_user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username }),
    // })
    //   .then((response) => response.json())
    //   // .then(data => console.log(data.message))
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn />} />
          <Route
            path="/home"
            element={<WrapNav title={"Home"} component={<Home />} />}
          />
          <Route
            path="/createnewnest"
            element={
              <WrapNav title={"Create Nest"} component={<CreateNest />} />
            }
          />
          <Route
            path="/viewallnests"
            element={
              <WrapNav
                title={"Nests Data Table"}
                component={<ViewAllNests />}
              />
            }
          />
          <Route
            path="/recordnestdata"
            element={
              <WrapNav
                title={"Record Nest Data"}
                component={<RecordNestData />}
              />
            }
          />
          {/* fabreqs */}
          <Route
            path="/fabricationrequests/home"
            element={
              <WrapNav
                title={"Fabrication Requests Home"}
                component={<FabHome />}
              />
            }
          />
          <Route
            path="/fabricationrequests/requestfab"
            element={
              <WrapNav
                title={"Request Fabrication"}
                component={<RequestFab />}
              />
            }
          />
          <Route
            path="/fabricationrequests/allfabs"
            element={
              <WrapNav
                title={"View All Fabrication"}
                component={<ViewAllFabs />}
              />
            }
          />
          <Route
            path="/fabricationrequests/engineeringinbox"
            element={
              <WrapNav
                title={"Engineering Inbox"}
                component={<EngineeringInbox />}
              />
            }
          />
          <Route
            path="/fabricationrequests/plateshopinbox"
            element={
              <WrapNav
                title={"Plate Shop Inbox"}
                component={<PlateshopInbox />}
              />
            }
          />

          {/* subassemblies */}
          <Route
            path="/subassemblies"
            element={
              <WrapNav
                title={"View / Add Subassemblies"}
                component={<Subassemblies />}
              />
            }
          />

          {/* BOM */}
          <Route
            path="/bom"
            element={<WrapNav title={"View All PC's"} component={<PCPage />} />}
          />

          {/* avatar pages */}
          <Route
            path="/manageusers"
            element={
              <WrapNav title={"Manage users"} component={<ManageUsers />} />
            }
          />

          {/* K2 */}
          <Route
            path="/k2Project"
            element={<WrapNav title={"K2 Project"} component={<K2Project />} />}
          />

          {/* Project Manage */}
          <Route
            path="/projectmanager"
            element={
              <WrapNav
                title={"Project Manager"}
                component={<ProjectManager />}
                BC={<ProjectManagerBC />}
              />
            }
          />
          <Route
            path="/projectmanager/viewmodule"
            element={
              <WrapNav
                title={"View Module"}
                component={<ViewModule />}
                BC={<ViewModuleBC />}
              />
            }
          />
          <Route
            path="/projectmanager/inventory"
            element={
              <WrapNav
                title={"Inventory"}
                component={<Inventory />}
                BC={<InventoryBC />}
              />
            }
          />
          <Route
            path="/projectmanager/settings"
            element={
              <WrapNav
                title={"Project Settings"}
                component={<ProjectSettings />}
                BC={<SettingsBC />}
              />
            }
          />
          <Route
            path="/projectmanager/standardparts"
            element={
              <WrapNav
                title={"Standard Parts"}
                component={<StandardParts />}
                BC={<StandardPartsBC />}
              />
            }
          />

          {/* Local News */}
          <Route
            path="/localnews"
            element={<WrapNav title={"Local News"} component={<LocalNews />} />}
          />

          {/* Testing Page */}
          <Route
            path="/testing"
            element={
              <WrapNav title={"Testing Page"} component={<TestingPage />} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
