//url для отримання юзерів
let usersUrl = 'https://jsonplaceholder.typicode.com/users';


/*1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
* тут створила функцію з колбеком, щоб використовувати для отримання обєктів з url
* хотіла використовувати цю функцію у всіх наступних файлах, але достеменно не розібралася як це зробити, не хотіла
* робити костилі, тому просто переписувала її в інших файлах*/
function fetchFn (url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(elements => callback(elements));
}



/*В index.html
2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
котра має детальну інфорацію про об'єкт на який клікнули
Стилизація проєкта -
index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
власне фунуція для цієї логіки: */
function getUsers (users){
    let usersDiv = document.getElementsByClassName('users')[0];
    usersDiv.classList.add('flexSpaceEv');
    for (const user of users) {
        let userDiv = document.createElement('div');
        let userP = document.createElement('p');
        let userB = document.createElement('button');
        userB.classList.add('button');
        userDiv.classList.add('user', 'flexSpaceEv');
        userP.innerText = user.id +' ' + user.name;
        userB.innerText = 'more about user';
        userB.addEventListener('click', ()=>{
            location.href = 'user-details.html?userId='+user.id;
        })
        userDiv.append(userP, userB);
        usersDiv.appendChild(userDiv);
    }
}
fetchFn(usersUrl, getUsers);