import { useEffect, useState } from "react";
import API from "../../api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
  Line,
} from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);



function Reports() {


  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);



  useEffect(() => {

    fetchData();

  }, []);




  const fetchData = async () => {

    try {

      const taskResponse = await API.get("/tasks");
      const userResponse = await API.get("/users");


      setTasks(taskResponse.data);
      setUsers(userResponse.data);


    } catch(error){

      console.log(error);

    }

  };





  // ================= TASK COUNT =================


  const totalTasks = tasks.length;


  const pendingTasks = tasks.filter(
    task => task.status === "Pending"
  ).length;



  const progressTasks = tasks.filter(
    task => task.status === "In Progress"
  ).length;



  const completedTasks = tasks.filter(
    task => task.status === "Completed"
  ).length;



  const totalUsers = users.length;






  // ================= TASK BAR CHART =================



  const taskBarData = {


    labels:[
      "Pending",
      "In Progress",
      "Completed"
    ],


    datasets:[

      {

        label:"Tasks",

        data:[
          pendingTasks,
          progressTasks,
          completedTasks
        ],


        backgroundColor:[
          "#facc15",
          "#3b82f6",
          "#22c55e"
        ]

      }

    ]


  };








  // ================= USER GROWTH LINE CHART =================



  const userCountByMonth = Array(12).fill(0);



  users.forEach((user)=>{


    if(user.createdAt){


      const date = new Date(user.createdAt);


      const month = date.getMonth();


      userCountByMonth[month]++;


    }


  });





  const userGrowthData = {


    labels:[

      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"

    ],



    datasets:[


      {

        label:"New Users",

        data:userCountByMonth,


        borderColor:"#8b5cf6",


        backgroundColor:"#ddd6fe",


        tension:0.3


      }


    ]


  };








  return(


    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6">
        Reports
      </h1>





      {/* ================= CARDS ================= */}



      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">



        <div className="bg-white shadow rounded p-5 text-center">

          <h3 className="font-semibold">
            Total Tasks
          </h3>

          <p className="text-3xl font-bold text-blue-600">
            {totalTasks}
          </p>

        </div>





        <div className="bg-white shadow rounded p-5 text-center">

          <h3 className="font-semibold">
            Pending
          </h3>

          <p className="text-3xl font-bold text-yellow-500">
            {pendingTasks}
          </p>

        </div>





        <div className="bg-white shadow rounded p-5 text-center">

          <h3 className="font-semibold">
            In Progress
          </h3>

          <p className="text-3xl font-bold text-blue-500">
            {progressTasks}
          </p>

        </div>





        <div className="bg-white shadow rounded p-5 text-center">

          <h3 className="font-semibold">
            Completed
          </h3>

          <p className="text-3xl font-bold text-green-600">
            {completedTasks}
          </p>

        </div>





        <div className="bg-white shadow rounded p-5 text-center">

          <h3 className="font-semibold">
            Total Users
          </h3>

          <p className="text-3xl font-bold text-purple-600">
            {totalUsers}
          </p>

        </div>



      </div>







      {/* ================= CHARTS ================= */}



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">





        <div className="bg-white shadow rounded p-6">


          <h2 className="text-xl font-semibold mb-4">

            Task Status Bar Chart

          </h2>



          <Bar data={taskBarData}/>



        </div>








        <div className="bg-white shadow rounded p-6">


          <h2 className="text-xl font-semibold mb-4">

            User Growth Line Chart

          </h2>



          <Line data={userGrowthData}/>



        </div>





      </div>




    </div>


  );



}



export default Reports;