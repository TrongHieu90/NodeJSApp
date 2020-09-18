//Unsplash API
const apiKey = app.env.process.env["API_KEY "]
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//get photos from Unsplash API
async function getPhotos()
{
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

getPhotos();


