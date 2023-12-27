import React, { useState } from 'react';
import {FaSearch} from "react-icons/fa";
import "./SearchBar.css"

function SearchBar(props) {
    const [searchInput, setSearchInput] = useState("");
    const [click, setClick] = useState(false)

    const handleChange = (event) => {
        event.preventDefault()
        setSearchInput(event.target.value);
    };

    const search = () => {
        props.onSearch(searchInput);
    }



    return (
        <>
            <div className="input-wrapper">
                <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                onKeyUp = {event => {
                    if(event.key === "Enter"){
                        search();}}} />
                <button className= 'bg-white' onClick = {() => {setClick(true);
                    search()}}> <FaSearch className='bg-white' id="search-icon" /></button>
            </div>
        </>  
    );
};

export default SearchBar;