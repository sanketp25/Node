const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));


// async function updateAuthor(id){
//   const course = await Course.findById(id);
//   course.author.name = 'Mosh Fraud';
//   course.save();

// }
async function updateAuthor(courseId){
  const course = await Course.updateOne({_id:courseId},{
    $set:{
      'author.name' : 'John Doe'
    }
  })
}
updateAuthor('6635ae0791da391934a222d5')