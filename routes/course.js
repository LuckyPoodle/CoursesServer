import express from "express";
import formidable from "express-formidable";
const router = express.Router();

//middleware
import { isInstructor, requireSignin,isEnrolled } from "../middlewares";

// controllers
import { uploadImage,removeImage,create,readSingleCourse,uploadVideo,removeVideo,addLesson,updateCourse,removeLesson,updateLesson,
publishCourse,unpublishCourse,courses, freeEnrollment,checkEnrollment,paidEnrollment,stripeSuccess,userCourses,markCompleted,listCompleted,markInCompleted
} from "../controllers/course";

//image
router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image",removeImage);

//course
router.post('/course/create',requireSignin,isInstructor,create);
router.get('/course/:slug',readSingleCourse);
router.get('/courses',courses)


//     `/api/course/remove-video/${values._id}`,

// video
router.post(
    "/course/upload-video/:instructorId",
    requireSignin,
    formidable({ maxFileSize: 500 * 1024 * 1024 }),
    uploadVideo
  );
router.post("/course/remove-video/:instructorId", requireSignin, removeVideo);

router.put("/course/:slug",requireSignin,updateCourse);



//publish unpublish
router.put("/course/publish/:courseId",requireSignin,publishCourse);
router.put("/course/unpublish/:courseId",requireSignin,unpublishCourse);


///lessons
router.put("/course/:slug/:lessonId",requireSignin,removeLesson)
router.post("/course/lesson/:courseId",requireSignin,addLesson);
router.put("/course/lesson/:courseId/:lessonId", requireSignin, updateLesson);



router.post('/free-enrollment/:courseId',requireSignin,freeEnrollment);
router.post('/paid-enrollment/:courseId',requireSignin,paidEnrollment);
router.get("/check-enrollment/:courseId", requireSignin,checkEnrollment);
router.get("/stripe-payment-success/:courseId",requireSignin,stripeSuccess)

router.get('/user-courses',requireSignin,userCourses);

router.get('/user/course/:slug',requireSignin,isEnrolled, readSingleCourse)

router.post('/mark-completed',requireSignin,markCompleted);
router.post('/mark-incompleted',requireSignin,markInCompleted);
router.post('/list-completed',requireSignin,listCompleted);


module.exports = router;
