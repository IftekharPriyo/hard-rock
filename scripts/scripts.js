
const songSearch = document.getElementById('song-search');
songSearch.addEventListener('click',()=>{
    const searchedSong = document.getElementById('song-name').value;
    loadArtistAndSong(searchedSong);
})



const loadArtistAndSong = (song) => {
    fetch(`https://api.lyrics.ovh/suggest/${song}`)
    .then(response => response.json())
    .then(info => {
        const displayResult = document.getElementById('display-result');
        displayResult.innerHTML ='';
        for(let i=0; i<10; i++){
            let songName = info.data[i].title;
            let songArtist = info.data[i].artist.name;
            console.log(songName);
            console.log(songArtist);
            displayResult.innerHTML += 
            `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">Purple Noon</h3>
                <p class="author lead">Album by <span>Washed Out</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
        }
    })
}


