const clientId = '798f17e4aa1645dcb62264192036844e';
const redirectUri = 'http://localhost:5173/';// <-- This is for running the app locally on my computer.
//const redirectUri = 'https://drcasas2.github.io/tune_selector/'; // <-- This is for running the app from GitHub Pages.
// var client_secret = '770df3465ffc4b67bfe5556075f00bfd';
let accessToken;
let userId;

const Spotify = {


    // Redirects user to Spotify Auth page when login button is clicked. 
    //This method gets authorization to use and manipulate the user's Spotify data in the app...
    getAuth() {
        /*
        
        Creating a variable for the authorization URL for our app.
        
        This URL consists of:
        
        The Client ID, which identifies the app that is making the request

        The response type

        The authorization scope "playlist-modify-public",
        which according to the Spotify API Documentation, is the authorization scope
        needed to create a playlist, add/remove items to a playlist, 
        and change a playlist's details, which are all the tasks we intend to perform
        in this app.

        The Redirect URI, which is the URL that the app is using.
        
        */

        const tokenURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

        //set the current webpage to redirect to the authorization page for the app (as identified by the client ID)

        window.location = tokenURL;
    },

    /*
    
    This method checks Authorization and obtains the access token needed to perform any
    tasks in the Spotify API...

    It checks to see if there is a token to extract from the URL on page load. If there is,
    checkAuth returns true
    
    I used a regEx to match "/access_token=", not match the "&", since each key-value pair
    in the query string/URL is separated by an "&" symbol, so I don't want that to be matched
    as a part of the access token value, and the "*" is to capture everything else after the
    preceeding token, even when there is no other values after the preceeding token. This will
    either allow me to grab a blank access token value, or it will get me the access token for
    the app if it is in the URL.
    */

    checkAuth() {
        const authenticated = window.location.href.match(/access_token=([^&]*)/);
        if (authenticated) {
            //How the .match method works:
            //authenticated[0] would give "access_token=NwFOHN4802783",
            //authenticated[1] gives the values inside of the
            //capturing group (), so it will only give the access token and nothing around it.
            accessToken = authenticated[1];
            console.log(`Authenticated variable is ${authenticated}`);
            console.log(`accessToken variable is ${accessToken}`);
            return true;
        } else {
            return false;
        }
    },

    //This method gets the user's profile data/info to use in other parts of the app...
    //Namely, it gets the user's ID and Name
    getUserName() {
        if(!accessToken) {
            return Promise.reject(new Error('Access token is missing'));
        }
        const nameEndpoint = 'https://api.spotify.com/v1/me';
        return fetch(nameEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to fetch user data');
            }
        })
        .then((data) => {
            const userName = data.display_name;
            userId = data.id;
            return userName;
        });
    },

    //This method will 

    searchTracks(searchInput) {
        //I allowed the query string "q=" to search for albums, artists, or tracks with the searchInput string
        // that the user inputs

        const searchEndpoint = `https://api.spotify.com/v1/search?q=${searchInput}&type=track,album,artist`;
        return fetch(searchEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to search for your input');
            }
        })
        .then((data) => {
            const tracks = data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                image: track.album.images[0].url,
                uri: track.uri,
            }));
            return tracks;
        });
    },

    // User needs to input a playlist name, a playlist description, and 
    createPlaylist(playlistName, playlistDescription = '', urisArray) {
        //console.log(`Spotify Utils Create Playlist method was accessed. Authenticated variable is ${authenticated}`);
        console.log(`Spotify Utils Create Playlist method was accessed. playlistName variable is ${playlistName}`);
        const createPlaylistURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const playlistData = {
            'name': playlistName,
            'description': playlistDescription,
        };
        return fetch(createPlaylistURL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistData),
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error ('Failed to create playlist');
            }
        })
        // When you create a playlist, part of the data in the
        // response is a playlist ID. The following code gets that
        // ID of the Playlist, and sets it equal to a variable.
        // It then takes the playlist ID, and begins adding tracks
        // to the playlist.

        .then((data) => {
            const playlistId = data.id;
            //const playlistImageURL = data.images[1]['url']
            const tracksToAdd = {
                'uris': urisArray,
            }
            
            const addTracksURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
            return fetch(addTracksURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tracksToAdd),
            })
        })
        .then((res) => res.json())
        .then((result) => {
            if(result) {
                return true;
            } else {
                return false;
            }
        });
    }
}

export default Spotify;