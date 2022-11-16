(async function(){
    const tablebody=document.querySelector('tbody');
    let users =await fetch('https://jsonplaceholder.typicode.com/users');
    users = await users.json();
    console.log(users);
    for(let i=0 ;i< users.length;i++){
    const tr = document.createElement('tr');
    tr.setAttribute('class','tr');  
    tr.innerHTML=`
    <td class="name">${users[i].name}</td>
    <td class="email">${users[i].email}</td>
    <td class="phone">${users[i].phone}</td>
    <td class="website">${users[i].website}</td>
    <td class="company">${users[i].company.name}</td>
    `
    tr.addEventListener('click',()=>{
        document.cookie=`userId=${users[i].id};path=/`;
        window.location.assign(`posts.html?userId=${users[i].id}`);
    })
    tablebody.append(tr);
    
}
})();