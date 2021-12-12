var myId;
firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{
        // document.getElementById("span").innerHTML = user.email;
    //     var custID=user.email;
    //    custId= custID.substring(0, custID.lastIndexOf("."));
    //   //  console.log(custId);
       
    //    firebase.database().ref("users/" +custId).on("value" , function(snapshot){
    //         myId= snapshot.val().U;
            
           
            
    //    });
      
    myId=user.uid;
    let id= localStorage.getItem("caller");
    if(id != ""){
    let peerConnID =localStorage.getItem("string");
    startCall(peerConnID);
    }
    }
})
let mic = document.getElementById("audio");
let cam= document.getElementById("video");
let localVideo = document.getElementById("local-video")
let remoteVideo = document.getElementById("remote-video")

localVideo.style.opacity=0;
remoteVideo.style.opacity=0;

localVideo.onplaying= () =>{localVideo.style.opacity=1}
remoteVideo.onplaying= () =>{remoteVideo.style.opacity=1}

let peer

function init(userId) {
    peer =new Peer(userId,{
        host:'192.168.1.103' ,
        port: 9000,
        path: '/myapp' 
    })
    peer.on('open', () =>{
        //WE WILL MAKE A CALL TO JAVA IN ANDROID
       

    })
    listen()
}
console.log(myId);
init(myId);

let localstream;

function listen(){
    peer.on('call', (call) =>{

        navigator.getUserMedia({
            video:true,
            audio:true
        },(stream) =>{
            localVideo.srcObject=stream
            localstream= stream
            call.answer(stream)
            call.on('stream',(remoteStream) =>{
                remoteVideo.srcObject=remoteStream
                remoteVideo.className="primary-video"
                localVideo.className="secondary-video"
            })
        })
    })
}
function startCall(otherUserId){

    navigator.getUserMedia({
        video:true ,
        audio:true
        
        
    },(stream) =>{
        localVideo.srcObject=stream
        localstream= stream
        
        const call= peer.call(otherUserId , stream)
        call.on('stream',(remoteStream) => {
            remoteVideo.srcObject=remoteStream
            remoteVideo.className="primary-video"
            localVideo.className="secondary-video"

        })
        
    })

    
}

function toggleVideo(){
    
    let enabled = localstream.getVideoTracks()[0].enabled;
    if(enabled){
        localstream.getVideoTracks()[0].enabled = true;
        cam.src="./resources/video_off_red.png";
    }else{
        localstream.getVideoTracks()[0].enabled = false;
        cam.src="./resources/video_on.png";
    }

}

function toggleAudio(){
    
    const enabled = localstream.getAudioTracks()[0].enabled;
    if(enabled){
        localstream.getAudioTracks()[0].enabled = true
        mic.src="./resources/mic_off_red.png";
    }else{
        localstream.getAudioTracks()[0].enabled = false
        mic.src="./resources/mic_on.png";
    }
}

function changeView(){
    let view;
    if(localVideo.classList.contains('-grid')){
        view = true;
    }else{
        view = false;
    }
    if(!view){
        localVideo.classList.add('-grid');
        remoteVideo.classList.add('-grid');
    }
    else{
        localVideo.classList.remove('-grid');
        remoteVideo.classList.remove('-grid');
    }
}
function endCall(){
    location.replace("peercall.html")
}