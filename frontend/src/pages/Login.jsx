import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


function Login(){


const navigate = useNavigate();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);





const handleLogin = async(e)=>{


e.preventDefault();



if(!email || !password){

alert("Please enter email and password");

return;

}



try{


setLoading(true);



const res = await API.post("/users/login",{

email,

password

});




localStorage.setItem(
"token",
res.data.token
);



localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);





const user = res.data.user;



if(user.role==="admin"){

navigate("/admin/dashboard");

}

else{

navigate("/dashboard");

}



}catch(error){


console.log(error.response?.data);


alert(
error.response?.data?.message ||
"Login Failed"
);


}
finally{

setLoading(false);

}



};







return(


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

Welcome Back 🚀

</h1>



<p className="
text-center
text-gray-500
mb-6
">

Login to Task Management System

</p>







<form onSubmit={handleLogin}>


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


value={email}


onChange={(e)=>setEmail(e.target.value)}


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

placeholder="Enter your password"


value={password}


onChange={(e)=>setPassword(e.target.value)}


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


disabled={loading}


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


{

loading

?

"Logging in..."

:

"Login"

}


</button>





</form>








<p className="
text-center
text-gray-500
mt-6
">


Don't have an account?


<span


onClick={()=>navigate("/register")}


className="
text-purple-600
cursor-pointer
ml-1
font-semibold
"


>

Register

</span>


</p>





</div>



</div>



);


}


export default Login;