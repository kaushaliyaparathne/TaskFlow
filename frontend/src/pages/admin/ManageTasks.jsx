import { useEffect, useState } from "react";
import API from "../../api";


function ManageTasks() {


  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");





  useEffect(()=>{

    fetchTasks();

  },[]);






  const fetchTasks = async()=>{


    try{


      const res = await API.get("/tasks");


      console.log("Tasks:",res.data);


      setTasks(res.data);



    }catch(error){


      console.log(error);


    }


  };









  const updateStatus = async(id,status)=>{


    try{


      await API.put(`/tasks/${id}`,{


        status:status


      });



      fetchTasks();



    }catch(error){


      console.log(error);


    }


  };









  const deleteTask = async(id)=>{


    if(window.confirm("Delete this task?")){


      try{


        await API.delete(`/tasks/${id}`);


        fetchTasks();



      }catch(error){


        console.log(error);


      }


    }


  };









  const filteredTasks = tasks.filter((task)=>{


    const searchText = search.toLowerCase();



    return (

      task.title?.toLowerCase()
      .includes(searchText)

      ||

      task.userId?.name?.toLowerCase()
      .includes(searchText)

    );


  });









  return(


    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6">

        Manage Tasks 📋

      </h1>






      <input


        type="text"


        placeholder="Search task or user..."


        value={search}


        onChange={(e)=>setSearch(e.target.value)}


        className="border p-3 rounded-lg w-full mb-6"


      />









      {

      filteredTasks.length===0 ?


      (

        <p className="text-gray-500">

          No Tasks Found

        </p>

      )

      :



      (

      <div className="grid md:grid-cols-3 gap-6">





      {

      filteredTasks.map((task)=>(



        <div


          key={task._id}


          className="bg-white shadow-lg rounded-xl p-5"


        >





          <h2 className="text-xl font-bold">

            {task.title}

          </h2>






          <p className="text-gray-600 mt-2">

            {task.description}

          </p>








          <p className="mt-3">

            👤 <b>Assigned User:</b>

            {" "}

            {

            task.userId?.name ||

            "Unknown User"

            }


          </p>






          <p>

            📧

            {" "}

            {

            task.userId?.email ||

            ""

            }


          </p>








          <p className="mt-2">

            ⭐ <b>Priority:</b>

            {" "}

            {task.priority}

          </p>








          <p>

            📅 <b>Due Date:</b>

            {" "}

            {task.dueDate}

          </p>








          <p>

            ⏰ <b>Due Time:</b>

            {" "}

            {task.dueTime}

          </p>








          <p>

            🕒 <b>Created:</b>

            {" "}

            {

            task.createdAt ?

            new Date(task.createdAt)
            .toLocaleString()

            :

            "N/A"

            }

          </p>









          <div className="mt-4">


            <label className="font-semibold">

              Status

            </label>



            <select


              value={task.status}


              onChange={(e)=>

                updateStatus(

                  task._id,

                  e.target.value

                )

              }


              className="border rounded-lg p-2 w-full mt-2"


            >


              <option value="Pending">

                Pending

              </option>


              <option value="In Progress">

                In Progress

              </option>


              <option value="Completed">

                Completed

              </option>


            </select>


          </div>









          <button


            onClick={()=>deleteTask(task._id)}


            className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-lg mt-5"


          >

            Delete Task

          </button>






        </div>



      ))



      }





      </div>


      )

      }





    </div>


  );


}


export default ManageTasks;