import { useEffect, useState } from "react";


function Navbar({ role }) {


const user = JSON.parse(
    localStorage.getItem("user")
) || {};



const currentRole = (
    role || user.role || "user"
).toString().toLowerCase();


const isAdmin = currentRole === "admin";



const [time,setTime] = useState(new Date());





useEffect(()=>{


const timer = setInterval(()=>{

setTime(new Date());

},1000);



return ()=>clearInterval(timer);


},[]);







return(


<div className="

shadow-md

px-8

py-4

flex

justify-between

items-center

bg-gradient-to-r

from-blue-600

to-purple-600

text-white

">







{/* LEFT SIDE */}


<div>


<h2 className="text-2xl font-bold">


{

isAdmin

?

"Admin Dashboard 🚀"

:

"User Dashboard 🚀"

}


</h2>




<p className="text-sm text-blue-100 mt-1">


Welcome back 👋


</p>



</div>









{/* RIGHT SIDE */}


<div className="flex items-center gap-6">







{/* DATE TIME */}


<div className="text-right hidden md:block">


<p className="text-sm font-semibold">

{time.toLocaleDateString()}

</p>



<p className="text-xs text-blue-100">

{time.toLocaleTimeString()}

</p>



</div>









{/* PROFILE */}


<div className="

flex

items-center

gap-3

bg-white/20

backdrop-blur-md

px-4

py-2

rounded-xl

">





{/* AVATAR */}


<div className="

w-11

h-11

rounded-full

bg-white/20

flex

items-center

justify-center

text-xl

font-bold

">


{

user.name

?

user.name.charAt(0).toUpperCase()

:

"U"

}


</div>








<div>


<h3 className="font-semibold">


{user.name || "User"}


</h3>







<span className="

text-xs

px-3

py-1

rounded-full

bg-white/30

text-white

font-semibold

">


{

isAdmin

?

"ADMIN"

:

"USER"

}



</span>



</div>






</div>






</div>






</div>


);


}


export default Navbar;