import Course from "../models/courses.js";

export const createCourse = async (req, res) => {
   try{
    const course = await Course.create(req.body);
    return  res.status(201).json({message:"course created successfully", course});
   } catch(err){
     return res.status(400).json({error: err.message});
   }
};

export const getCourses = async (req, res) => {
  try {
    // Pagination parameters from query string
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // NEW: search parameter
    const search = req.query.search || "";

    // Pagination calculation
    const skip = (page - 1) * limit;

    // NEW: create filter once and reuse it
    const filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        {instructor:{$regex:search,$options:"i"}}
      ],
    };

    // CHANGED: use filter
     console.log("Search:", req.query.search);
    const courses = await Course.find(filter)
      .skip(skip)
      .limit(limit);

    // CHANGED: count only matching courses
    const totalCourses = await Course.countDocuments(filter);

    // NEW: useful for frontend pagination
    const totalPages = Math.ceil(totalCourses / limit);

    res.status(200).json({
      page,
      limit,
      totalCourses,
      totalPages, // NEW
      courses,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

export const getCourse = async (req, res) => {
    try{const course= await Course.findById(req.params.id);
    if(!course){
      return res.status(404).json({error: "course not found"});
       
    } 
     return res.status(200).json(course);
} catch (err){
      return res.status(400).json({error: err.message});
    };
};


export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        error: "course not found"
      });
    }

    return res.status(200).json(course);

  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        error: "course not found"
      });
    }

    return res.status(200).json({
      message: "course deleted successfully"
    });

  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};