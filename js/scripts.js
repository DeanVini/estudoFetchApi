const BASE_URL = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.getElementById("loading");
const postsContainer  = document.getElementById("posts-container");

const commentForm = document.getElementById("comment-form"); 
const emailForm = document.getElementById("email");
const bodyForm = document.getElementById("body");

const ID = window.location.search.substring(1).split('')[3];
const postContainer  = document.getElementById("post-container");

function createElmByJson (json, mainContainer){
    if(!ID){
        json.map((post) => {
            const postDiv = document.createElement("div");
            const postTitle = document.createElement("h1");
            const postBody = document.createElement("p");
            const postLink = document.createElement("a");

            postTitle.innerText = post.title;
            postBody.innerText = post.body;
            postLink.innerText = "ler mais..."
            postLink.setAttribute("href", `post.html?id=${post.id}`);
        
            postDiv.appendChild(postTitle);
            postDiv.appendChild(postBody);
            postDiv.appendChild(postLink);
        
            mainContainer.appendChild(postDiv);
        });
    } else {
        const postDiv = document.createElement("div");
        const postTitle = document.createElement("h1");
        const postBody = document.createElement("p");

        postTitle.innerText = json.title;
        postBody.innerText = json.body;
        
        postDiv.appendChild(postTitle);
        postDiv.appendChild(postBody);
        
        mainContainer.appendChild(postDiv);
    }
}

function showComments(json, mainContainer){
    json.map((comment) => {
        const commentDiv = document.createElement("div");
        const email = document.createElement("h3");
        const body = document.createElement("p");

        email.innerText = comment.email;
        body.innerText = comment.body;
        
        commentDiv.appendChild(email);
        commentDiv.appendChild(body);
        
        mainContainer.appendChild(commentDiv);
    });
}

async function getAllPosts(){

    loadingElement.classList.add("hide");

    const response = await fetch(BASE_URL);

    const responseToJson = await response.json();

    createElmByJson(responseToJson, postsContainer);
}

async function getPostById(){
    const commentElement = document.getElementById("comments");
    const goBackElement = document.getElementById("post");
    const commentsContainer = document.getElementById("comments-container");

    const response = await fetch(`${BASE_URL}/${ID}`);
    const comments = await fetch(`${BASE_URL}/${ID}/comments`);

    const responseToJson = await response.json();
    const commentsJson = await comments.json();

    console.log(commentsJson);

    loadingElement.classList.add("hide");

    createElmByJson(responseToJson, postContainer);

    commentElement.classList.remove("hide");
    goBackElement.classList.remove("hide");

    showComments(commentsJson, commentsContainer);
}

function formToJson(){
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let comment = {
            email: emailForm.value,
            body: bodyForm.value
        }

        comment = JSON.stringify(comment);

        postComment(comment);
        
    });
}

function createComment(comment) {
    const commentsContainer = document.getElementById("comments-container");
    const div = document.createElement("div");
    const email = document.createElement("h3");
    const commentBody = document.createElement("p");
  
    email.innerText = comment.email;
    commentBody.innerText = comment.body;
  
    div.appendChild(email);
    div.appendChild(commentBody);
    commentsContainer.appendChild(div);
  }

async function postComment(comment){
    
    const response = await fetch(`${BASE_URL}/${ID}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "content-type" : "application/json"
        }
    });

    const data = await response.json();

    createComment(data);
}

if(!ID){
    getAllPosts();
}
else{
    getPostById();
    formToJson();
    
}




