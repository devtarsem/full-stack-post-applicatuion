const postOpener = document.querySelector('.make-post--js')
const addPostContiner = document.querySelector('.add-post-container')
const overlayOther = document.querySelector('.overlay')

postOpener.addEventListener('click', e=>{
    e.preventDefault()
    addPostContiner.classList.remove('hidden')
    overlayOther.classList.remove('hidden')
})
overlayOther.addEventListener('click', e=>{
    e.preventDefault()
    addPostContiner.classList.add('hidden')
    overlayOther.classList.add('hidden')
})


/*****making post */

const title = document.querySelector('.title-post')
const des = document.querySelector('.des-post')
const tag = document.querySelector('.tag-post')
const addPostBtn = document.querySelector('.addPostBtn--js')

const addPost = async(title,des,tag)=>{
    const post = await axios({
        method : "POST",
        url : "http://127.0.0.1:5700/api/v1/add-post",
        data : {
            title : title,
            description : des,
            tagged : tag
        }
    })
    if(post.data.status==='ok'){
        window.location.reload()
    }
}

addPostBtn.addEventListener('click', e=>{
    e.preventDefault()
    addPost(title.value, des.value, tag.value)
})




/***adding comment to post */
const comment = document.querySelectorAll('.add-comment')

const addComment = async(id,comment)=>{
    const addCom = await axios({
        method : "POST",
        url : "http://127.0.0.1:5700/api/v1/comment-post",
        data : {
            id : id,
            comment : comment
        }
    })
    if(addCom.data.status){
        window.location.reload()
    }
}

comment.forEach(e=>{
    e.addEventListener('click', el=>{
        el.preventDefault()
        // console.log(e.parentNode.children[0].value)
        // console.log(e.parentNode.parentNode.children[0].textContent)
        addComment(e.parentNode.parentNode.children[0].textContent, e.parentNode.children[0].value)
    })

})

/***liking the post */
/*const likeBtn = document.querySelectorAll('.likeBtn')
const likePost = async(id)=>{
    const Like = await axios({
        method : "POST",
        url : "http://127.0.0.1:5700/api/v1/like-post",
        data : {
            id : id
        }
    })
    if(Like.data.status==='ok'){
        window.location.reload()
    }
}

likeBtn.forEach(e=>{
    e.addEventListener('click', el=>{
        el.preventDefault()
        likePost(e.parentNode.parentNode.children[0].textContent)
    })
})
*/

/**bookmarking the post */
const bookmark = document.querySelectorAll('.bookmarkbtn')
const bookmarkpost = async(id)=>{
    const book = await axios({
        method : "POST",
        url : "http://127.0.0.1:5700/api/v1/bookmark-post",
        data : {
            id : id
        }
    })
    if(book.data.status==='ok'){
        window.location.reload()
    }
}

bookmark.forEach(e=>{
    e.addEventListener('click', el=>{
        bookmarkpost(e.parentNode.parentNode.children[0].textContent)
    })
})



/**deleting post */
const deleteBtn = document.querySelectorAll('.deletePOSTBtn')
const deletePost = async(id)=>{
    const del = await axios({
        method : "DELETE",
        url : "http://127.0.0.1:5700/api/v1/delete-post",
        data : {
            id : id
        }
    })
    if(del.data.status==='ok'){
        window.location.reload()
    }
}
deleteBtn.forEach(e=>{
    e.addEventListener('click', el=>{
        el.preventDefault()
        deletePost(e.parentNode.parentNode.children[0].textContent)
    })
})

/*******update post */
const updatepostBtn = document.querySelectorAll('.updatePOSTBtn')
const updatePanel = document.querySelector('.updating-post-container')
const titleUpdate = document.querySelector('.title-update')
const desUpdate = document.querySelector('.des-update')
const id_needed = document.querySelector('.id-needed')
const updateBtn = document.querySelector('.updatepost--js')
const updatePost = async(id,title,des)=>{
    const up = await axios({
        method : "PATCH",
        url : "http://127.0.0.1:5700/api/v1/update-post",
        data : {
            id : id,
            title : title,
            description : des
        }
    })
    if(up.data.status==='ok'){
        window.location.reload()
    }
}

updatepostBtn.forEach(e=>{
    e.addEventListener('click', el=>{
        el.preventDefault()
        id_needed.textContent = e.parentNode.parentNode.children[0].textContent
        updatePanel.classList.remove('hidden')
        overlayOther.classList.remove('hidden')
    })
})

updateBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const id = updateBtn.parentNode.parentNode.children[0].children[0].textContent
    updatePost(id,titleUpdate.value, desUpdate.value)
})