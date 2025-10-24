import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL;

export async function searchForSong(query, lyrics = false, songdata = true) {
  const params = {
    __call: "autocomplete.get",
    _format: "json",
    query,
  };
  const { data } = await axios.get(BASE_URL, { params });
  return data;
}

export async function getSong(id, lyrics = false) {
  const params = {
    __call: "song.getDetails",
    _format: "json",
    pids: id,
  };
  const { data } = await axios.get(BASE_URL, { params });
  return data;
}

export async function getAlbumId(query) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      __call: "search.getResults",
      _format: "json",
      type: "album",
      q: query,
    },
  });
  return data.results?.[0]?.id || null;
}

export async function getAlbum(id, lyrics = false) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      __call: "content.getAlbumDetails",
      _format: "json",
      albumid: id,
    },
  });
  return data;
}

export async function getPlaylistId(query) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      __call: "search.getResults",
      _format: "json",
      type: "playlist",
      q: query,
    },
  });
  return data.results?.[0]?.id || null;
}

export async function getPlaylist(id, lyrics = false) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      __call: "playlist.getDetails",
      _format: "json",
      listid: id,
    },
  });
  return data;
}

export async function getSongId(link) {
  const parts = link.split("/");
  return parts[parts.length - 1].split("?")[0];
}

export async function getLyrics(id) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      __call: "lyrics.getLyrics",
      _format: "json",
      lyrics_id: id,
    },
  });
  return data.lyrics || "No lyrics found.";
}

/****
 * Collections
 * ** https://www.jiosaavn.com/api.php?__call=webapi.getConfigDetailsCSR&api_version=4&_format=json&_marker=0&ctx=web6dot0
 */

export async function superCollectionList() { // Fetch All Collection List
    const { data } = await axios.get(BASE_URL, {
    params: {
      __call:"webapi.getConfigDetailsCSR",
      _format: "json",
      _marker:0,
      api_version:4,
      ctx:"web6dot0" 
    },
  });
  return data.weeklyTop15 || "Sorry ! No Collections found.";
}

export async function selectSongCollection(lang) { // fetch collection by Category.
    const catLang = lang;
    const { data } = await axios.get(BASE_URL, {
    params: {
      __call:"webapi.getFooterDetails",
      language:catLang,
      api_version:4,
     _format:"json",
     _marker:0
    },
  });
  return data || "Sorry ! No Collections found.";
}


