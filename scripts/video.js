document.getElementById("mainlogo").addEventListener("click", gotoMainPage);

function gotoMainPage(){
    window.location.href = "index.html";
}

showVideo();

function showVideo(){
    let data = JSON.parse(localStorage.getItem("video"));
    let id = JSON.parse(localStorage.getItem("id"));

    let iframe = document.querySelector("iframe");
    iframe.src = "";
    iframe.src = `https://www.youtube.com/embed/${id}`

    let title = document.getElementById("title");
    title.innerText = "";
    title.innerText = data.snippet.title;

    let desc = document.getElementById("desc");
    desc.innerText = "";
    desc.innerText = data.snippet.description;
}