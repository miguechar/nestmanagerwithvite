import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn/>} />
          <Route path="/home" element={<WrapNav title={"Home"} component={<Home/>} />} />
          <Route path="/createnewnest" element={<WrapNav title={"Create Nest"} component={<CreateNest/>} />} />
          <Route path="/viewallnests" element={<WrapNav title={"Nests Data Table"} component={<ViewAllNests/>} />} />
          <Route path="/recordnestdata" element={<WrapNav title={"Record Nest Data"} component={<RecordNestData/>} />} />
          {/* fabreqs */}
          <Route path="/fabricationrequests/home" element={<WrapNav title={"Fabrication Requests Home"} component={<FabricationRequests/>} />} />
          <Route path="/fabricationrequests/requestfab" element={<WrapNav title={"Request Fabrication"} component={<RequestFab/>} />} />
          <Route path="/fabricationrequests/allfabs" element={<WrapNav title={"View All Fabrication"} component={<ViewAllFabs/>} />} />
          <Route path="/fabricationrequests/engineeringinbox" element={<WrapNav title={"Engineering Inbox"} component={<EngineeringInbox/>} />} />
          <Route path="/fabricationrequests/plateshopinbox" element={<WrapNav title={"Plate Shop Inbox"} component={<PlateshopInbox/>} />} />

          {/* avatar pages */}
          <Route path="/manageusers" element={<WrapNav title={"Manage users"} component={<ManageUsers/>} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
