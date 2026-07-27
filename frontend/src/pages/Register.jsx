import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";


function Register() {

  const navigate = useNavigate();


  const [user, setUser] = useState({
    name:"",
    email:"",
    password:""
  });



  const register = async (e) => {

    e.preventDefault();

    try {

      await API.post("/users/register", user);


      alert("Registration Successful");


      navigate("/login");


    } catch(error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message || 
        "Registration Failed"
      );

    }

  };



  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-r
      from-purple-500
      to-blue-600
      px-4
    ">


      <div className="
        bg-white
        w-full
        max-w-md
        p-8
        rounded-2xl
        shadow-2xl
      ">


        <h1 className="
          text-3xl
          font-bold
          text-center
          text-gray-800
          mb-2
        ">
          Create Account ✨
        </h1>


        <p className="
          text-center
          text-gray-500
          mb-6
        ">
          Join Task Management System
        </p>



        <form onSubmit={register}>


          <label className="
            text-sm
            font-medium
            text-gray-700
          ">
            Full Name
          </label>


          <input

            type="text"

            placeholder="Enter your name"

            value={user.name}

            onChange={(e)=>
              setUser({
                ...user,
                name:e.target.value
              })
            }


            className="
              w-full
              mt-2
              mb-4
              px-4
              py-3
              border
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "

          />




          <label className="
            text-sm
            font-medium
            text-gray-700
          ">
            Email
          </label>


          <input

            type="email"

            placeholder="Enter your email"

            value={user.email}

            onChange={(e)=>
              setUser({
                ...user,
                email:e.target.value
              })
            }


            className="
              w-full
              mt-2
              mb-4
              px-4
              py-3
              border
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "

          />




          <label className="
            text-sm
            font-medium
            text-gray-700
          ">
            Password
          </label>


          <input

            type="password"

            placeholder="Create password"

            value={user.password}

            onChange={(e)=>
              setUser({
                ...user,
                password:e.target.value
              })
            }


            className="
              w-full
              mt-2
              mb-6
              px-4
              py-3
              border
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "

          />




          <button

            type="submit"

            className="
              w-full
              bg-purple-600
              text-white
              py-3
              rounded-xl
              font-semibold
              hover:bg-purple-700
              transition
              duration-300
              shadow-md
            "

          >
            Register
          </button>



        </form>




        <p className="
          text-center
          text-gray-500
          mt-6
        ">

          Already have an account?

          <span

            onClick={()=>navigate("/login")}

            className="
              text-purple-600
              cursor-pointer
              ml-1
              font-semibold
            "

          >
            Login
          </span>

        </p>



      </div>


    </div>

  );

}


export default Register;