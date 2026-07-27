import { useEffect, useState } from "react";


function Profile(){


const [user,setUser] = useState({});



useEffect(()=>{


const loggedUser = JSON.parse(
    localStorage.getItem("user")
) || {};

setUser(loggedUser);



},[]);







return(


<div className="max-w-xl bg-white p-6 rounded-xl shadow-lg">


<h2 className="text-2xl font-bold mb-6">

👤 My Profile

</h2>





<div className="space-y-4">



<div>

<p className="text-gray-500">

Name

</p>

<p className="text-lg font-semibold">

{user.name || "N/A"}

</p>

</div>






<div>

<p className="text-gray-500">

Email

</p>

<p className="text-lg font-semibold">

{user.email || "N/A"}

</p>

</div>







<div>

<p className="text-gray-500">

Role

</p>

<p className={

user.role === "admin"

?

"text-lg font-bold text-red-600"

:

"text-lg font-bold text-blue-600"

}>

{user.role || "user"}

</p>

</div>







<div>

<p className="text-gray-500">

Status

</p>

<p className="text-lg font-bold text-green-600">

🟢 Active

</p>

</div>






</div>






</div>


);


}


export default Profile;