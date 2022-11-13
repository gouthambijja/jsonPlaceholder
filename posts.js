const url = new URL(window.location.href);
        const params = url.searchParams;
        const id = params.get('userId');
        (async()=>{
            let posts=await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            posts = await posts.json();
            for(let post of posts){
                let comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                comments = await comments.json();
                const postCard = document.createElement('div');
                postCard.setAttribute('class','postCard')
                let postCardHtml = `<span class="save-changes"><i class="far fa-save"></i></span>
`;
                postCardHtml+=`
                <input type="checkbox" id = ${post.id}>
                <label for=${post.id}><div class="post-content">
                <div class="post-body"><div class="post-title"> ${post.title}</div>${post.body}</div></div></label><div class="comments"><span class="comments-btn" ><i class="icon fa-solid fa-comment comment-icon"></i></span><span class="icons" "><i class="fa-regular fa-square-check check icon"></i></i><i class="fa-regular fa-square icon no-check"></i> <i class="fa-solid fa-pen-to-square icon edit"></i> <i class="icon fa fa-trash delete" aria-hidden="true"></i> </span><div class="comments-set">`             
                for(let i = comments.length - 1  ; i > comments.length-4 ; i--){
                    postCardHtml+=`<div class= "comment"><div class="comments-name">${comments[i].name}</div>
                    <div class="comments-body">${comments[i].body}</div>
                    <div class="comments-email">-${comments[i].email}</div></div>
                    `
                }
                postCardHtml+='</div>'
                postCard.innerHTML=postCardHtml;
                document.querySelector('.container-2').append(postCard);
            }
            const commentsBtn = document.querySelectorAll('.comments-btn');
            const comments = document.querySelectorAll('.comments-set');
            const postdiv = document.querySelectorAll('.post-content');
            const postchecked = document.querySelectorAll('input[type = checkbox');
            const postContainer = document.querySelectorAll('.postCard');
            const deleteBtn = document.querySelectorAll('.delete');
            const editBtn = document.querySelectorAll('.edit');
            const postBody = document.querySelectorAll('.post-body');
            const postTitle = document.querySelectorAll('.post-title');
            let deleteArray = [];
            const deleteAll = document.querySelector('.delete-all');
            const saveBtn = document.querySelectorAll('.save-changes');
            const input = document.querySelectorAll(`input[type = "checkbox"]`);
            for(let i=0 ;i< commentsBtn.length ; i++){
                editBtn[i].addEventListener('click',()=>{
                    input[i].disabled = true;
                    saveBtn[i].style.display = "inline";
                    postBody[i].contentEditable=true;
                    postBody[i].contentEditable=true;
                })
                saveBtn[i].addEventListener('click',()=>{
                    input[i].disabled = false;
                    saveBtn[i].style.display ="none";
                    postBody[i].contentEditable=false;
                    postBody[i].contentEditable=false;

                })
                postchecked[i].addEventListener('change',()=>{
                    if(postchecked[i].checked == true){
                        deleteArray.push(postContainer[i]);   
                    }else{
                        deleteArray.splice(deleteArray.indexOf(postContainer[i]),1);   
                    }
                })
                deleteBtn[i].addEventListener('click',(e)=>{
                    const deleteItem = e.target.parentElement.parentElement.parentElement;
                    deleteArray.splice(deleteArray.indexOf(deleteItem),1);
                    if(confirm(`Are you sure you want to delete the selected file?`))deleteItem.remove();
                })
                commentsBtn[i].addEventListener('click',(e)=>{
                    const backCoverDiv = document.createElement('div');
                    backCoverDiv.setAttribute('class','back-cover-div');
                    const postTitleBody = postdiv[i].cloneNode(true);
                    postTitleBody.setAttribute('class','post-title-body')
                    const hiddenCtnr = document.createElement('div');
                    hiddenCtnr.setAttribute('class','hiddenCtnr');
                    hiddenCtnr.append(postTitleBody);
                    hiddenCtnr.append(comments[i]);
                    backCoverDiv.append(hiddenCtnr);
                    backCoverDiv.addEventListener('click',(e)=>{
                        if(e.target === backCoverDiv || e.target ===hiddenCtnr){
                            backCoverDiv.remove();
                        }
                    })
                    comments[i].style.display = "inline-block";
                    comments[i].style.maxWidth = "350px";
                    document.body.append(backCoverDiv);
                })
            }      
                 deleteAll.addEventListener('click',()=>{
                    const deleteFlag = confirm(`Are you sure you want to delete ${deleteArray.length} selected files?`);
                    if(deleteArray.length > 0 && deleteFlag){
                    for(let postcard of deleteArray){
                        if(postcard)postcard.remove();
                    }
                    deleteArray=[];
                    }
                })       
        })();