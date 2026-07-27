import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";


function AddTask(){


const navigate = useNavigate();


const user = JSON.parse(
    localStorage.getItem("user")
) || {};



const today = new Date()
.toISOString()
.split("T")[0];



const [task,setTask] = useState({

title:"",
description:"",
status:"Pending",
priority:"Medium",
dueDate:"",
dueTime:""

});



const [loading,setLoading] = useState(false);





const handleChange=(e)=>{


setTask({

...task,

[e.target.name]:e.target.value

});


};








// Disable previous time when selected date is today

const getMinTime = ()=>{


const now = new Date();



const selectedDate = new Date(task.dueDate);



const currentDate = new Date();



if(

selectedDate.toDateString()

===

currentDate.toDateString()

){



const hours = String(
now.getHours()
).padStart(2,"0");



const minutes = String(
now.getMinutes()
).padStart(2,"0");



return `${hours}:${minutes}`;


}



return "00:00";


};









const handleSubmit=async(e)=>{


e.preventDefault();



try{


setLoading(true);



const userId = user.id || user._id;



if(!userId){


alert("User not logged in");

return;


}




// prevent same day past time

const now = new Date();


const selectedDateTime = new Date(

`${task.dueDate}T${task.dueTime}`

);




if(selectedDateTime < now){


alert(
"Please select a future date and time"
);


return;


}






await API.post("/tasks",{



...task,


userId:userId,


createdAt:new Date()



});





alert("Task Added Successfully 🚀");


navigate("/dashboard/my-tasks");





}catch(error){



console.log(error);



alert(

error.response?.data?.message ||

"Failed to add task"

);



}
finally{


setLoading(false);


}



};









return(


<div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">



<h1 className="text-3xl font-bold mb-5">

➕ Add New Task

</h1>






<form

onSubmit={handleSubmit}

className="space-y-4"

>






<div>

<label className="font-semibold">

Task Title

</label>


<input


type="text"


name="title"


value={task.title}


onChange={handleChange}


placeholder="Enter task title"


className="w-full border p-3 rounded-lg"


required

/>


</div>









<div>

<label className="font-semibold">

Description

</label>


<textarea


name="description"


value={task.description}


onChange={handleChange}


placeholder="Enter description"


className="w-full border p-3 rounded-lg"


required


/>


</div>









<div>

<label className="font-semibold">

Priority

</label>



<select


name="priority"


value={task.priority}


onChange={handleChange}


className="w-full border p-3 rounded-lg"


>


<option value="High">

High

</option>


<option value="Medium">

Medium

</option>


<option value="Low">

Low

</option>


</select>


</div>









<div>

<label className="font-semibold">

Due Date

</label>



<input


type="date"


name="dueDate"


value={task.dueDate}


min={today}


onChange={handleChange}


className="w-full border p-3 rounded-lg"


required


/>



</div>









<div>

<label className="font-semibold">

Due Time

</label>



<input


type="time"


name="dueTime"


value={task.dueTime}


min={getMinTime()}


onChange={handleChange}


className="w-full border p-3 rounded-lg"


required


/>


</div>









<button


type="submit"


disabled={loading}


className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"


>


{

loading

?

"Adding..."

:

"Add Task"

}


</button>







</form>






</div>


);


}


export default AddTask;