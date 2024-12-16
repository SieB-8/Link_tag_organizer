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
        Generate iframe url
        Place posts
*/

// Filter posts by tags
function filterPosts(posts, tagsFilter){
    return posts.filter(post => {
        // Controleer of elke tag in de lijst 'tags' aanwezig is in de post's tags
        return tagsFilter.every(tag => post.tags.includes(tag));
    });
};

// Generate iframe url
function generateUrl(url, type){
    if(type === "youtube"){
        return url.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")
    };
};

// Place all posts
const postsContainer = document.getElementById("posts-container");

function placePosts(posts){
    posts.forEach(e => {
        let video = document.createElement("iframe");
        video.src = generateUrl(e.url, e.type);
        video.allow = "autoplay;";
        video.className = "embed";

        let postBox = document.createElement("div");
        postBox.appendChild(video);
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

    placePosts(filterPosts(postObjects, ["minecraft"]));
  })
  .catch(error => console.error("Error loading JSON:", error));