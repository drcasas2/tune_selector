import React, { useState, useEffect } from 'react';
import Track from '../Track/Track'


function Tracklist(props) {
    if(props.tracks.length > 0) {
        return (
            <div>
                {props.tracks.map((track) => {
                    return(
                        <Track 
                            className="my-4"
                            trackBtnAction={props.trackBtnAction}
                            track={track}
                            key={track.id}
                            onClick={props.onClick}
                            inPlaylist={props.inPlaylist}
                        />
                    );
                })}
                
                
                {/* <ul>
                <li key={searchResult.id} className="flex my-5"><figure><img src={searchResult.image} width='100' height='100'/></ figure><p className='text-2xl text-gray-300'>{`${searchResult.artist} - ${searchResult.name}`}</p><p className='text-gray-500'>Album: {searchResult.album}</p></li>
                </ul> */}
            </div>
        );
    } else {
        return (
            <div>
                <h3>{props.emptyState}</h3>
            </div>
        )
    };
}

export default Tracklist;