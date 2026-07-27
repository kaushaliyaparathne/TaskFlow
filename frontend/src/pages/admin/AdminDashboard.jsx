import { useEffect, useState } from "react";
import API from "../../api";


function AdminDashboard(){


const [stats,setStats] = useState({

users:0,
tasks:0,
pending:0,
completed:0

});


const [recentTasks,setRecentTasks] = useState([]);

const [recentUsers,setRecentUsers] = useState([]);





useEffect(()=>{

loadDashboard();

},[]);







const loadDashboard = async()=>{


try{


const usersRes = await API.get("/users");

const tasksRes = await API.get("/tasks");




// remove admin user

const users = usersRes.data.filter(

(user)=>

user.role?.toLowerCase() !== "admin"

);



const tasks = tasksRes.data;





setStats({

users: users.length,


tasks: tasks.length,


pending:

tasks.filter(

(task)=>

task.status==="Pending"

).length,



completed:

tasks.filter(

(task)=>

task.status==="Completed"

).length


});





setRecentTasks(

tasks

.slice(-5)

.reverse()

);





setRecentUsers(

users

.slice(-5)

.reverse()

);





}catch(error){


console.log(

error.response?.data || error.message

);


}



};









return(


<div className="p-6">



{/* Header */}

<div className="mb-8">


<h1 className="text-3xl font-bold text-gray-800">

Dashboard Overview 📊

</h1>


<p className="text-gray-500 mt-2">

Monitor users, tasks and system performance

</p>


</div>









{/* Cards */}


<div className="grid grid-cols-1 md:grid-cols-4 gap-6">



<div className="bg-white shadow-lg rounded-xl p-6">

<h3 className="text-gray-500 font-semibold">

Total Users 👥

</h3>


<p className="text-4xl font-bold text-blue-600 mt-3">

{stats.users}

</p>


</div>







<div className="bg-white shadow-lg rounded-xl p-6">


<h3 className="text-gray-500 font-semibold">

Total Tasks 📝

</h3>


<p className="text-4xl font-bold text-purple-600 mt-3">

{stats.tasks}

</p>


</div>







<div className="bg-white shadow-lg rounded-xl p-6">


<h3 className="text-gray-500 font-semibold">

Pending Tasks ⏳

</h3>


<p className="text-4xl font-bold text-yellow-500 mt-3">

{stats.pending}

</p>


</div>








<div className="bg-white shadow-lg rounded-xl p-6">


<h3 className="text-gray-500 font-semibold">

Completed ✅

</h3>


<p className="text-4xl font-bold text-green-600 mt-3">

{stats.completed}

</p>


</div>



</div>









{/* Recent Data */}



<div className="grid md:grid-cols-2 gap-6 mt-8">





{/* Recent Tasks */}


<div className="bg-white shadow-lg rounded-xl p-6">


<h2 className="text-xl font-bold mb-5">

Recent Tasks 📝

</h2>



{

recentTasks.length === 0 ?

(

<p className="text-gray-500">

No Tasks Available

</p>

)

:

(

<div className="space-y-3">


{

recentTasks.map((task)=>(


<div

key={task._id}

className="border rounded-lg p-4"

>


<h3 className="font-bold">

{task.title}

</h3>



<p className="text-sm text-gray-500">

{task.description}

</p>



<span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm

${

task.status==="Completed"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`}>

{task.status}

</span>



</div>


))

}


</div>

)

}


</div>









{/* Recent Users */}


<div className="bg-white shadow-lg rounded-xl p-6">


<h2 className="text-xl font-bold mb-5">

Recent Users 👥

</h2>




{

recentUsers.length===0

?


<p className="text-gray-500">

No Users Available

</p>


:


<div className="space-y-3">


{

recentUsers.map((user)=>(


<div

key={user._id}

className="border rounded-lg p-4"

>


<h3 className="font-bold">

{user.name}

</h3>



<p className="text-gray-500">

{user.email}

</p>



</div>


))

}



</div>


}



</div>






</div>









{/* System Overview */}


<div className="bg-white shadow-lg rounded-xl p-6 mt-8">


<h2 className="text-2xl font-bold">

System Overview

</h2>



<p className="text-gray-500 mt-2">

Manage users, tasks and monitor system activities.

</p>





<div className="grid md:grid-cols-3 gap-5 mt-6">



<div className="border rounded-xl p-5">

<h3 className="font-bold">

Users Management 👥

</h3>


<p className="text-sm text-gray-500 mt-2">

View and manage registered users.

</p>


</div>







<div className="border rounded-xl p-5">

<h3 className="font-bold">

Task Monitoring 📝

</h3>


<p className="text-sm text-gray-500 mt-2">

Track task progress and status.

</p>


</div>







<div className="border rounded-xl p-5">

<h3 className="font-bold">

System Activity ⚡

</h3>


<p className="text-sm text-gray-500 mt-2">

Monitor overall application activity.

</p>


</div>





</div>



</div>





</div>


);


}


export default AdminDashboard;