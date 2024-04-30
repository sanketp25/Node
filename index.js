//Asynchronous Functions => Callbacks


//this function is called callback hell because of multiple callbacks.
console.log('Before');
getUser(1)
.then((user) => getRepo(user.gitHubUsername))
.then((repo) => console.log(repo.repos))
.catch(error => console.log(error.message));

// getUser(1,getRepositories);
console.log('After');


// function getRepositories(user){
//     console.log('User',user);
//     getRepo(user.gitHubUsername,displayRepo);
// }

function displayRepo(repo){
    console.log('Repos: ',repo.repos);
}


function getUser(id){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Getting User...');
            resolve({id: id, gitHubUsername: 'mosh'});
        },2000);
    });
}

function getRepo(name){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Getting Repos...');
            resolve({name:name,repos: ['repo1','repo2','repo3']});
        },2000);
    })
}