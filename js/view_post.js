// Get params from link
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let urlInLink = urlParams.get('url');
if (urlInLink != null) {
    urlInLink = decodeURIComponent(urlInLink);
};

// Search bar
const searchBar = document.getElementById("search");

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

// Append category to tags container
const tagsContainer = document.getElementById("tags-container");

function appendCategory(category, categoryType) {
    let title = document.createElement("p");
    title.className = "tag-title";
    title.innerHTML = categoryType;
    if (category != []) {
        tagsContainer.appendChild(title);
        category.forEach(e => {
            let tagText = document.createElement("a");
            tagText.className = "tag-" + categoryType.toLowerCase();
            tagText.innerHTML = e;
            tagText.href = "explore.html?tags=" + e;
            tagsContainer.appendChild(tagText);
        });
    }
};

// Place tags
function placeTags() {
    let categoryArtists = [];
    let categoryCharacters = [];
    let categoryFranchise = [];
    let categoryGeneral = [];
    let categoryMetadata = [];

    currentPost.tags.forEach(e => {
        switch (tagsDatabase[e]) {
            case "artists":
                categoryArtists.push(e);
                break;
            case "characters":
                categoryCharacters.push(e);
                break;
            case "franchise":
                categoryFranchise.push(e);
                break;
            case "metadata":
                categoryMetadata.push(e);
                break;
            default:
                categoryGeneral.push(e);
                break;
        };
    });

    appendCategory(categoryArtists, "Artists");
    appendCategory(categoryCharacters, "Characters");
    appendCategory(categoryFranchise, "Franchise");
    appendCategory(categoryGeneral, "General");
    appendCategory(categoryMetadata, "Metadata");
};

// Load tags objects
function loadTagDatabase() {
    fetch("../assets/json/tags.json")
        .then(response => response.json())
        .then(data => {
            tagsDatabase = data; // All tags objects

            placeTags();
        })
        .catch(error => console.error("Error loading JSON:", error));
}

// Load post objects
let postObjects, currentPost;
fetch("../assets/json/posts.json")
    .then(response => response.json())
    .then(data => {
        postObjects = data.links; // All link objects

        postObjects.forEach(e => {
            if (e.url === urlInLink) {
                currentPost = e;
            };
        });

        loadTagDatabase();
    })
    .catch(error => console.error("Error loading JSON:", error));