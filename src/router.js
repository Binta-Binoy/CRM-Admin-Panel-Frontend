import { createBrowserRouter } from "react-router-dom";
import StaffManagementDashboard from "./components/dashboard";

const router=createBrowserRouter([
    {path:'', element:<StaffManagementDashboard/>}
    
])
export default router;