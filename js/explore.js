/* 
    Handle URL and search:
        Read URL parameters
        Fill search bar with current tags
        Perform a search
*/

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



/*
    Handle posts:
        Read JSON
        Filter posts
        Place posts
*/

// Filter posts by tags
function filterPosts(posts, tagsFilter){
    return posts.filter(post => {
        // Controleer of elke tag in de lijst 'tags' aanwezig is in de post's tags
        return tagsFilter.every(tag => post.tags.includes(tag));
    });
};

// Place all posts
const postsContainer = document.getElementById("posts-container");

function placePosts(posts){
    posts.forEach(e => {
        let postBox = document.createElement("div");
        postBox.className = "post";
        postsContainer.append(postBox);
    });
};


// Load post objects
let postObjects
fetch("../assets/json/posts.json")
  .then(response => response.json())
  .then(data => {
    postObjects = data.links; // Hier krijg je de lijst met links

    /*
        Filter de posts
        Plaats de posts op de webpagina
    */
  })
  .catch(error => console.error("Error loading JSON:", error));