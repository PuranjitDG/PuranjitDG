firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{
        document.getElementById("span").innerHTML = user.email
    
    }
})


function logout(){
    firebase.auth().signOut()
   
}

// calling profile

const profileDiv = document.querySelector('.profile-class');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
var myfiles =[];
var imgUrl = null;
const uploadBtn = document.querySelector('#uploadBtn');
file.addEventListener('change' ,function(e){
    const selectdFile = this.files[0];
    if(selectdFile){
        const reader = new FileReader();

        reader.addEventListener('load', function(){
            img.setAttribute('src',reader.result);
        });
        reader.readAsDataURL(selectdFile)
        myfiles= selectdFile;
        var storeRef= firebase.storage().ref();
        const name = myfiles.name +'_'+ new Date();
         const metaData= {
             contentType : myfiles.type
         }
    
         var task =storeRef.child(name).put(myfiles,metaData);
    
         task.on('state-changed',function(snapshot){
             var progress= (snapshot.bytesTransferred/snapshot.totalBytes) *100;
    
         },
         function(error){
             alert("Error occured in saving the image");
         },
         function(){
            //  task.snapshot.ref.getDownloadURL().then(function(url){
            //      imgUrl = url;
            //  });
             task.then(snapshot => snapshot.ref.getDownloadURL())
              .then( function(url){
                  imgUrl = url
              })
            
    
         });
    }
});
function togglemenu(){
    const bgToggle = document.querySelector('.modal-bg');
    bgToggle.classList.toggle('active');
}
function untogglemenu(){
    const unToggle = document.querySelector('.modal-bg');
    unToggle.classList.remove('active');
}

document.getElementById('peer-call').addEventListener("click", () =>{
    location.replace("peercall.html");
})

// Modal Profile

function upload(){
    // var storeRef= firebase.storage().ref();
    // const name = myfiles.name +'_'+ new Date();
    //  const metaData= {
    //      contentType : myfiles.type
    //  }

    //  var task =storeRef.child(name).put(myfiles,metaData);

    //  task.on('state-changed',function(snapshot){
    //      var progress= (snapshot.bytesTransferred/snapshot.totalBytes) *100;

    //  },
    //  function(error){
    //      alert("Error occured in saving the image");
    //  },
    //  function(){
    //     //  task.snapshot.ref.getDownloadURL().then(function(url){
    //     //      imgUrl = url;
    //     //  });
    //      task.then(snapshot => snapshot.ref.getDownloadURL())
    //       .then( function(url){
    //           imgUrl = url
    //       })
        

    //  });


     var user = firebase.auth().currentUser;

     if (user !== null) {
       
        var uid = user.uid;
        var email = user.email;
        // var name=  email.substring(0, email.lastIndexOf("@"));
        var account = email.substring(0, email.lastIndexOf("."));
        // var account= name + domain;
        
        var username = document.getElementById('name').value;
        // const photoURL = user.photoURL;
        // const emailVerified = user.emailVerified;
      
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        firebase.database().ref('users/'+ account)
        .set({
            Name: username,
            Email: email,
            ImgURL:imgUrl,
            Uid : uid
        }, 
         (error) => {
            if (error) {
                alert("Error: Profile update failed")
            } else {
                alert("Profile updated successfully")
            }
         });
        
       
       
      }

     
    //  task.snapshot.ref.getDownloadURL().then((url) =>{
    //      imgUrl = url;
         
         
        

    //  })
    

}

