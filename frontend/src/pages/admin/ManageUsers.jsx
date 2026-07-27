import { useEffect, useState } from "react";
import API from "../../api";


function ManageUsers() {


  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");





  useEffect(()=>{

    fetchUsers();

  },[]);






  const fetchUsers = async()=>{


    try{


      const res = await API.get("/users");


      console.log("All Users:", res.data);



      // Remove Admin users
      const normalUsers = res.data.filter(

        (user)=>

        user.role?.toLowerCase() !== "admin"

      );



      setUsers(normalUsers);



    }catch(error){


      console.log(error);


    }


  };









  const deleteUser = async(id)=>{


    if(window.confirm("Delete User?")){


      try{


        await API.delete(`/users/${id}`);


        fetchUsers();



      }catch(error){


        console.log(error);


      }


    }


  };









  const filteredUsers = users.filter((user)=>{


    const searchText = search.toLowerCase();



    return (

      user.name?.toLowerCase().includes(searchText)

      ||

      user.email?.toLowerCase().includes(searchText)

    );


  });









  return(


    <div className="p-6">



      <h1 className="text-3xl font-bold mb-6">

        Manage Users 👥

      </h1>







      <input


        type="text"


        placeholder="Search users..."


        value={search}


        onChange={(e)=>setSearch(e.target.value)}


        className="border rounded-lg p-3 w-full mb-6"

      />









      {

      filteredUsers.length === 0 ?


      (

        <p className="text-center text-gray-500">

          No Users Found

        </p>

      )

      :

      (



      <div className="grid md:grid-cols-3 gap-6">



      {


      filteredUsers.map((user)=>(



        <div


          key={user._id}


          className="bg-white shadow-lg rounded-xl p-5"


        >





          <h2 className="text-xl font-bold">

            {user.name}

          </h2>







          <p className="text-gray-600 mt-2">

            📧 {user.email}

          </p>








          <p className="mt-3">

            <b>Role:</b>{" "}


            <span className="text-blue-600 font-bold">

              USER

            </span>


          </p>








          <p className="mt-2">

            <b>Status:</b>{" "}

            Active

          </p>







          <button



            onClick={()=>deleteUser(user._id)}



            className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-lg mt-5"



          >

            Delete User

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


export default ManageUsers;