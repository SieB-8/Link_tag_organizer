const express = require('express'); // Importeer express
const fs = require('fs'); // Voor het lezen en schrijven van bestanden
const path = require('path'); // Om het pad naar je JSON-bestand te beheren
const cors = require('cors');

const app = express();
const PORT = 3000; // Poort waarop de server draait
app.use(cors());

// Middleware
app.use(express.json()); // Hiermee kan de server JSON-gegevens ontvangen

// Pad naar je posts.json bestand
const postsFilePath = path.join(__dirname, '../frontend/assets/json/posts.json');

// Lees de posts.json file
function loadPosts() {
    const rawData = fs.readFileSync(postsFilePath);
    return JSON.parse(rawData);
}

// Schrijf de gewijzigde posts terug naar de posts.json file
function savePosts(posts) {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
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

// Start de server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});