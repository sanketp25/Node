
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });
async function sendCustomerEmail(){
  const customer = await getCustomer(1)
  console.log(customer);
  if(customer.isGold){
    const movies = await getTopMovies();
    console.log(movies);
    const mail = await sendEmail(customer.email,movies);
    console.log('Mailed');
  }
}

sendCustomerEmail();
function getCustomer(id) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 2000); 
  })
}

function getTopMovies(callback) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 2000);
  })
}

function sendEmail(email, movies, callback) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);

  })
}