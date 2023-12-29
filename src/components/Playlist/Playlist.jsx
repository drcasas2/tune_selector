import React, { useState, useEffect } from 'react';

function Playlist(props) {
    return (
        <div>
            <h1>Playlist Here</h1>
            {props.playlistTracks.map(track => {
                <p className='m-1 flex bg-blue-900 my-4 rounded-lg'>
                    <img onClick={props.onRemove} className = "ml-2" src={track.image} alt={track.artist} width='100' height='100'/>
                    <div className = 'block ml-3 my-auto'>
                        <h3>{track.name}</h3>
                        <p>{track.artist} | {track.album}</p>
                    </ div>
                {/* <button onClick={trackAction}>{props.trackBtnAction}</button> */}
                </ p>
            })}
            <button>Save To Spotify</button>
        </div>
    );
};

export default Playlist;