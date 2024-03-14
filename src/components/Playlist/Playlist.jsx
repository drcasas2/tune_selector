import React, { useState, useEffect } from 'react';
import styles from './Playlist.module.css';

function Playlist(props) {
    return (
        <>
            {props.playlistTracks.length > 0 && ( // Check if there are tracks in the playlist
                <div className={styles.playlistWrapper}>
                    <div className ={styles.playlistDetails}>
                        <input type="text" 
                        className={styles.playlistName}
                        placeholder="Playlist Name..."
                        onChange={(event) => props.onChangeName(event.target.value)} //I needed to get the value inside of the onChangeName object in order to resolve the circular JSON error found in the Spotify utility file. It was sending an object instead of a string for the name and description of the playlist
                        ></ input>
                        <input type="text"
                        className={styles.playlistDescription}
                        placeholder="Playlist Description..."
                        onChange={(event) => props.onChangePlaylistDescription(event.target.value)}
                        ></input>
                    </div>
                    <div>
                        {props.playlistTracks.map(track => (
                            <p className={styles.trackContainer} key={track.id}>
                                <button className={styles.button} onClick={() => props.onRemove(track)}>
                                    <div className={styles.imageContainer}>
                                        <img
                                        className ={styles.imageStyle}
                                        src={track.image}
                                        alt={track.artist} />
                                    </ div>    
                                        {props.trackBtnAction}Remove from playlist
                                </button>

                                <div className = {styles.trackInfo}>
                                    <h3>{track.name}</h3>
                                    <p>{track.artist} | {track.album}</p>
                                </ div>
                                

                                {/* <button onClick={props.onRemove}><img src={track.image} alt={track.artist} width='auto' height='auto'/>{props.trackBtnAction}</button>
                                <div className = 'block ml-3 my-auto'>
                                <h3>{props.track.name}</h3>
                                    <p>{props.track.artist} | {props.track.album}</p> */}
                        {/* </div> */}
                            {/* <button onClick={trackAction}>{props.trackBtnAction}</button> */}
                            </ p>
                        ))}
                        <button
                        className={styles.saveButton}
                        onClick={() => props.onSave()}>
                            Save Playlist To Spotify
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Playlist;