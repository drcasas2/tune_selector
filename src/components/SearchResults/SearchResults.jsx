import React, { useState, useEffect } from 'react';
// import SearchBar from '../SearchBar/SearchBar';

function SearchResults(props) {

    // const songs = [
    //     { artist: "One", name: "One Love", album: "1", id: "111"},
    //     { artist: "Two", name: "Twoo Love", album: "2", id: "222"},
    //     { artist: "Three", name: "Three Love", album: "3", id: "333"},
    //     { artist: "Four", name: "Four Love", album: "4", id: "444"},
    //     { artist: "Five", name: "Five Love", album: "5", id: "555"},
    //     { artist: "Six", name: "Six Love", album: "6", id: "666"},
    //     { artist: "Seven", name: "Seven Love", album: "7", id: "777"},
    //     { artist: "Eight", name: "Eight Love", album: "8", id: "888"},
    //     { artist: "Nine", name: "Nine Love", album: "9", id: "999"},
    //     { artist: "Ten", name: "Ten Love", album: "10", id: "101010"},
    // ];

    // if (props.searchResults.length > 0) {
    //     const searchResults = (songs.filter((song) => {
    //         song.match(searchInput));
    //     });
    // }
    return (
        <div>
            <ul>
            {props.searchResults.map((searchResult) => <li key={searchResult.id} className="flex my-5"><figure><img src={searchResult.image} width='100' height='100'/></ figure><p className='text-2xl text-gray-300'>{`${searchResult.artist} - ${searchResult.name}`}</p><p className='text-gray-500'>Album: {searchResult.album}</p></li>)}
            </ul>
        </div>
    );
};

export default SearchResults;