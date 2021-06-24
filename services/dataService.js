const db = require('./db')

  const login=(req,phoneNumber,password)=> {
  return db.User.findOne({phoneNumber,password})
  .then(user=>{
    if(user){
       req.session.currentUser=user.phoneNumber;     
      return{
        statusCode:200,
           status:true,
           message:"successfully login",
           name:user.username,
           number:user.phoneNumber
       }
    }
    else{
      return{
        statusCode:422,
          status:false,
          message:"Invalid credentials"
      }
    }
  })
  }
 
  const register=(phoneNumber,username,password)=>{
    return db.User.findOne({phoneNumber})
    .then(user=>{
      if(user){
     return {
       statusCode:422,
       status:false,
       message:"User exist"
     }
   }
     else{
      const newUser=new db.User({
         phoneNumber,
         username,
         password,
       })
       newUser.save();
    return{
     statusCode:200,
        status:true,
        message:"successfully registered"
    }
     }
    })
 }
 const addTodo=(req,todos,phoneNumber)=>{
  return db.User.findOne({phoneNumber})
  .then(user=>{
     if(user){
      user.todo.push({todo:todos})
      user.save()
      return{
          statusCode:200,
          status:true,
          message:"saved",  
      }
      }
      else{
          return{
          statusCode:422,
          status:false,
          message:"login again"
      }
    }
  })
 }

 const displayTodo=(req,phoneNumber)=>{
  return db.User.findOne({phoneNumber})
  .then(user=>{
      if(user){
        return{
          statusCode:200,
          status:true,
          message:user.todo,
          
      }
    }
    else{
      return{
        statusCode:422,
        status:false,
        message:"can't get"
    }
    }
  })

}

 module.exports={
  register,
  login,
  addTodo,
  displayTodo
}