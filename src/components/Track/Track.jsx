import React, { useState, useEffect } from 'react';
import styles from './Track.module.css';


function Track(props) {
    const trackAction = (event) => props.onClick(props.track); // this seems to be sending all of the tracks up through the app when I click one image.
    // console.log(props.track.name)
    return (
        <>
            <div className={styles.trackContainer}>
                <button className={styles.button} onClick={trackAction}>
                    <div className={styles.imageContainer}>
                        <img className= {styles.imageStyle} src={props.track.image} alt={props.track.artist} />
                        {props.trackBtnAction}
                    </div>
                
                </button>
                <div className = {styles.trackInfo}>
                    <h3>{props.track.name}</h3>
                    <p>{props.track.artist} | {props.track.album}</p>
                </div>
                {/* <button onClick={trackAction}>{props.trackBtnAction}</button> */}
            </div>
        </>
    );
}

export default Track;