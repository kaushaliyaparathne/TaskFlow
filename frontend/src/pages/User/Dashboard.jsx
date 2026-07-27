import { useEffect, useState } from "react";
import API from "../../api";


function Dashboard(){


const user = JSON.parse(
    localStorage.getItem("user")
) || {};



const [tasks,setTasks] = useState([]);


const [stats,setStats] = useState({

total:0,
pending:0,
completed:0

});







useEffect(()=>{

loadTasks();

},[]);







const loadTasks = async()=>{


try{


const res = await API.get("/tasks");


const allTasks = res.data;



const userId = user.id || user._id;



// logged user tasks only

const userTasks = allTasks.filter((task)=>{


return (

String(task.userId?._id || task.userId)

===

String(userId)

);


});





setTasks(userTasks);





setStats({


total:userTasks.length,



pending:userTasks.filter(

(task)=>

task.status==="Pending"

).length,




completed:userTasks.filter(

(task)=>

task.status==="Completed"

).length



});





}
catch(error){


console.log(

error.response?.data || error.message

);


}


};









return(


<div>





{/* Welcome */}


<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl mb-6">


<h1 className="text-3xl font-bold">

Welcome {user.name || "User"} 👋

</h1>



<p className="mt-2">

Organize your daily tasks and stay productive 🚀

</p>



<p className="mt-3 text-sm">

📧 {user.email}

</p>



</div>









{/* Cards */}



<div className="grid md:grid-cols-3 gap-6 mb-8">





<div className="bg-white p-6 rounded-xl shadow">


<h3 className="text-gray-500">

Total Tasks

</h3>


<p className="text-4xl font-bold text-blue-600">

{stats.total}

</p>


</div>







<div className="bg-white p-6 rounded-xl shadow">


<h3 className="text-gray-500">

Pending Tasks

</h3>


<p className="text-4xl font-bold text-yellow-500">

{stats.pending}

</p>


</div>







<div className="bg-white p-6 rounded-xl shadow">


<h3 className="text-gray-500">

Completed Tasks

</h3>


<p className="text-4xl font-bold text-green-600">

{stats.completed}

</p>


</div>





</div>









{/* Recent Tasks */}



<div className="bg-white p-6 rounded-xl shadow">


<h2 className="text-xl font-bold mb-5">

Recent Tasks 📝

</h2>






{

tasks.length===0 ?


(

<p className="text-gray-500">

No Tasks Available

</p>


)



:


(

tasks.slice(0,5).map((task)=>(



<div

key={task._id}

className="border p-4 mb-3 rounded-lg flex justify-between"

>



<div>


<h3 className="font-bold text-lg">

{task.title}

</h3>





<p className="text-gray-500">

{task.description || "No description"}

</p>






<p className="text-sm mt-2">

📅 Due Date: {task.dueDate || "Not set"}

</p>






<p className="text-sm">

⏰ Due Time: {task.dueTime || "Not set"}

</p>






<p className="text-sm">

⭐ Priority: {task.priority}

</p>







<p className="text-sm">

👤 User: {task.userId?.name || user.name}

</p>





</div>







<span

className={`px-3 py-1 rounded-full h-fit text-sm

${
task.status==="Completed"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

>


{task.status}


</span>





</div>



))


)


}






</div>







</div>


);


}


export default Dashboard;