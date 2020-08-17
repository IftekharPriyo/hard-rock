
const songSearch = document.getElementById('song-search');
songSearch.addEventListener('click',()=>{
    const searchedSong = document.getElementById('song-name').value;
    loadArtistAndSong(searchedSong);
})



const loadArtistAndSong = (song) => {
    fetch(`https://api.lyrics.ovh/suggest/${song}`)
    .then(response => response.json())
    .then(info => {
        for(let i=0; i<10; i++){
            console.log(info.data[i].title);
            console.log(info.data[i].album.title);
            console.log(info.data[i].artist.name);
        }
    })
}


