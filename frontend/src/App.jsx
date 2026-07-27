import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";


// User Pages
import Dashboard from "./pages/User/Dashboard";
import AddTask from "./pages/User/AddTask";
import MyTasks from "./pages/User/MyTasks";
import TaskCalendar from "./pages/User/TaskCalendar";
import Profile from "./pages/User/Profile";


// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import ManageUsers from "./pages/Admin/ManageUsers";
import Reports from "./pages/Admin/Reports";


// Layout
import Layout from "./components/Layout";





function App(){


return(


<BrowserRouter>


<Routes>





{/* ================= PUBLIC ROUTES ================= */}



<Route
path="/login"
element={<Login/>}
/>




<Route
path="/register"
element={<Register/>}
/>









{/* ================= USER ROUTES ================= */}



<Route

path="/dashboard"

element={

<Layout>

<Dashboard/>

</Layout>

}

/>







<Route

path="/dashboard/add-task"

element={

<Layout>

<AddTask/>

</Layout>

}

/>







<Route

path="/dashboard/my-tasks"

element={

<Layout>

<MyTasks/>

</Layout>

}

/>







<Route

path="/dashboard/calendar"

element={

<Layout>

<TaskCalendar/>

</Layout>

}

/>







<Route

path="/dashboard/profile"

element={

<Layout>

<Profile/>

</Layout>

}

/>













{/* ================= ADMIN ROUTES ================= */}




<Route

path="/admin/dashboard"

element={

<Layout>

<AdminDashboard/>

</Layout>

}

/>







<Route

path="/admin/tasks"

element={

<Layout>

<ManageTasks/>

</Layout>

}

/>







<Route

path="/admin/users"

element={

<Layout>

<ManageUsers/>

</Layout>

}

/>







<Route

path="/admin/reports"

element={

<Layout>

<Reports/>

</Layout>

}

/>









{/* ================= DEFAULT ================= */}




<Route

path="*"

element={

<Navigate to="/login"/>

}

/>






</Routes>


</BrowserRouter>


);


}



export default App;