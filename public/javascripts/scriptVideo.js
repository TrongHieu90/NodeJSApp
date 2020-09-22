const videoElement = document.getElementById('video');
const button = document.getElementById('button');

var displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: false
};

async function startCapture()
{
    try
    {
        videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    }
    catch (error)
    {
        console.log(error);
    }
}

button.addEventListener('click', function(evt) {
    startCapture().then(()=>{
        videoElement.onloadedmetadata = ()=> {
            videoElement.play();
        }
    });
}, false);
