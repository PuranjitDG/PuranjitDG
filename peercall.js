let userID;
let custId ,custID, idHandler;
let myCaller , callBtn ,txtVal ,callCancelBtn , isState;
callBtn = document.getElementById("call-Btn");
// callCancelBtn= document.getElementById("cancel-Btn"); 
  let dbRef = firebase.database();

firebase.auth().onAuthStateChanged((user)=>{
  if(!user){
      location.replace("index.html")
  }else{
      document.getElementById("span").textContent = user.email;
      userID =user.uid;
      custID=user.email;
       custId= custID.substring(0, custID.lastIndexOf("."));
       console.log(myCaller);

      // Check if person received the call
      if(isState){
      dbRef.ref("users/" +myCaller).on("value" , function(snapshot){
        console.log(snapshot.val());
        let available= snapshot.val().isAvailable;
        if(available != null){
         
          if(available){
           let peerId= snapshot.val().connId;
           localStorage.setItem("string",peerId);
           location.replace("call.html");
          }
          else if(!available){
           callCancelBtn.style.display="none";
           callBtn.style.visibility="visible";
          }
    
        }
        
      })
    }
       
       dbRef.ref("users/" +custId).on("value" , function(snapshot){
        // console.log(snapshot.val());
         document.getElementById("image").src= snapshot.val().ImgURL;
         document.getElementById("acName").textContent=snapshot.val().Name;
        if(snapshot.val().isCalling != null){
          if(snapshot.val().type == "Call"){
            let myCall= confirm( snapshot.val().isCalling +" is calling you.");
            if(myCall== true){
              location.replace("home.html")
            }

          }
          else if(snapshot.val().type == "VCall"){
            let myCall= confirm( snapshot.val().isCalling +" is video calling you.");
            if(myCall== true){
              dbRef.ref("users/" + custId).update({
                connId : userID,
                 isAvailable: true
              });
              location.replace("call.html");
            }
          }
         
        }
      })
      //  checkConnection();
    //  firebase.database().ref("users/" +myCaller)
       
     
     
  
  }
})




function logout(){
  firebase.auth().signOut()
 
}

const vcallbtn= document.getElementById("vcall-btn");
const localVideo = document.getElementById("local-video");
let subject= false;
let childname= null;
let callTxt= document.getElementById("call-id").value;
// callTxt.value ="";
//  txtVal = callTxt.value;
//  if(callTxt != ""){
//   // console.log(callTxt);
//   callTxt.style.width ="350px";
//   callBtn.style.transition ="none";
 
// } 



localVideo.style.opacity=1;
// localVideo.onplaying= () =>{localVideo.style.opacity=1};

 navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitUserMedia || navigator.mozGetUserMedia|| navigator.mozGetUserMedia||navigator.oGetUaerMedia;

// navigator.getUserMedia({video:true , audio:true},videoHandler,videoError);
// if(navigator.getUserMedia){
   

// }
// function videoHandler(stream){
//     localVideo.srcObject = stream;
// }

// navigator.mediaDevices.getUserMedia({
   
// },(stream) =>{
//     localVideo.srcObject= stream
// })




function startVideo() {
    navigator.getUserMedia(
      {
        audio: true,
        video: true
      },
      stream => ( localVideo.srcObject= stream),
      err => console.log(err)
    );
  }
  
  startVideo();
 function call(){
   isState= true;


  callCancelBtn = document.getElementById("cancel-Btn");
 
  // var database= db.child('users');
  // console.log(database.val());
  let callerId= document.getElementById("call-id").value;
  myCaller= callerId.substring(0, callerId.lastIndexOf("."));
  if(myCaller != ""){
    localStorage.setItem("caller" , myCaller);
  }else{
    let caller= ""
    localStorage.setItem("caller" , caller);
  }
    
  
  // dbRef.orderByChild("Email").equalTo(callerId).on("child_added" ,function(data){
  //   console.log("Equal to filter :" + data.val().Email);
  //   subject = true;
  //   childname="Email";
  
  // });
  // dbRef.orderByChild("Name").equalTo(callerId).on("child_added" ,function(data){
  //   console.log("Equal to filter :" + data.val().Name);
  //   subject = true;
  //   childname=Name;
  
  // });
 

  
  if(myCaller){
    // var dbRef = firebase.database().ref("users/");
    // firebase.database().ref("users/" +caller).update({
    //     isCalling : callerId
    //   });
   
    if(callerId !="" || callerId != null){
      // if(callCancelBtn != false){
      //   callCancelBtn.style.visibility="visible";
      //   callBtn.style.visibility="hidden";
      // }
       
      var crn = confirm("Calling " + callerId );
      if(crn){
        
        callCancelBtn.style.display="block";
        callBtn.style.visibility="hidden";
        
        
        dbRef.ref("users/" +myCaller).update({
          isCalling : custID ,
           type: "VCall"
        });
        

        
      }
      // else if(!crn){
      //   firebase.database().ref("users/" +myCaller).update({
      //     isCalling : callerId
      //   });
      // }
    }

  }
  // firebase.database().ref("users/" +myCaller).on("value" , function(s){
  //   let peerId= s.val().connId;
  //   localStorage.setItem("string",peerId);
  // });
  //  checkConnection();
}

function callCancel(){
  isState=false;
  dbRef.ref("users/" +myCaller).update({
    isCalling : "",
    type: ""
  });
  callCancelBtn.style.display="none";
  callBtn.style.visibility="visible";
}

function checkConnection(){


   

    
  
 

}



// database.orderByChild("Email").equalTo()
  