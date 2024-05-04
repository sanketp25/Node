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
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({name: 'John'})
// ]);

async function addAuthor(courseId,author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}


async function removeAuthor(courseId,authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  console.log(author)
  author.deleteOne();
  course.save();
}

//addAuthor('6635b6810a98b8f79e5e654d', new Author({name:'Amy'}))
removeAuthor('6635b6810a98b8f79e5e654d','6635b6810a98b8f79e5e654b')
// async function updateAuthor(id){
//   const course = await Course.findById(id);
//   course.author.name = 'Mosh Fraud';
//   course.save();

// }
// async function updateAuthor(courseId){
//   const course = await Course.updateOne({_id:courseId},{
//     $set:{ //use unset to unset the author or set  --> 'author': ''
//       'author.name' : 'John Doe'
//     }
//   })
// }
// updateAuthor('6635ae0791da391934a222d5')