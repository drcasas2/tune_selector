import React, { useState, useEffect } from 'react';

function Playlist(props) {
    return (
        <>
            <h1>Playlist Here</h1>
                <input type="text" 
                placeholder="Playlist Name..."
                onChange={props.onChangeName}
                ></ input>
                <input type="text"
                placeholder="Playlist Description..."
                onChange={props.onChangePlaylistDescription}
                ></input>
            <div>
                {props.playlistTracks.map(track => (
                    <p className='m-1 flex bg-blue-900 my-4 rounded-lg' key={track.id}>
                        <button onClick={props.onRemove}><img src={track.image} alt={track.artist} width='auto' height='auto'/>{props.trackBtnAction}Remove from playlist</button>
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
                <button onClick={props.onSave}>Save Playlist To Spotify</button>
            </div>
        </>
    );
};

export default Playlist;