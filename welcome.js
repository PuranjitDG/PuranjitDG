firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{
        document.getElementById("user").innerHTML = "Hello, "+user.email
    }
})


function logout(){
    firebase.auth().signOut()
}

document.getElementById("btn").addEventListener('click' ,function(){
    
})

// calling profile

function togglemenu(){
    const bgToggle = document.querySelector('.modal-bg');
    bgToggle.classList.toggle('active');
}