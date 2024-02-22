import React, { useState, useEffect } from 'react';

function Playlist(props) {
    return (
        <>
            <input type="text" 
            placeholder="Playlist Name..."
            onChange={(event) => props.onChangeName(event.target.value)} //I needed to get the value inside of the onChangeName object in order to resolve the circular JSON error found in the Spotify utility file. It was sending an object instead of a string for the name and description of the playlist
            ></ input>
            <input type="text"
            placeholder="Playlist Description..."
            onChange={(event) => props.onChangePlaylistDescription(event.target.value)}
            ></input>
            <div>
                {props.playlistTracks.map(track => (
                    <p className='m-1 flex bg-blue-900 my-4 rounded-lg' key={track.id}>
                        <button onClick={() => props.onRemove(track)}><img src={track.image} alt={track.artist} width='auto' height='auto'/> {props.trackBtnAction}Remove from playlist</button>

                        <div className = 'block ml-3 my-auto'>
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
                <button onClick={() => props.onSave()}>Save Playlist To Spotify</button>
            </div>
        </>
    );
};

export default Playlist;