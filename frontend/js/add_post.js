// Add post
let urlInput = document.getElementById("url-input");
let typeInput = document.getElementById("type-input");
let tagsInput = document.getElementById("tags-input");

function submitPost(){
    newUrl = urlInput.value.trim().replace(/ {1,}/g, "");
    newType = typeInput.value;
    newTags = tagsInput.value.trim().replace(/ {2,}/g, " ").toLowerCase();
    newTags = newTags.split(" ");

    console.log(newUrl, newType, newTags);
    
    fetch("http://localhost:3000/addPost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: newUrl,
            type: newType,
            tags: newTags
         })  // parameters
    })
    .then(response => response.json())
    .then(data => {
        alert("Post uploaded succesfully!");
    })
    .catch(error => console.error("Error loading JSON:", error));
};

// Add categorized tags
let newTagsInput = document.getElementById("new-tags-input");
let newTagsTypeInput = document.getElementById("new-tags-type-input");

function submitTags(){
    newTags = newTagsInput.value.trim().replace(/ {2,}/g, " ").toLowerCase().split(" ");
    newType = newTagsTypeInput.value;

    console.log(newTags);
    
    fetch("http://localhost:3000/addTags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tags: newTags,
            type: newType
         })  // parameters
    })
    .then(response => response.json())
    .then(data => {
        alert("Tags uploaded succesfully!");
    })
    .catch(error => console.error("Error loading JSON:", error));
};