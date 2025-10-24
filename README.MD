# 🎧 FunBlast Song's API (Node.js)

A **secure, token-authenticated REST API** built with **Express.js** that provides accessable data — including songs, albums, playlists, lyrics, and collections — with custom endpoints for categorized music lists.

---

## ✨ Features

- 🎵 Search for songs, albums, or playlists  
- 🧠 Fetch song details, lyrics, and collections  
- 🔒 Token-based authentication using `.env`  
- ⚙️ Modular structure for scalability  
- 🌍 Ready for local or production deployment  
- 🚀 Compatible with Vercel / Render / AWS / Railway

---

## 🧩 Folder Structure

```
📁funblast-api/
├── 📄server.js # Entry point - starts Express server
├── 📄.env # Environment configuration
├── 📄package.json
├── 📁routes/
│ └── 📄routes_api.js # Defines all API routes and endpoints
├── 📁utils/
│ └── 📄helper.js # Handles API logic and external requests
└── 📄README.md
```


---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rahul-hytrox/funblastAPI.git
cd funblast-api
```
## 🚀 Run the server
```bash
npm install
```

```bash
Server runs at http://localhost:3000
```

## Endpoints now available:

-----------------------------------------------------------------------------------------
| Endpoint                                   | Description                              |
| -------------------------------------------|------------------------------------------|
| `/funblast/song?query=Arijit`              | Search songs                             |
| `/funblast/song/get?id=XYZ`                | Get song by ID                           |
| `/funblast/playlist?query=Workout`         | Get playlist                             |
| `/funblast/album?query=Kabir+Singh`        | Get album                                |
| `/funblast/lyrics?query=<song-link-or-id>` | Fetch lyrics                             |
| `/funblast/result?query=<link-or-text>`    | Auto-detect type (song, album, playlist) |
| `/funblast/songCategoryByLang?lang=<lang>` | Fetch Categories By Language(hindi,tamil)|
| `/funblast/allCollections`                 | Fetch All Collection List                |
-----------------------------------------------------------------------------------------

### 📜 License

MIT © 2025 **rahul-hytrox**
Developed & maintained with ❤️ using Node.js.
---