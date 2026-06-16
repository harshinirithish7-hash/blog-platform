let posts = JSON.parse(localStorage.getItem("posts")) || [];

displayPosts();

function addPost(){

let title = document.getElementById("title").value;
let content = document.getElementById("content").value;

if(title==="" || content===""){
alert("Please fill all fields");
return;
}

posts.push({
title:title,
content:content,
comments:[]
});

saveData();

document.getElementById("title").value="";
document.getElementById("content").value="";
}

function saveData(){
localStorage.setItem("posts",JSON.stringify(posts));
displayPosts();
}

function displayPosts(){

let container=document.getElementById("blogContainer");
container.innerHTML="";

posts.forEach((post,index)=>{

let commentsHTML="";

post.comments.forEach(comment=>{
commentsHTML += `<div class="comment">${comment}</div>`;
});

container.innerHTML += `
<div class="blog">

<h2>${post.title}</h2>

<p>${post.content}</p>

<div class="actions">
<button class="edit" onclick="editPost(${index})">Edit</button>
<button class="delete" onclick="deletePost(${index})">Delete</button>
</div>

<div class="comment-input">
<input type="text" id="comment${index}" placeholder="Write a comment">
<button class="comment-btn"
onclick="addComment(${index})">
Comment
</button>
</div>

<div>
${commentsHTML}
</div>

</div>
`;
});
}

function deletePost(index){
posts.splice(index,1);
saveData();
}

function editPost(index){

let newTitle = prompt("Edit Title",posts[index].title);
let newContent = prompt("Edit Content",posts[index].content);

if(newTitle && newContent){
posts[index].title=newTitle;
posts[index].content=newContent;
saveData();
}
}

function addComment(index){

let comment=document.getElementById(`comment${index}`).value;

if(comment===""){
alert("Enter comment");
return;
}

posts[index].comments.push(comment);

saveData();
}