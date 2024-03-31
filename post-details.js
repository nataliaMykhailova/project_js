/*а странице post-details.html:
7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)*/
let postId = new URL(location.href).searchParams.get('postId');
console.log(postId);
let postUrl = `https://jsonplaceholder.typicode.com/posts/`+postId;
let commentsUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
function fetchFn(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(elements => callback(elements));
}
function getInfoAboutPost (post){
    let postDetails = document.getElementsByClassName('postDetails')[0];
    postDetails.classList.add('flexSpaceEv');
    let postUl = document.createElement('ul');
    for (const key in post) {
        let postLi = document.createElement('li');
        postLi.innerText = `${key}: ${post[key]}`;
        postLi.classList.add('li');
        postUl.appendChild(postLi);
        postDetails.appendChild(postUl);
    }
}
function getComments (comments){
let commentsDiv = document.getElementsByClassName('comments')[0];
commentsDiv.classList.add('flexSpaceEv');
let h1 = document.createElement('h1');
commentsDiv.appendChild(h1);
        for (const comment of comments) {
        let commentDiv = document.createElement('div');
        let commentUl = document.createElement('ul');
        commentDiv.classList.add('flexSpaceEv');
            for (const commentKey in comment) {
            let commentLi = document.createElement('li');
            commentLi.innerText = `${commentKey}: ${comment[commentKey]}`;
            commentLi.classList.add('li');
            commentUl.appendChild(commentLi);
            commentDiv.appendChild(commentUl);
            }
            commentsDiv.appendChild(commentDiv);
        }
}
fetchFn(postUrl, getInfoAboutPost);
fetchFn(commentsUrl, getComments);