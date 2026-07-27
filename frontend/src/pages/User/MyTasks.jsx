import { useEffect, useState } from "react";
import API from "../../api";


function MyTasks(){


const user = JSON.parse(
    localStorage.getItem("user")
) || {};



const [tasks,setTasks] = useState([]);




useEffect(()=>{

    loadTasks();

},[]);







const loadTasks = async()=>{


    try{


        const res = await API.get("/tasks");


        const allTasks = res.data;



        const userId = user.id || user._id;



        // Logged user tasks only
        const userTasks = allTasks.filter((task)=>{


            return (

                String(task.userId?._id || task.userId)

                ===

                String(userId)

            );


        });



        setTasks(userTasks);



    }
    catch(error){


        console.log(
            error.response?.data || error.message
        );


    }


};










const updateTask = async(id,status)=>{


    try{


        await API.put(`/tasks/${id}`,{


            status:

            status==="Pending"

            ?

            "Completed"

            :

            "Pending"


        });



        loadTasks();



    }
    catch(error){

        console.log(error);

    }


};









const deleteTask = async(id)=>{


    if(window.confirm("Delete Task?")){


        try{


            await API.delete(`/tasks/${id}`);


            loadTasks();



        }
        catch(error){


            console.log(error);


        }


    }


};









return(


<div>


<h1 className="text-3xl font-bold mb-6">

My Tasks 📝

</h1>





{

tasks.length===0 ?


(

<p className="text-gray-500">

No Tasks Available

</p>


)


:

(

<div className="grid md:grid-cols-3 gap-6">



{

tasks.map((task)=>(



<div

key={task._id}

className="bg-white rounded-xl shadow-lg p-6"


>



<h2 className="text-2xl font-bold text-blue-600">

{task.title}

</h2>





<div className="mt-4 space-y-3">



<p>

<b>Task ID:</b><br/>

<span className="text-gray-500">

{task._id}

</span>

</p>





<p>

<b>Description:</b><br/>

{task.description || "No Description"}

</p>






<p>

📅 <b>Due Date:</b>

{" "}

{task.dueDate || "Not Set"}

</p>






<p>

⏰ <b>Due Time:</b>

{" "}

{task.dueTime || "Not Set"}

</p>






<p>

⭐ <b>Priority:</b>

{" "}


<span

className={

task.priority==="High"

?

"text-red-600 font-bold"

:

task.priority==="Medium"

?

"text-yellow-600 font-bold"

:

"text-green-600 font-bold"

}

>

{task.priority}

</span>


</p>






<p>

📌 <b>Status:</b>

{" "}


<span

className={

task.status==="Completed"

?

"text-green-600 font-bold"

:

"text-orange-600 font-bold"

}

>

{task.status}

</span>


</p>







<p>

👤 <b>Assigned User:</b>

{" "}

{

task.userId?.name || user.name

}

</p>








{

task.createdAt &&

<p>

🕒 <b>Created Date:</b>

{" "}

{

new Date(task.createdAt)

.toLocaleString()

}


</p>

}



</div>










<div className="mt-5 flex gap-3">



<button

onClick={()=>updateTask(
task._id,
task.status
)}

className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

>

{

task.status==="Pending"

?

"Complete"

:

"Mark Pending"

}


</button>






<button

onClick={()=>deleteTask(task._id)}

className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"

>

Delete

</button>



</div>






</div>



))

}



</div>


)


}



</div>


);


}


export default MyTasks;