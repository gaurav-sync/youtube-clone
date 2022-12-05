document.getElementById("filter").addEventListener("click", filterMenue);
document.getElementById("mainlogo").addEventListener("click", gotoMainPage);

let filteredArr = JSON.parse(localStorage.getItem("youTubeSearch")) || [];

let data = JSON.parse(localStorage.getItem("youTubeSearch")) || [];
function gotoMainPage(){
    window.location.href = "index.html";
}

function filterMenue(){
    let filterMenu = document.getElementById("filtermenue");
    if(filterMenu.style.display===""){
        filterMenu.style.display="flex";
    }else{
        filterMenu.style.display="";
    }
}

const api_key = `AIzaSyDpnqWEawVOupcjvUfDqi-0YQJcYariwOE`;

document.getElementById("submit").addEventListener("click", searchNow);        // needs to activate

async function searchNow(){
    let val = document.getElementById("search").value;

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${val}&key=${api_key}`);
    let res1 = await res.json();
    let data = res1.items;

    localStorage.setItem("youTubeSearch", JSON.stringify(data));

    showData(data);
}



            
    
showData(data);

function showData(data){
    
    let content = document.getElementById("content");
    content.innerHTML = "";

    data.map(function(elem){
        let main_div = document.createElement("div");

        let image = document.createElement("img");
        image.src = elem.snippet.thumbnails.medium.url;

        let div = document.createElement("div");

        let h2 = document.createElement("h2");
        h2.innerText = elem.snippet.title;

        let par = document.createElement("p");
        par.innerText = elem.snippet.description;

        div.append(h2, par);
        main_div.append(image, div);

        main_div.addEventListener("click", function(){
            sendId(elem);
        });

        content.append(main_div);
    })
}


function sendId(data){
    localStorage.setItem("video", JSON.stringify(data));
    localStorage.setItem("id", JSON.stringify(data.id.videoId));

    window.location.href = "./video.html";
}


function filterType(i){

    if(i==1){
        filteredArr = data.filter(function(elem){
            // if(elem.id.videoId == undefined){
            //     return false;
            // }else{
            //     return true;
            // }
            return elem.id.kind == "youtube#video";
        })
    }else if(i==2){
        filteredArr = data.filter(function(elem){
            elem.id.kind == "youtube#playlist";
        })
    }else if(i==3){
        filteredArr = data.filter(function(elem){
            return elem.id.kind == "youtube#channel";
        })
    }else if(i==4){
        filteredArr = data.filter(function(elem){
            return elem.id.kind == "youtube#movie";
        })
    }else if(i==5){
        filteredArr = JSON.parse(localStorage.getItem("youTubeSearch")) || [];
    }
    document.getElementById("filtermenue").style.display = "";
    showData(filteredArr);
}

//-------------------------------filter by time------------------------------------

function filterTime(i){
    // let current = Date.now();
    let current = new Date();
    let currentTimestamp = parseInt(current.getTime());

    if(i==1){
        filteredArr = data.filter(function(elem){

            let vidTime = new Date(elem.snippet.publishTime);
        
            return currentTimestamp - parseInt(vidTime.getTime()) <= (1*60*60*1000);

        })
    }else if(i==2){
        filteredArr = data.filter(function(elem){

            let vidTime = new Date(elem.snippet.publishTime);
        
            return currentTimestamp - parseInt(vidTime.getTime()) <= (24*60*60*1000);
        })
    }else if(i==3){
        filteredArr = data.filter(function(elem){

            let vidTime = new Date(elem.snippet.publishTime);
        
            return currentTimestamp - parseInt(vidTime.getTime()) <= (24*7*60*60*1000);
        })
    }else if(i==4){
        filteredArr = data.filter(function(elem){

            let vidTime = new Date(elem.snippet.publishTime);
        
            return currentTimestamp - parseInt(vidTime.getTime()) <= 2629800000; //(24*30*60*60*1000);
        })
    }else if(i==5){
        filteredArr = data.filter(function(elem){

            let vidTime = new Date(elem.snippet.publishTime);
        
            return currentTimestamp - parseInt(vidTime.getTime()) <= (12*2629800000)  //(12*24*30*60*60*1000);
        })
    }

    document.getElementById("filtermenue").style.display = "";
    showData(filteredArr);
}


//date practice----------------------------------------------------------------------------------------------------
// var a = Date.now("2019-07-15T16:00:12Z");
// console.log(a);
// var c = new Date();
// var b = Date.now(c);
// console.log(b, "-------------------");
// var c = new Date();
// console.log(c);
// let date = new Date("2022-04-18T14:00:01Z");
// console.log(date.getTime(),"new ------");

// console.log(Date.now("2022-04-18T14:00:01Z"),"nowwwwwwwwww")

// console.log(Date.now(), "date.now")
// let curr = new Date();
// console.log(curr.getTime(), "new date");
//date practice----------------------------------------------------------------------------------------------------
