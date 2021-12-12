

    document.getElementById("register").addEventListener("submit",(event)=>{
        event.preventDefault()
    })


    document.getElementById("login").addEventListener("submit",(event)=>{

        event.preventDefault()
        document.getElementById("password").style.display="block"
        document.getElementById("login_btn").textContent="Log In"
        document.getElementById("forgot").style.display="block"
    })
    






firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("home.html")
    }
})

function signIn(){
   
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}

function signUp(){
   
    // const userName = document.getElementById("uname").value
    const email = document.getElementById("email_id").value
    const password = document.getElementById("psd").value
    
    if(document.getElementById("iconfirm").checked == true){
        firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });

    }else{
        alert("Please accept the terms and conditions before creating an account")
    }
    
}

function forgotPass(){
    document.getElementById("password").style.display="none"
    document.getElementById("login_btn").textContent="Get OTP"
    document.getElementById("forgot").style.display="none"
    document.getElementById("btns").style.display="none"
    document.getElementById("goback_btn").style.display="block"
   

    const email = document.getElementById("email_id").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}

document.getElementById("goback_btn").addEventListener('click',() =>{
    document.getElementById("password").style.display="block"
    document.getElementById("login_btn").textContent="Log In"
    document.getElementById("forgot").style.display="block"
    document.getElementById("btns").style.display="block"
    document.getElementById("goback_btn").style.display="none"
})