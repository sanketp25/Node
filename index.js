console.log('Before');
getUser(1,(user) => {
    console.log('User',user);
    getRepo(user.gitHubUsername,(repo) => {
        console.log('Repos: ',repo.repos)
    });
});
console.log('After');


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