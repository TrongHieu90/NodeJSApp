//Unsplash API
let apiKey ='';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=`;

//html elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function setAttributes(element, attributes)
{
    for(const key in attributes)
    {
        element.setAttribute(key, attributes[key]);
    }
}
//check if all imgs are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages)
    {
        loader.hidden = true;
        ready = true;
    }
}

function getKey(callBack)
{
    console.log('Getting key first');
    $.ajax({
        type: 'get',
        url: '/ajaxCall',
        dataType: 'text'
    })
        .done(function(data){
            apiKey = data;
            callBack();
        })
        .fail(function (error)
        {
            console.log('there is something wrong');
            console.log(error);
        });


}

//create elements for links photos add to DOM
function displayPhotos()
{
    totalImages = photosArray.length;
    photosArray.forEach((photo) =>
    {
        const item = document.createElement('a');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank',
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photos from Unsplash API
async function getPhotos()
{
    try{
        let fetchLink = `${apiUrl}${apiKey}&count=${count}`;
        const response = await fetch(fetchLink);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        console.log(error);
    }
}

//check if scroll to bottom
window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        imagesLoaded = 0;
        if(apiKey === "")
        {
            getKey(getPhotos);
        }
        else
        {
            getPhotos();
        }
    }
});

//Onload
getKey(getPhotos);


