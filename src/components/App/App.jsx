import React, { useState, useEffect } from 'react';

import Spotify from '../../util/Spotify.jsx';

import styles from './App.module.css';

import tune_selector_logo from "../../assets/tune_selector_logo.svg";
// import tuneSelectorTitleHorizontal from './tune-selector-title-h.png';
// import tuneSelectorTitleVertical from './tune-selector-title-v.png';

import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';
import Playlist from '../Playlist/Playlist.jsx';
// import Tracklist from '../Tracklist/Tracklist';
// import Track from '../Track/Track';

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [logged, setLogged] = useState(false);
    const [userName, setUserName] = useState('');    

    useEffect(() => {
        const authenticated = Spotify.checkAuth();
        if (authenticated) {
            Spotify.getUserName()
             .then((name) => {
                setUserName(name);
                setLogged(authenticated);
            })
            .catch((error) => {
                console.error('Error fetching username:', error);
            });
        } else {
            console.log('Login failed');
        }
    }, [])

    const loginHandler = () => {
        Spotify.getAuth();
    }

    const search = (searchInput) => {
        Spotify.searchTracks(searchInput)
          .then((tracksArray) => {
            setSearchResults(tracksArray);
          })
          .catch((error) => {
            console.error('Error searching tracks:', error);
          });
    };

    const addTrack = (track) => {
        if (playlistTracks.some((addedTrack) => addedTrack.id === track.id)) {
            console.log("if statement was triggered on addTrack Function")
            return;
        } else {
            setPlaylistTracks((prev) => [...prev, track]); // Functional Update - The function will receive the previous value, and return an updated value.
            console.log("else statement was triggered on addTrack Function")
        }
    }

    const removeTrack = (track) => {
        console.log("removeTrack function is called")
        setPlaylistTracks((prevTracks) =>
            prevTracks.filter((thisTrack) => thisTrack.id !== track.id)
        );
    };

    const changePlaylistName = (name) => {
        setPlaylistName(name);
    };

    const changePlaylistDescription = (description) => {
        setPlaylistDescription(description);
    }

    const savePlaylist = () => {
        if (playlistTracks.length === 0) {
            return;
        }
        const playlistUris = playlistTracks.map((track) => track.uri);
        Spotify.createPlaylist(playlistName, playlistDescription, playlistUris)
            .then((res) => {
                if(res) {
                    alert('Playlist saved successfully 🤘🏻')
                    setPlaylistTracks([]);
                    setPlaylistName('');
                }
            })
            .catch((error) => {
                console.error('Error saving playlist:', error)
            });
    }


    if (!logged) {
        return (
            /*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-950">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                className="mx-auto h-40 w-auto"
                src={tune_selector_logo}
                alt="Tune Selector Logo"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-cyan-500">
                Log in to your Spotify Account
                </h2>
            </div>
    
                <div className="justify-center mx-auto">
                    <button
                        onClick={loginHandler}
                        type="submit"
                        className="flex w-60 mx-auto my-6 justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 hover:shadow-blue-100/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                    >
                        Log in
                    </button>
                </div>
    
                <p className="mt-1 text-center text-sm text-gray-500">
                Thanks for trying the app! {' '}
                <p>Made by David Casas</p>
                <a href="https://drcasas2.github.io" className="drop-shadow-sm font-semibold leading-6 text-slate-500 hover:text-white  hover:brightness-{200} hover:drop-shadow-xl">
                Contact Me
                </a>
                </p>
            </div>
        </>
        );
    // }   else { return(
    //         <main className={styles.appContainer}>
    //             <section className={styles.loginHeader}>
    //                 {/* <img className={styles.tuneSelectorLogo} src={tuneSelectorLogo} alt='Tune Selector Logo' />
    //                 <img className={styles.tuneSelectorTitleHorizontal} src={tuneSelectorTitleHorizontal} alt='' /> */}
    //                 <p className={styles.loginP}>Playlist Maker</p>
    //                 <button className={styles.loginButton} onClick={loginHandler}>Log in with Spotify</button>
    //                 <footer className={styles.loginfooter}>
    //                     <p className={styles.loginfooter}>Thanks for trying the app! | Made by David Casas @hi_im_dav1d</p>
    //                     <ul>
    //                         <li><a href='mailto:'><img></img></a></li>
    //                         <li><a href='linkedin'><img></img></a></li>
    //                         <li><a href='github'><img></img></a></li>
    //                         <li><a href='twitter'><img></img></a></li>
    //                     </ul>
    //                 </footer>
    //             </section>
    //         </main>
    //     );
    }
        return (
            <main className={styles.appContainer}>
                <header className={styles.appHeader}>
                    {/* <img className={styles.tuneSelectorLogo} src={tuneSelectorLogo} alt='Tune Selector Logo'/>
                    <img className={styles.tuneSelectorTitleHorizontal} src={tuneSelectorTitleHorizontal} alt='Tune Selector Title'/>
                    <img className={styles.tuneSelectorTitleVertical} src={tuneSelectorTitleVertical} alt='Tune Selector Title'/> */}
                </header>
                <section className={styles.searchBarContainer}>
                    <h1 className="text-4xl text-orange-300 text-center font bold shadow-sm">Hey {userName}</h1>
                    <p className="text-1xl text-orange-100 text-center font bold py-1 shadow-sm">Ready to make your playlist?</p>
                    <SearchBar className="py-1" onSearch={search} />
                    <SearchResults searchResults={searchResults} onAdd={addTrack} />
                </section>
                {/* <aside className={styles.playlistContainer}> */}
                
                    <Playlist
                        playlistName={playlistName}
                        playlistTracks={playlistTracks}
                        onRemove={removeTrack}
                        onChangeName={changePlaylistName}
                        onChangePlaylistDescription={changePlaylistDescription}
                        onSave={savePlaylist}
                    />
                {/* </aside> */}
            </main>
        );
}

export default App;

