//Unsplash API
let apiKey ='';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=`;

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

//get photos from Unsplash API
async function getPhotos()
{
    try{
        let fetchLink = `${apiUrl}${apiKey}&count=${count}`;
        const response = await fetch(fetchLink);
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}
getKey(getPhotos);


