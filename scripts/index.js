document.getElementById("mainlogo").addEventListener("click", gotoMainPage);

function gotoMainPage(){
    window.location.href = "index.html";
}


const api_key = `AIzaSyDpnqWEawVOupcjvUfDqi-0YQJcYariwOE`;
let urlSearch = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=java&key=${api_key}`;

let urlPopular = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=IN&key=${api_key}`


// original code starts-----------------------------------------------------------------------

 document.getElementById("submit").addEventListener("click", searchNow);        

async function searchNow(){
    let val = document.getElementById("search").value;

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${val}&key=${api_key}`);
    let res1 = await res.json();
    let data = res1.items;

    localStorage.setItem("youTubeSearch", JSON.stringify(data));

    window.location.href = "./search.html";
}




 popular();    
async function popular(){
    let res = await fetch(urlPopular);
    let res1 = await res.json();
    let data = res1.items;

    // localStorage.setItem("youTubePopular", JSON.stringify(data));  

    appendPopular(data);
}

// let data = JSON.parse(localStorage.getItem("youTubePopular")) || [];
// appendPopular(data);
function appendPopular(data){
    
    let content = document.getElementById("content");
    content.innerHTML = "";

    data.map(function(elem){

        let main_div = document.createElement("div");

        let image = document.createElement("img");
        image.src = elem.snippet.thumbnails.medium.url;

        let div = document.createElement("div");
        div.innerText = elem.snippet.title;

        main_div.append(image, div);
        main_div.addEventListener("click", function(){
            sendId(elem);
        });
        content.append(main_div);
    })
}

function sendId(data){
    localStorage.setItem("video", JSON.stringify(data));
    localStorage.setItem("id", JSON.stringify(data.id));

    window.location.href = "./video.html";
}


