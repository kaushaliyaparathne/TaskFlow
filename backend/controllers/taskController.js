const createTask = async(req,res)=>{

try{


const task = await Task.create({

    title:req.body.title,

    description:req.body.description,

    date:req.body.date,

    time:req.body.time,

    status:req.body.status || "Pending",

    user:req.user.id

});


res.json(task);



}catch(error){

res.status(500).json({
message:error.message
});

}


};