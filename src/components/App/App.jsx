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
        <>
            <div className = {styles.loginPageWrapper}>
                <div className={styles.loginImageWrapper}>
                    <img
                    className={styles.loginImage}
                    src={tune_selector_logo}
                    alt="Tune Selector Logo"
                    />
                </div>
                    <h2 className={styles.loginHeader}>
                    Log in to your Spotify Account
                    </h2>
                <div className={styles.loginButtonWrapper}>
                    <button
                        onClick={loginHandler}
                        type="submit"
                        className="flex w-full mx-auto my-1.5 justify-center rounded-md bg-blue-800 px-3 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-600 hover:shadow-blue-100/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offs et-2 focus-visible:outline-orange-400 active:ml-0.5 active:mr-0.5 active:my-1.5 active:py-1.5 active:px-3"
                    >
                        Log in
                    </button>
                </div>
    
                <p className="mt-1 my-1 py-1 text-center text-sm text-gray-500">
                Thanks for trying the app! {' '}
                <p>Made by David Casas</p>
                <a href="https://drcasas2.github.io" target="_blank" rel="noopener noreferrer" className="drop-shadow-sm font-semibold leading-6 text-slate-500 hover:text-white  hover:brightness-{200} hover:drop-shadow-xl">
                Contact Me
                </a>
                </p>
            </div>
        </>
        );
    }
        return (
            <main className={styles.appContainer}>
                <header className={styles.appHeader}>
                        {/* <img className={styles.tuneSelectorTitleHorizontal} src={tuneSelectorTitleHorizontal} alt='Tune Selector Title'/>
                        <img className={styles.tuneSelectorTitleVertical} src={tuneSelectorTitleVertical} alt='Tune Selector Title'/> */}
                </header>
                <div className={styles.appLogoWrapper}>
                        <img src={tune_selector_logo} alt='Tune Selector Logo' className={styles.appLogo}/>
                </div>
                <section className={styles.searchBarContainer}>
                    <p className=" text-orange-300 text-center font bold shadow-sm md:text-4xl xs:text-sm">Hey {userName}</p>
                    <p className="text-1xl text-orange-100 text-center font bold pt0.5 shadow-sm xs:text-xs">Ready to make your playlist?</p>
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

