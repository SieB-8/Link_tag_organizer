//lightmode switch

//variables
if (localStorage.lightMode === undefined) {
    localStorage.setItem("lightMode", "false");
}
let lightModeBool = (localStorage.lightMode === "true");
const lightMode = document.getElementById("light-mode");
const lightModeSwitch = document.getElementById("light-mode-switch")
const header = document.getElementById("header");
const headerLinks = document.querySelectorAll('header a');

//update lightMode
function updateLightMode() {
    if (lightModeBool) {
        document.body.style.backgroundColor = "#ffffff";
        header.style.backgroundColor = "#e6e6e6";
        headerLinks.forEach(link => {
            link.style.color = "#454545";
        });
        lightMode.src = "assets/textures/light_mode.png";
    } else {
        document.body.style.backgroundColor = "#141414";
        header.style.backgroundColor = "#454545";
        headerLinks.forEach(link => {
            link.style.color = "#b7b7b7";
        });
        lightMode.src = "assets/textures/dark_mode.png";
    }
}

//check if switch is clicked
lightModeSwitch.addEventListener("click", function () {
    if (lightModeBool) {
        lightModeBool = false;
        localStorage.setItem("lightMode", "false");
        updateLightMode();
    } else {
        lightModeBool = true;
        localStorage.setItem("lightMode", "true");
        updateLightMode();
    }
});


// Do a search
const searchBar = document.getElementById("search");
function doSearch(){
    let newLinkParams = searchBar.value
    newLinkParams = newLinkParams.trim().replace(/ {1,}/g, "+");
    if (newLinkParams === "" || newLinkParams === "+"){
        window.location.href = "html/explore.html"
    } else {
        window.location.href = "html/explore.html?tags=" + newLinkParams;
    }
};

// Press enter to do a search
searchBar.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        doSearch();
    };
});



//initialize
updateLightMode();