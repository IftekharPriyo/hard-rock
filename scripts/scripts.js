const songSearch = document.getElementById('song-search');
songSearch.addEventListener('click',()=>{
    const searchedSong = document.getElementById('song-name').value;
    loadArtistAndSong(searchedSong);
});

const loadLyrics = (artist, title) =>{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data =>{
        document.getElementById('lyrics-artist-display').innerText = artist;
        document.getElementById('lyrics-song-display').innerText = title;
        document.getElementById('lyrics-display').innerText = data.lyrics;
    })
}



const loadArtistAndSong = (song) => {
    fetch(`https://api.lyrics.ovh/suggest/${song}`)
    .then(response => response.json())
    .then(info => {
        const displayResult = document.getElementById('display-result');
        displayResult.innerHTML = '';
        for(let i=0; i<10; i++){
            let songName = info.data[i].title;
            let songArtist = info.data[i].artist.name;
            displayResult.innerHTML += 
            `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${songName}</h3>
                <p class="author lead">Album by <span>${songArtist}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
            <a href="#lyrics-artist-display" onclick="loadLyrics('${songArtist}','${songName}')" id="load-lyrics" class="btn btn-success">Get Lyrics</a>
            </div>
        </div>`;
        
        }
    })
}



