const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground') //returns a promise
.then(() => console.log('Conntected to MongoDB'))
.catch((err) => console.error("Not connected because of: ",err) );

//Created a schema

const courseSchema = mongoose.Schema({
    name: String,
    author:String,
    tags: [String],
    date: {type:Date,default:  Date.now},
    isPublished:Boolean

});

//compiled to a model
const Course = mongoose.model('Courses',courseSchema);  //creates a class



//creating an async function to store the data in the mongodb database.
async function createCourse(){
    const course = new Course({
        name: 'Ace',
        author:'Mosh',
        tags:['Angular.js','Frontend'],
        isPublished:true
    });

    const result = await course.save();
    console.log('Result: ',result)

}
// createCourse()


async function getCourses(){
    // const courses = await Course.find();
    // console.log(courses);
    const coursesByFilter = await Course
    //.find({price: { $gte: 10, $lte:20}})   // add >= and <= 
    //.find({price: {$in: [10,15,20]}})
    .find({author:'Mosh',isPublished:true})
    .or({author:'Mosh'}, {isPublished:true})
    .limit(10)
    .sort({name : 1}) //sort by column; 1 is asc, -1:desc
    .select({name:1,tags:1}); //get the name and tag
    //.count();
    console.log(coursesByFilter);
}


getCourses()
//updating course using id by query first method
async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course){
        return;
    }
    course.isPublished = false;
    const result = await Course.save();
    console.log(result);
}

//anothermedthod
async function updateCourseByAnotherMethod(id){
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author:'Jack',
            isPublished:false
        }
    },{new:true});
    console.log(course);
    // course.isPublished = false;

}

async function removeCourse(id){
    //const result =await Course.deleteOne({_id: id}); //delete many  --> first way
    const result = await Course.findByIdAndDelete(id) //returns null if not found
}




