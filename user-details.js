/*
user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
блоки з короткою іфною про post - в ряд по 5 .
*/
//відхопила інформацію та створила url
let userId = new URL(location.href).searchParams.get('userId');
let userUrl = 'https://jsonplaceholder.typicode.com/users/' + userId;
let postsUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;


//та сама функція з колбеком що й в минулому файлі
function fetchFn(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(elements => callback(elements));
}
/*/*На странице user-details.html:
4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
(для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)*/
//логіка відповідно до завдання:
function getInfoAboutUser(user) {
    let userInfo = document.getElementsByClassName('userInfo')[0];
    let ul = document.createElement('ul');
    for (const key in user) {
        let li = document.createElement('li');
        if (typeof user[key] === 'object') {
            li.innerText = `${key}: `;
            li.classList.add('li');
            ul.appendChild(li);
            let ulKey = getInfoAboutUser(user[key]);
            li.appendChild(ulKey);
        } else {
            li.innerText = `${key}: ${user[key]}`;
            li.classList.add('li');
            ul.appendChild(li);
        }
    }
    userInfo.appendChild(ul);
    return ul;
}

fetchFn(userUrl, getInfoAboutUser);

/*6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра
має детальну інфу про поточний пост.*/
//логіка відповідно до завдання:
let userPosts = document.createElement('div');
document.getElementsByClassName('getPosts')[0].onclick = function () {
    userPosts.innerHTML = '';
    userPosts.classList.add('userPosts', 'flexSpaceEv');
    fetch(postsUrl)
        .then(response => response.json())
        .then(posts => {
            for (const post of posts) {
                let postDiv = document.createElement('div');
                let postP = document.createElement('p');
                let buttonPost = document.createElement('button');
                buttonPost.classList.add('button');
                postDiv.classList.add('flexSpaceEv');
                buttonPost.addEventListener('click', () => {
                    location.href = 'post-details.html?postId=' + post.id;
                })
                postP.innerText = post.title;
                buttonPost.innerText = 'more about post';
                postDiv.append(postP, buttonPost);
                userPosts.appendChild(postDiv);
            }
            document.body.appendChild(userPosts);
        });
}