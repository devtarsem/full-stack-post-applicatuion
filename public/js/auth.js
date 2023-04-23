const signuppanelOpner = document.querySelector('.signup--js')
const loginpanelOpner = document.querySelector('.login--js')

const signupPanel = document.querySelector('.signup-container')
const loginPanel = document.querySelector('.login-container')

const overlay = document.querySelector('.overlay')
const closeSignupPlanel = document.querySelector(".close-signup-btn")
const closeLoginPlanel = document.querySelector(".close-login-btn")

signuppanelOpner.addEventListener('click', e=>{
    e.preventDefault()
    signupPanel.classList.remove('hidden')
    overlay.classList.remove('hidden')
})

loginpanelOpner.addEventListener('click', e=>{
    e.preventDefault()
    loginPanel.classList.remove('hidden')
    overlay.classList.remove('hidden')
})

overlay.addEventListener('click', (e)=>{
    e.preventDefault()
    signupPanel.classList.add('hidden')
    loginPanel.classList.add('hidden')
    overlay.classList.add('hidden')
})

closeSignupPlanel.addEventListener('click', (e)=>{
    e.preventDefault()
    signupPanel.classList.add('hidden')
    overlay.classList.add('hidden')
})

closeLoginPlanel.addEventListener('click', (e)=>{
    e.preventDefault()
    loginPanel.classList.add('hidden')
    overlay.classList.add('hidden')
})


/********signing the user************************/
const username = document.querySelector('.username-sign')
const email = document.querySelector('.email-sign')
const password = document.querySelector('.password-sign')
const signupBtn = document.querySelector('.signupbtn--js')

const signUser = async(username,email,password)=>{
    const sign = await axios({
        method : "post",
        url : "http://127.0.0.1:5700/api/v1/signup",
        data : {
            username,
            email,
            password
        }
    })
    if(sign.data.status==="ok"){
        window.location.reload()
    }
}

signupBtn.addEventListener('click', e=>{
    e.preventDefault()
    signUser(username.value , email.value, password.value)
})



/******implimenting loging function */

const emailLogin = document.querySelector('.email-login')
const passwordLogin = document.querySelector('.password-login')
const LoginBtn = document.querySelector('.loginbtn--js')

const loginUser = async(emailLogin,passwordLogin)=>{
    const sign = await axios({
        method : "post",
        url : "http://127.0.0.1:5700/api/v1/login",
        data : {
            email : emailLogin,
            password : passwordLogin
        }
    })
    if(sign.data.status==="ok"){
        window.location.reload()
    }
}

LoginBtn.addEventListener('click', e=>{
    e.preventDefault()
    loginUser(emailLogin.value, passwordLogin.value)
})