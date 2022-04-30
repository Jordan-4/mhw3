//spotify oauth2

function onJsonSpot(json) {
    console.log(json);
    const lib= document.querySelector('#div2');
    lib.innerHTML='';
    const results = json.tracks.items;
    let n_results = results.length;
    if (n_results > 4)
        n_results = 4;
    for (let i = 0; i < n_results; i++) {
        const song_data = results[i]
        const title = song_data.name;
        const link = song_data.uri;
        var site = document.createElement('a');
        site.setAttribute('href', link);
        site.textContent = 'Apri Spotify';
        const song_image = song_data.album.images[1].url;
        const track = document.createElement('div');
        track.classList.add('track');
        const img = document.createElement('img');
        img.src = song_image;
        const titolo = document.createElement('span');
        titolo.textContent = title;
        const artist = song_data.artists[0].name;
        const artist_= document.createElement('span');
        artist_.textContent = artist;
        track.appendChild(img);
        track.appendChild(titolo);
        track.appendChild(artist_);
        track.appendChild(site);
        lib.appendChild(track);

    }
}


function onResponse(response) {
    return response.json();
}

function song_search(event) {
    event.preventDefault();
    const song= document.querySelector('#song');
    const song_value= encodeURIComponent(song.value);
    fetch('https://api.spotify.com/v1/search?type=track&q=' + song_value,
        {
            headers:
            {
                'Authorization': 'Bearer ' + token
            }
        }
    ).then(onResponse, onError).then(onJsonSpot);
}

function onTokenJson(json) {
    console.log(json);
    token= json.access_token;
}


function onTokenResponse(response) {
    return response.json();
}


function onError(error) {
    console.log('error' + error);
}




const client_id = '255fd48bd52b4fbdb1298b73017df1cd';
const client_secret = 'fb42625aaa5a44b180bf56947c100d95';
let token;

fetch ("https://accounts.spotify.com/api/token",
    { 
        method: 'post',
        body: 'grant_type=client_credentials',
        headers: 
        { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    }
).then(onTokenResponse).then(onTokenJson);


const spotify = document.querySelector('#spotify');
spotify.addEventListener('submit', song_search);






//wiki no auth

const wiki= document.querySelector('#wiki');
wiki.addEventListener('submit', wiki_fetch);

function onResponse_wiki(response) {
    console.log(response.json);
    return response.json();
}

function onError(error){
    console.log("Error:" + error);
}

function onJson_wiki(json) {
    console.log(json);
    const res= document.querySelector('#div1');
    res.innerHTML='';

    const id = json.query.pageids[0];
    let text= document.createElement("span");
    text.textContent= json.query.pages[id].extract;
    res.appendChild(text);
}

function wiki_fetch(event) {
    event.preventDefault();
    const search= document.querySelector('#search');
    const search_encoded= encodeURIComponent(search.value);
    fetch('https://it.wikipedia.org/w/api.php?format=json&action=query&indexpageids&prop=extracts&origin=*&exintro&explaintext&redirects=1&titles=' + search_encoded)
    .then(onResponse_wiki, onError).then(onJson_wiki);
}
