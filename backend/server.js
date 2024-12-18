const express = require('express'); // Importeer express
const fs = require('fs'); // Voor het lezen en schrijven van bestanden
const path = require('path'); // Om het pad naar je JSON-bestand te beheren
const cors = require('cors');

const app = express();
const PORT = 3000; // Poort waarop de server draait
app.use(cors());

// Middleware
app.use(express.json()); // Hiermee kan de server JSON-gegevens ontvangen

// Pad naar je json bestanden
const postsFilePath = path.join(__dirname, '../frontend/assets/json/posts.json');
const tagsFilePath = path.join(__dirname, '../frontend/assets/json/tags.json');

// Lees de posts.json file
function loadPosts() {
    const rawData = fs.readFileSync(postsFilePath);
    return JSON.parse(rawData);
}

// Lees de tags.json file
function loadTags() {
    try {
        const data = fs.readFileSync(tagsFilePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error loading tags.json:", err);
        return {}; // Retourneer een leeg object bij een fout
    }
}

// Schrijf de gewijzigde posts terug naar de posts.json file
function savePosts(posts) {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}

// Functie om tags.json te updaten
function saveTags(data) {
    try {
        fs.writeFileSync(tagsFilePath, JSON.stringify(data, null, 4));
        console.log("Tags successfully updated!");
    } catch (err) {
        console.error("Error writing to tags.json:", err);
        throw err;
    }
}

// Endpoint om de likes te verhogen
app.post('/like', (req, res) => {
    const { url } = req.body;  // Verkrijg de URL van de post
    let posts = loadPosts();   // Laad de huidige posts

    // Zoek naar de post met de overeenkomstige URL
    const post = posts.links.find(post => post.url === url);

    if (post) {
        post.likes += 1;  // Verhoog het aantal likes
        savePosts(posts); // Sla de nieuwe data op
        res.json({ success: true, likes: post.likes });
    } else {
        res.status(404).json({ success: false, message: "Post niet gevonden" });
    }
});

// Likes verlagen
app.post('/dislike', (req, res) => {
    const { url } = req.body;  // Verkrijg de URL van de post
    let posts = loadPosts();   // Laad de huidige posts

    // Zoek naar de post met de overeenkomstige URL
    const post = posts.links.find(post => post.url === url);

    if (post) {
        post.likes -= 1;  // Verhoog het aantal likes
        savePosts(posts); // Sla de nieuwe data op
        res.json({ success: true, likes: post.likes });
    } else {
        res.status(404).json({ success: false, message: "Post niet gevonden" });
    }
});

// Voeg post toe aan json
app.post('/addPost', (req, res) => {
    const { url, type, tags } = req.body;

    if (!url || !type || !tags) {
        return res.status(400).json({ error: "Missing required fields: url, type, or tags" });
    }

    const postsData = loadPosts(); // Laad bestaande posts
    const newPost = { url, type, tags, likes: 0 };

    postsData.links.push(newPost);
    savePosts(postsData);

    console.log("New post added:", newPost);
    res.status(200).json({ message: "Post successfully added!", newPost });
});

// Voeg tags toe aan de json
app.post('/addTags', (req, res) => {
    const { tags, type } = req.body;

    if (!tags || !type) {
        return res.status(400).json({ error: "Missing required fields: tags or type" });
    };

    // Laad huidige tags
    let tagsData = loadTags();

    // Voeg nieuwe tags toe
    tags.forEach(tag => {
        if (!tagsData[tag]) { // Alleen toevoegen als de tag nog niet bestaat
            tagsData[tag] = type;
        };
    });

    // Schrijf bijgewerkte tags terug naar het bestand
    try {
        saveTags(tagsData);
        res.status(200).json({ message: "Tags successfully added!", tags: tagsData });
    } catch (err) {
        res.status(500).json({ error: "Failed to save tags" });
    };
});

// Edit post's tags
app.post('/editPostTags', (req, res) => {
    const { url, tags } = req.body;  // Verkrijg de URL van de post
    let posts = loadPosts();   // Laad de huidige posts

    // Zoek naar de post met de overeenkomstige URL
    const post = posts.links.find(post => post.url === url);

    if (post) {
        post.tags = tags;  // Verhoog het aantal likes
        savePosts(posts); // Sla de nieuwe data op
        res.json({ success: true, tags: post.tags });
    } else {
        res.status(404).json({ success: false, message: "Post niet gevonden" });
    }
});

// Start de server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});