import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


function Layout({children}){


const user = JSON.parse(
    localStorage.getItem("user")
) || {};


const role = user.role || "user";



return(


<div className="flex min-h-screen bg-gray-100">


<Sidebar role={role}/>



<div className="flex-1">


<Navbar/>



<div className="p-6">

{children}

</div>



</div>



</div>


);


}


export default Layout;