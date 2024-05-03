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
    .find({author:'Mosh',isPublished:true})
    .limit(10)
    .sort({name : 1})
    .select({name:1,tags:1});
    console.log(coursesByFilter);
}

getCourses()