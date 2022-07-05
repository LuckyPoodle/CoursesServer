import expressJwt from "express-jwt";
import Course from "../models/course";
import User from '../models/user';
//check token in headers, verify with the sequence we use to generate the token
//check the jwt token from req.headers and if its valid, it extracts the _id property that you use while creating token and put in the req.user so that u can easily access _id using req.user_id
export const requireSignin = expressJwt({
  //here it requires the token from the req.cookies.token 
  
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const isInstructor=async(req,res,next)=>{
  try{
    const user=await User.findById(req.user._id).exec();
    if (!user.role.includes('Instructor')){
      return res.sendStatus(403);
    }else{

      next();

    }

  }catch(err){
    console.log(err);
  }
};

export const isEnrolled=async(req,res,next)=>{

  try{

    console.log("IN MIDDLEWARE ISENROLLED")

    const user=await User.findById(req.user._id).exec();

    const course=await Course.findOne({slug:req.params.slug}).exec();

    //check if course id is found in user's course array

    let ids=[];

    ////here the user.courses is only ids 
    for (let i=0; i<user.courses.length;i++){
      console.log('ITERATING USERCOURSES =>');
      console.log(user.courses[i]);

      ids.push(user.courses[i].toString());

    };

    if (!ids.includes(course._id.toString())){
      console.log('NOT A STUDENT OF THIS COURSE')
      res.sendStatus(403);
    }else{
      next();
    }


  }catch(err){  

    console.log(err)

  }






}