import { useNavigate } from "react-router-dom";


function Sidebar({ role }) {


const navigate = useNavigate();



const logout = () => {

localStorage.removeItem("token");
localStorage.removeItem("user");

navigate("/login");

};






const userMenu = [

{
name:"🏠 Dashboard",
path:"/dashboard"
},

{
name:"➕ Add Task",
path:"/dashboard/add-task"
},

{
name:"📅 Calendar",
path:"/dashboard/calendar"
},

{
name:"📝 My Tasks",
path:"/dashboard/my-tasks"
},

{
name:"👤 Profile",
path:"/dashboard/profile"
}

];









const adminMenu = [

{
name:"🏠 Dashboard",
path:"/admin/dashboard"
},

{
name:"👥 Users",
path:"/admin/users"
},

{
name:"📝 Tasks",
path:"/admin/tasks"
},

{
name:"📊 Reports",
path:"/admin/reports"
},

];







const menu = role === "admin"
?
adminMenu
:
userMenu;









return (


<div className="
w-64 
min-h-screen 
bg-gradient-to-b 
from-blue-600 
to-purple-600 
text-white 
p-6 
flex 
flex-col 
shadow-xl
">







<h2 className="
text-3xl 
font-bold
">

TaskFlow 🚀

</h2>





<p className="
text-sm 
text-blue-100 
mb-10
">


{
role === "admin"
?
"Manage. Control. Track."
:
"Organize. Track. Complete."
}


</p>









<div className="
flex 
flex-col 
gap-4
">


{

menu.map((item)=>(


<button


key={item.path}


onClick={()=>navigate(item.path)}


className="
text-left 
p-3 
rounded-xl 
hover:bg-white/20 
transition
"


>


{item.name}


</button>



))


}


</div>









<div className="
mt-auto
">



<button


onClick={logout}


className="
w-full 
bg-white 
text-purple-600 
p-3 
rounded-xl 
font-semibold 
hover:bg-gray-100
"


>


🚪 Logout


</button>



</div>







</div>


);


}


export default Sidebar;