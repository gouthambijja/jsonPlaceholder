const url = new URL(window.location.href);
        const params = url.searchParams;
        const id = params.get('userId');
        const deleteCount = document.querySelector('.count');
        (async()=>{
            let posts=await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            posts = await posts.json();
            const container2 = document.querySelector('.container-2');
            for(let post of posts){
                const postCard = document.createElement('div');
                postCard.setAttribute('class','postCard')
                let postCardHtml = ``;
                postCardHtml+=`
                <input type="checkbox" id = ${post.id}>
                <label for=${post.id}><div class="post-content">
                <div class="post-body"><div class="post-title"> ${post.title}</div><div class="post-body-des"</div> ${post.body}</div></div></div></label><div class="comments"><span class="comments-btn" ><i class="icon fa-solid fa-comment comment-icon"></i></span><span class="icons" "><i class="fa-regular fa-square-check check icon"></i></i><i class="fa-regular fa-square icon no-check"></i> <i class="fa-solid fa-pen-to-square icon edit"></i><i class="far fa-save icon save-changes"></i> <i class="icon fa fa-trash delete" aria-hidden="true"></i> </span><div class="comments-set">`             
                
                postCardHtml+='</div>'
                postCard.innerHTML=postCardHtml;
                container2.append(postCard);
            }
            const commentsBtn = document.querySelectorAll('.comments-btn');
            const comments = document.querySelectorAll('.comments-set');
            const postdiv = document.querySelectorAll('.post-content');
            const postchecked = document.querySelectorAll('input[type = checkbox');
            const postContainer = document.querySelectorAll('.postCard');
            const deleteBtn = document.querySelectorAll('.delete');
            const editBtn = document.querySelectorAll('.edit');
            const postBody = document.querySelectorAll('.post-body-des');
            const postTitle = document.querySelectorAll('.post-title');
            let deleteArray = [];
            const deleteAll = document.querySelector('.delete-all');
            const saveBtn = document.querySelectorAll('.save-changes');
            const input = document.querySelectorAll(`input[type = "checkbox"]`);
            const check = document.querySelectorAll('.check');
            const noCheck = document.querySelectorAll('.no-check')
            const checkfunc = ()=>{
                if(deleteArray.length){
                    deleteAll.style.display="inline";
                    deleteCount.innerHTML=deleteArray.length;
                }
                else deleteAll.style.display = "none"
            }
            for(let i=0 ;i< commentsBtn.length ; i++){
                editBtn[i].addEventListener('click',()=>{
                    input[i].disabled = true;
                    editBtn[i].style.display = "none";
                    console.log(saveBtn[i]);
                    saveBtn[i].style.display = "inline";
                    postTitle[i].contentEditable=true;
                    postBody[i].contentEditable=true;
                })
                saveBtn[i].addEventListener('click',()=>{
                    fetch(`https://jsonplaceholder.typicode.com/posts/${i+1}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: i,
                            title: postTitle[i].innerText,
                            body: postBody[i].innerText,
                            userId: id,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                        })
                        .then((response) => response.json())
                        .then((json) => {alert(`changes saved succesfully\nTitle:" ${json.title} "\nBody:" ${json.body} "`)})
                        .catch((e)=>{alert("saves not changes do to"+e);console.log("error!")})
                        .finally(()=>{
                                input[i].disabled = false;
                                saveBtn[i].style.display ="none";
                                editBtn[i].style.display = "inline";   
                                postTitle[i].contentEditable=false;
                                postBody[i].contentEditable=false;
                        })
                })
                noCheck[i].addEventListener('click',()=>{
                    postchecked[i].checked = true;
                    deleteArray.push(postContainer[i]);
                    checkfunc();
                })
                check[i].addEventListener('click',()=>{
                    postchecked[i].checked = false;
                    deleteArray.splice(deleteArray.indexOf(postContainer[i]),1);  
                    checkfunc();
                })
                postchecked[i].addEventListener('change',()=>{
                    console.log("hell")
                    if(postchecked[i].checked == true){
                        deleteArray.push(postContainer[i]);   
                    }else{
                        deleteArray.splice(deleteArray.indexOf(postContainer[i]),1);  
                    }
                    checkfunc();
                })
                deleteBtn[i].addEventListener('click',()=>{
                    if(confirm(`Are you sure you want to delete the selected file?\n Title:" ${posts[i].title} "`))
                    {
                        fetch('https://jsonplaceholder.typicode.com/posts/1', {
                            method: 'DELETE',
                            }).then((e)=>{
                                if(e.ok){
                                    deleteArray.splice(deleteArray.indexOf(postContainer[i]),1);
                                    postContainer[i].remove();
                                    checkfunc();
                                }
                            }).catch((e)=>{
                                console.log(e);
                                alert(`can't delete selected file?\n Title:" ${posts[i].title} "`)
                            })
                }    
                })
                commentsBtn[i].addEventListener('click',async(e)=>{
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
                    document.body.append(backCoverDiv);
                    let Usercomments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${posts[i].id}`)
                    Usercomments = await Usercomments.json();
                    let UsercommentSet=' ';
                    for(let i = Usercomments.length - 1  ; i > Usercomments.length-4 ; i--){
                         UsercommentSet+=`<div class= "comment"><div class="comments-name">${Usercomments[i].name}</div>
                        <div class="comments-body">${Usercomments[i].body}</div>
                        <div class="comments-email">-${Usercomments[i].email}</div></div>
                        `
                    }
                    comments[i].innerHTML=UsercommentSet;
                    comments[i].style.display = "inline-block";
                    comments[i].style.maxWidth = "350px";
                })
            }      
                 deleteAll.addEventListener('click',()=>{
                    const deleteFlag = confirm(`Are you sure you want to delete ${deleteArray.length} selected files?`);
                    if(deleteFlag){
                    for(let postcard of deleteArray){
                        fetch('https://jsonplaceholder.typicode.com/posts/1', {
                            method: 'DELETE',
                            }).then((e)=>{
                                if(e.ok){
                                    deleteArray.splice(deleteArray.indexOf(postcard),1);
                                    postcard.remove();
                                    checkfunc();
                                }
                            }).catch((e)=>{
                                console.log(e);
                                alert(`can't delete files"`)
                            })
                    }
                    deleteAll.style.display = "none";
                    deleteArray=[];
                    }
                })       
        })();