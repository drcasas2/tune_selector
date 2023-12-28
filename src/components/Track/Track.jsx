import React, { useState, useEffect } from 'react';
import styles from './Track.module.css';


function Track(props) {
    const trackAction = () => props.onClick(props.track);
    console.log(props.track)
    return (
        <p className='m-1 flex bg-blue-900 my-4 rounded-lg'>
                <img onClick={trackAction} className = "ml-2" src={props.track.image} alt={props.track.artist} width='100' height='100'/>
                <div className = 'block ml-3 my-auto'>
                    <h3>{props.track.name}</h3>
                    <p>{props.track.artist} | {props.track.album}</p>
                </div>
            {/* <button onClick={trackAction}>{props.trackBtnAction}</button> */}
        </p>
    );
};

export default Track;