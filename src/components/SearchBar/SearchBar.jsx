import React, { useState } from 'react';
import {FaSearch} from "react-icons/fa";
import styles from './SearchBar.module.css';

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
            <div className={styles.inputWrapper}>
                <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                onKeyUp = {event => {
                    if(event.key === "Enter"){
                        search();}}} />
                <button className= 'bg-white' onClick = {() => {setClick(true);
                    search()}}> <FaSearch className={styles.searchButton} id="search-icon" /></button>
            </div>
        </>  
    );
};

export default SearchBar;