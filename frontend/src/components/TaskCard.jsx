function TaskCard({ task, updateStatus, deleteTask }) {

  return (

    <div className="
  bg-gradient-to-br
  from-purple-50
  to-blue-50
  rounded-2xl
  shadow-lg
  p-6
  border
  border-purple-200
  hover:shadow-xl
  transition
  duration-300
">


      {/* Task Title */}

      <h3 className="
        text-xl
        font-bold
        text-gray-800
        mb-3
      ">
        {task.title}
      </h3>





      {/* Description */}

      <p className="
        text-gray-600
        mb-4
      ">

        <span className="
          font-semibold
          text-gray-800
        ">
          Description:
        </span>

        {" "}

        {task.description || "No description"}

      </p>






      {/* Status Badge */}

      <div className="mb-5">


        <span className="
          font-semibold
          text-gray-800
        ">
          Status:
        </span>



        <span
          className={`
            ml-2
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold

            ${
              task.status === "Completed"
              ?
              "bg-blue-100 text-blue-700"
              :
              "bg-purple-100 text-purple-700"
            }

          `}
        >

          {task.status}

        </span>


      </div>








      {/* Buttons */}

      <div className="
        flex
        gap-3
      ">



        {task.status === "Pending" && (


          <button

            onClick={() => updateStatus(task)}

            className="
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              px-4
              py-2
              rounded-xl
              font-semibold
              hover:from-blue-700
              hover:to-purple-700
              transition
              shadow-md
            "

          >

            ✓ Mark Completed

          </button>


        )}







        <button

          onClick={() => deleteTask(task._id)}

          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-xl
            font-semibold
            hover:bg-red-600
            transition
          "

        >

          🗑 Delete

        </button>




      </div>



    </div>

  );

}


export default TaskCard;