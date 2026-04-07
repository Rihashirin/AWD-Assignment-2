type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  favorite: boolean;
  playCount: number;
};

type Playlist = {
  name: string;
  songs: Song[];
  createdDate: Date;
  songCount: number;
};

let songs: Song[] = [
  { id: 1, title: "Song A", artist: "Artist 1", album: "Album X", genre: "Pop", duration: "3:20", favorite: false, playCount: 0 },
  { id: 2, title: "Song B", artist: "Artist 2", album: "Album Y", genre: "Rock", duration: "4:10", favorite: false, playCount: 0 },
  { id: 3, title: "Song C", artist: "Artist 1", album: "Album Z", genre: "Pop", duration: "2:50", favorite: false, playCount: 0 }
];

let recentlyPlayed: Song[] = [];

const container = document.getElementById("songContainer")!;
const nowPlayingDiv = document.getElementById("nowPlaying")!;
const recentDiv = document.getElementById("recent")!;

// Display Songs
function displaySongs(songList: Song[]) {
  container.innerHTML = "";
  songList.forEach(song => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <p>${song.album}</p>
      <p>${song.duration}</p>
      <button onclick="playSong(${song.id})">Play</button>
    `;
    container.appendChild(card);
  });
}

// Play Song
function playSong(id: number) {
  const song = songs.find(s => s.id === id);
  if (!song) return;

  song.playCount++;

  nowPlayingDiv.innerHTML = `<h3>${song.title} - ${song.artist}</h3>`;

  recentlyPlayed.unshift(song);
  if (recentlyPlayed.length > 5) {
    recentlyPlayed.pop();
  }

  displayRecent();
}

// Display Recently Played
function displayRecent() {
  recentDiv.innerHTML = "";
  recentlyPlayed.forEach(song => {
    recentDiv.innerHTML += `<p>${song.title}</p>`;
  });
}

// Filters
function filterByGenre(genre: string): Song[] {
  return songs.filter(song => song.genre === genre);
}

function filterByArtist(artist: string): Song[] {
  return songs.filter(song => song.artist === artist);
}

// Sort using keyof
function sortBy(key: keyof Song): Song[] {
  return [...songs].sort((a, b) =>
    a[key] > b[key] ? 1 : -1
  );
}

// Search
document.getElementById("search")!.addEventListener("input", (e: any) => {
  const value = e.target.value.toLowerCase();
  const filtered = songs.filter(s => s.title.toLowerCase().includes(value));
  displaySongs(filtered);
});

// Genre Filter
document.getElementById("genreFilter")!.addEventListener("change", (e: any) => {
  const value = e.target.value;
  displaySongs(value ? filterByGenre(value) : songs);
});

// Artist Filter
document.getElementById("artistFilter")!.addEventListener("change", (e: any) => {
  const value = e.target.value;
  displaySongs(value ? filterByArtist(value) : songs);
});

// Initial Load
displaySongs(songs);