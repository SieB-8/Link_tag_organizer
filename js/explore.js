// Haal parameters uit link
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let tagsInLink = urlParams.get('tags');
if (tagsInLink!=null){
    tagsInLink = tagsInLink.split(" ");
};

// Search bar
const searchBar = document.getElementById("search");
if (tagsInLink!=null){
    let searchBarText = tagsInLink.join(" ");
    searchBar.value = searchBarText;
}

// Do a search
function doSearch(){
    let newLinkParams = searchBar.value;
    newLinkParams = newLinkParams.trim().replace(/ {1,}/g, "+");
    if (newLinkParams === "" || newLinkParams === "+"){
        window.location.href = "explore.html";
    } else {
        window.location.href = "explore.html?tags=" + newLinkParams;
    };
};

// Load post objects
fetch("../assets/json/posts.json")
  .then(response => response.json())
  .then(data => {
    console.log(data.links); // Hier krijg je de lijst met links
  })
  .catch(error => console.error("Error loading JSON:", error));

// Place all posts
const postsContainer = document.getElementById("posts-container");

function placePosts(posts){
    posts.forEach(e => {
        let postBox = document.createElement("div");
        postBox.className = "post";
        postsContainer.append(postBox);
    });
};