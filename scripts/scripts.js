//initialization
document.getElementById('display-result').style.display = 'none';
document.getElementById('lyrics-section').style.display = 'none';


// function to load lyrics of the songs from the search results
const loadLyrics = (artist, title) =>{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`) //API for lyrics
    .then(response => response.json())
    .then(data =>{
        let titleDisplay = unescape(title);
        let artistDisplay = unescape(artist);
        document.getElementById('lyrics-artist-display').innerText = artistDisplay;
        document.getElementById('lyrics-song-display').innerText = titleDisplay;
        if(data.lyrics===undefined){
            document.getElementById('lyrics-display').innerText = 'lyrics not found in the vault';
        }
        else{
            document.getElementById('lyrics-display').innerText = data.lyrics;
        }
        
    })
    .catch(error => {
        console.log(error);
    })
    document.getElementById('lyrics-section').style.display = 'block';
}


//function to load the list of artist and song in the UI
const loadArtistAndSong = (song) => {
    fetch(`https://api.lyrics.ovh/suggest/${song}`) //API for retrieving song and artist name
    .then(response => response.json())
    .then(info => {
        const displayResult = document.getElementById('display-result');
        displayResult.innerHTML = '';
        for(let i=0; i<10; i++){
            let songName = info.data[i].title;
            let songArtist = info.data[i].artist.name;
            let songAlbum = info.data[i].album.title;
            let songPhoto = info.data[i].album.cover;
            let name = escape(songName);
            let artist = escape(songArtist);
            displayResult.innerHTML += 
            `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-3">
                <img src="${songPhoto}" alt="">
            </div>
            <div class="col-md-6">
                <h3 class="lyrics-name">${songName}</h3>
                <p class="author lead">Song by <span>${songArtist}</span></p>
                <h6 class="author lead">Album : <span>${songAlbum}</span></h6>
            </div>
            <div class="col-md-3 text-md-right text-center">
            <a href="#lyrics-artist-display" onclick="loadLyrics('${artist}','${name}')" id="load-lyrics" class="btn btn-success">Get Lyrics</a>
            </div>
        </div>`;
        document.getElementById('display-result').style.display = 'block';
        }
    })
    .catch(error => {
        console.log(error);
    })
}


// search button functionalities
const songSearch = document.getElementById('song-search');
songSearch.addEventListener('click',()=>{
    const searchedSong = document.getElementById('song-name').value;
    loadArtistAndSong(searchedSong);
    document.getElementById('lyrics-section').style.display = 'none';
});

