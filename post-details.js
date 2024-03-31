//відхопила інформацію та створила url
let postId = new URL(location.href).searchParams.get('postId');
let postUrl = `https://jsonplaceholder.typicode.com/posts/` + postId;
let commentsUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

//знову функція з fetch))
function fetchFn(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(elements => callback(elements));
}

/*а странице post-details.html:
7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .*/

//логіка відповідно до завдання
function getInfoAboutPost(post) {
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

/*8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.*/

//логіка відповідно до завдання:
function getComments(comments) {
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

//ще вирішила додатково зробити кнопку для зручного повернення до всіх юзерів і в той же час поюзати setTimeout
setTimeout(function () {
    let postDetails = document.getElementsByClassName('postDetails')[0];
    let returnButton = document.createElement('button');
    postDetails.appendChild(returnButton);
    returnButton.innerText = 'return to all users';
    returnButton.classList.add('returnButton');
    returnButton.addEventListener('click', ()=>{
        location.href = 'index.html';
    });
}, 5000)
