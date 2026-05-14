const Student=require("../models/Student");


exports.createStudent=async(req,res)=>{

    try{

        const student=new Student(req.body);

        await student.save();

        res.json({
            message:"student added successfully",
            student
        });

    }

    catch(e){

        res.status(500).json({
            message:e.message
        });

    }

};



exports.getStudents=async(req,res)=>{

    try{

        const students=await Student.find();

        res.json(students);

    }

    catch(e){

        res.json({
            message:e.message
        });

    }

};



exports.getStudentById=async(req,res)=>{

    try{

        const student=await Student.findById(
            req.params.id
        );

        res.json(student);

    }

    catch(e){

        res.json({
            message:e.message
        });

    }

};



exports.updateStudent=async(req,res)=>{

    try{

        const student=
        await Student.findByIdAndUpdate(

            req.params.id,
            req.body,
            {new:true}

        );

        res.json({
            message:"student updated",
            student
        });

    }

    catch(e){

        res.json({
            message:e.message
        });

    }

};



exports.deleteStudent=async(req,res)=>{

    try{

        await Student.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:"student deleted"
        });

    }

    catch(e){

        res.json({
            message:e.message
        });

    }

};