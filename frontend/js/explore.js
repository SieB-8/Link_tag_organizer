/* 
    Handle URL and search:
        Read URL parameters
        Fill search bar with current tags
        Perform a search
*/

// Get params from link
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let tagsInLink = urlParams.get('tags');
if (tagsInLink != null) {
    tagsInLink = tagsInLink.split(" ");
};

// Search bar
const searchBar = document.getElementById("search");
if (tagsInLink != null) {
    let searchBarText = tagsInLink.join(" ");
    searchBar.value = searchBarText;
}

// Do a search
function doSearch() {
    let newLinkParams = searchBar.value;
    newLinkParams = newLinkParams.trim().replace(/ {1,}/g, "+");
    if (newLinkParams === "" || newLinkParams === "+") {
        window.location.href = "explore.html";
    } else {
        window.location.href = "explore.html?tags=" + newLinkParams;
    };
};

// Press enter to do a search
searchBar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        doSearch();
    };
});



/*
    Handle posts:
        Read JSON
        Filter posts
        Generate iframe url
        Place posts
*/

// Filter posts by tags
function filterPosts(posts, tagsFilter) {
    if (tagsFilter === null) {
        return posts
    } else {
        return posts.filter(post => {
            // Check if post's "tags" list includes the tags to filter
            return tagsFilter.every(tag => post.tags.includes(tag));
        });
    };
};

// Generate iframe url
function generateUrl(url, type) {
    if (type === "youtube") {
        return url.replace("https://www.youtube.com/watch?v=", "https://img.youtube.com/vi/") + "/mqdefault.jpg"
    };
};

// Place all posts
const postsContainer = document.getElementById("posts-container");

function placePosts(posts) {
    posts.forEach(e => {
        let img = document.createElement("img");
        img.src = generateUrl(e.url, e.type);
        img.className = "embed";

        let postBox = document.createElement("div");
        postBox.appendChild(img);
        postBox.className = "post";
        postBox.addEventListener("click", function () {
            window.location.href = "view_post.html?url=" + encodeURIComponent(e.url);
        })
        postsContainer.append(postBox);
    });
};


// Load post objects
let postObjects
fetch("../assets/json/posts.json")
    .then(response => response.json())
    .then(data => {
        postObjects = data.links; // All link objects

        placePosts(filterPosts(postObjects, tagsInLink));
    })
    .catch(error => console.error("Error loading JSON:", error));