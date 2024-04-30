//Asynchronous Functions => Callbacks


//this function is called callback hell because of multiple callbacks.
console.log('Before');
getUser(1,getRepositories);
console.log('After');
function getRepositories(user){
    console.log('User',user);
    getRepo(user.gitHubUsername,displayRepo);
}

function displayRepo(repo){
    console.log('Repos: ',repo.repos);
}

function getUser(id,callback){
    setTimeout(() => {
        console.log('Getting User...');
        callback({id: id, gitHubUsername: 'mosh'});
    },2000);
}

function getRepo(name,callback){
    setTimeout(() => {
        console.log('Getting Repos...');
        callback({name:name,repos: ['repo1','repo2','repo3']});
    },2000);
}