import React, { useState, useEffect } from 'react';
import styles from './Track.module.css';


function Track(props) {
    const trackAction = (event) => props.onClick(props.track); // this seems to be sending all of the tracks up through the app when I click one image.
    // console.log(props.track.name)
    return (
        <p className='m-1 flex bg-blue-900 my-4 rounded-lg'>
                <button onClick={trackAction}><img src={props.track.image} alt={props.track.artist} width='auto' height='auto'/>{props.trackBtnAction}</button>
                <div className = 'block ml-3 my-auto'>
                    <h3>{props.track.name}</h3>
                    <p>{props.track.artist} | {props.track.album}</p>
                </div>
            {/* <button onClick={trackAction}>{props.trackBtnAction}</button> */}
        </p>
    );
}

export default Track;