import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import API from "../../api";


function TaskCalendar(){


const user = JSON.parse(
    localStorage.getItem("user")
) || {};



const [date,setDate] = useState(new Date());

const [tasks,setTasks] = useState([]);

const [selectedTasks,setSelectedTasks] = useState([]);





useEffect(()=>{

loadTasks();

},[]);






// Local date formatter
const formatDate = (date)=>{

    const year = date.getFullYear();

    const month = String(
        date.getMonth()+1
    ).padStart(2,"0");


    const day = String(
        date.getDate()
    ).padStart(2,"0");


    return `${year}-${month}-${day}`;

};








const loadTasks = async()=>{


try{


const res = await API.get("/tasks");


const userId = user.id || user._id;



// Logged user tasks only

const userTasks = res.data.filter((task)=>{


return (

String(task.userId?._id || task.userId)

===

String(userId)

);


});



setTasks(userTasks);




// Today tasks

const today = formatDate(new Date());



setSelectedTasks(

userTasks.filter(

(task)=>

task.dueDate === today

)

);





}catch(error){


console.log(error);


}


};









const handleDateChange = (newDate)=>{


setDate(newDate);



const selectedDate = formatDate(newDate);





const filteredTasks = tasks.filter(

(task)=>

task.dueDate === selectedDate

);



setSelectedTasks(filteredTasks);



};









const tileContent = ({date,view})=>{


if(view==="month"){



const checkDate = formatDate(date);




const hasTask = tasks.some(

(task)=>

task.dueDate === checkDate

);




if(hasTask){


return (

<div className="text-blue-600 font-bold">

•

</div>

);


}


}


return null;


};









return(


<div>



<h1 className="text-3xl font-bold mb-2">

Task Calendar 📅

</h1>




<p className="text-gray-600 mb-6">

View your tasks by due date

</p>







<div className="bg-white p-6 rounded-xl shadow">


<Calendar


value={date}


onChange={handleDateChange}


tileContent={tileContent}


/>


</div>









<div className="bg-white p-6 rounded-xl shadow mt-6">


<h2 className="text-xl font-bold mb-4">

Tasks on {date.toDateString()}

</h2>






{

selectedTasks.length === 0 ?



(

<p className="text-gray-500">

No tasks available

</p>


)



:

(


selectedTasks.map((task)=>(



<div

key={task._id}

className="border p-4 rounded-lg mb-3"

>



<h3 className="font-bold text-xl">

{task.title}

</h3>





<p className="text-gray-600 mt-2">

{task.description || "No Description"}

</p>







<p className="mt-2">

📅 Due Date:

{" "}

{task.dueDate}

</p>







<p>

⏰ Due Time:

{" "}

{task.dueTime}

</p>







<p>

⭐ Priority:

{" "}

{task.priority}

</p>







<p>

📌 Status:

{" "}

<span className="font-bold">

{task.status}

</span>

</p>







</div>



))


)



}





</div>







</div>


);


}


export default TaskCalendar;