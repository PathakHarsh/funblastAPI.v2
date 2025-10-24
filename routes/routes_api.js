import express from "express";
import * as apiEndPointer from "../utils/helper.js";

const router = express.Router();

// /song/
router.get("/song", async (req, res) => {
  const { query, lyrics: lyrics_, songdata: songdata_ } = req.query;
  const lyrics = lyrics_ && lyrics_.toLowerCase() !== "false";
  const songdata = !songdata_ || songdata_.toLowerCase() === "true";

  if (!query) return res.json({ status: false, error: "Query is required to search songs!" });

  try {
    const data = await apiEndPointer.searchForSong(query, lyrics, songdata);
    res.json(data);
  } catch (e) {
    res.json({ status: false, error: e.message });
  }
});

// /song/get/
router.get("/song/get", async (req, res) => {
  const { id, lyrics: lyrics_ } = req.query;
  const lyrics = lyrics_ && lyrics_.toLowerCase() !== "false";

  if (!id) return res.json({ status: false, error: "Song ID is required to get a song!" });

  try {
    const data = await apiEndPointer.getSong(id, lyrics);
    if (!data) return res.json({ status: false, error: "Invalid Song ID received!" });
    res.json(data);
  } catch (e) {
    res.json({ status: false, error: e.message });
  }
});

// /playlist/
router.get("/playlist", async (req, res) => {
  const { query, lyrics: lyrics_ } = req.query;
  const lyrics = lyrics_ && lyrics_.toLowerCase() !== "false";

  if (!query) return res.json({ status: false, error: "Query is required to search playlists!" });

  try {
    const id = await apiEndPointer.getPlaylistId(query);
    const data = await apiEndPointer.getPlaylist(id, lyrics);
    res.json(data);
  } catch (e) {
    res.json({ status: false, error: e.message });
  }
});

// /album/
router.get("/album", async (req, res) => {
  const { query, lyrics: lyrics_ } = req.query;
  const lyrics = lyrics_ && lyrics_.toLowerCase() !== "false";

  if (!query) return res.json({ status: false, error: "Query is required to search albums!" });

  try {
    const id = await apiEndPointer.getAlbumId(query);
    const data = await apiEndPointer.getAlbum(id, lyrics);
    res.json(data);
  } catch (e) {
    res.json({ status: false, error: e.message });
  }
});

// /lyrics/
router.get("/lyrics", async (req, res) => {
  const { query } = req.query;
  if (!query)
    return res.json({ status: false, error: "Query containing song link or id is required to fetch lyrics!" });

  try {
    let lyrics;
    if (query.includes("http") && query.includes("saavn")) {
      const id = await apiEndPointer.getSongId(query);
      lyrics = await apiEndPointer.getLyrics(id);
    } else {
      lyrics = await apiEndPointer.getLyrics(query);
    }
    res.json({ status: true, lyrics });
  } catch (e) {
    res.json({ status: false, error: e.message });
  }
});

// /result/
router.get("/result", async (req, res) => {
  const { query, lyrics: lyrics_ } = req.query;
  const lyrics = lyrics_ && lyrics_.toLowerCase() !== "false";

  if (!query)
    return res.json({ status: false, error: "Query is required to get results!" });

  try {
    if (!query.includes("saavn")) {
      const data = await apiEndPointer.searchForSong(query, lyrics, true);
      return res.json(data);
    }

    if (query.includes("/song/")) {
      const id = await apiEndPointer.getSongId(query);
      return res.json(await apiEndPointer.getSong(id, lyrics));
    }

    if (query.includes("/album/")) {
      const id = await apiEndPointer.getAlbumId(query);
      return res.json(await apiEndPointer.getAlbum(id, lyrics));
    }

    if (query.includes("/playlist/") || query.includes("/featured/")) {
      const id = await apiEndPointer.getPlaylistId(query);
      return res.json(await apiEndPointer.getPlaylist(id, lyrics));
    }
  } catch (e) {
    res.json({ status: true, error: e.message });
  }
});

/***
 * GET Collections
 */
router.get("/allCollections", async (req, res) => {
  try {
    const data = await apiEndPointer.superCollectionList();
    if (!data) return res.json({ status: false, error: "Invalid Collection Request!" });
    res.json(data);
  } catch (e) {
    res.json({ status: false, error: e.message });
  }
})


router.get("/songCategoryByLang", async (req, res) => {
  const getCatId = req.query;
  if (!getCatId.lang) return res.json({ status: false, error: "Oops! not match Collection ID" });

  try {
    const data = await apiEndPointer.selectSongCollection(getCatId.lang);
    if (!data) return res.json({ status: false, error: "Invalid Collection ID" });
    res.json(data);
  } catch (e) {
    res.json({ status: false, error: e.message });
  }
})

export default router;
