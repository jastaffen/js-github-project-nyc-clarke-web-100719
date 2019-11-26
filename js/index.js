const userSearchUrl = "https://api.github.com/search/users?q=";
let gitHubForm = document.getElementById('github-form');
let repoList = document.getElementById('repos-list');
const userInfoList = document.getElementById('user-list');


function addUser(object) {
    
    
    let userHTML = `
    <li><h3>${object.login}</h3></li>
    <li><img src=${object.avatar_url}></li>
    <li><a href=${object.url}>User Repos</a></li>
    <li><button data-id=${object.login}>See Repos!</button></li>
    <hr>`
    
    userInfoList.insertAdjacentHTML('beforeend', userHTML);
    
}

userInfoList.addEventListener('click', function(event){
    if (event.target.localName === 'button') {
        fetchRepos(event.target.dataset.id)
    }
})
   

function addRepo(repo) {
    let repoList = document.getElementById('repos-list');
    repoList.innerHTML += `<li>${repo.name}</li>`
}

function fetchRepos(object){
    console.log(`https://api.github.com/users/${object}/repos`);
    fetch(`https://api.github.com/users/${object}/repos`,{
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(repos){
        repoList.innerHTML = "";
        repos.forEach(function(repo){
            addRepo(repo)
        })
    })
}


document.addEventListener('DOMContentLoaded', function(event){
    gitHubForm.addEventListener('click', function(event){
        event.preventDefault();
        if (event.target.id === 'submit') {
            let query = document.getElementById('search');
            console.log(`${userSearchUrl}` + `${query.value}`)
            fetch(userSearchUrl + `${query.value}`, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.github.v3+json"
                }
            })
            .then(function(response){
                return response.json()
            })
            .then(function(user){
                let itemsArr = user.items
                addUser(itemsArr[0])
            })
        }
    })
})


