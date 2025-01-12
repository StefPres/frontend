import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import SearchResult from "../components/SearchResult";
import dropDown from './images/Vector.png';


function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allInternships, setAllInternships] = useState([]);

  useEffect(() => {
    // Fetch all internships when the component mounts
    const fetchAllInternships = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/internships/search/`);
        const data = await response.json();
        setAllInternships(data);
      } catch (error) {
        console.error("Error fetching all internships:", error);
      }
    };

    fetchAllInternships();
  }, []);

  const handleSearch = () => {
    // Filter internships based on the search query
    const filteredInternships = allInternships.filter((internship) =>
      internship.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredInternships);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    // Update search results when searchQuery changes
    handleSearch();
  }, [searchQuery, allInternships]);

  return (
    <div className="searchPage"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "3%",
        marginTop: "4%",
        marginLeft: "2%",
        marginRight: "2%"
      }}
    >
      <div className="sideBar">
        <div style={{height:"60px", display:"flex", justifyContent:"space-between", alignItems:'flex-start', borderBottom:'1px solid'}}>
          <h1 className="filterText">Filters</h1>
          <p style={{fontFamily:"Roboto", fontSize:"14px", cursor:'pointer'}}>Clear all</p>
        </div>
        <div style={{paddingBottom:'20px', borderBottom:'1px solid'}}>
          <div style={{display:"flex", justifyContent:"space-between", justifyItems:'center', paddingTop:'10px', height:'40px', paddingBottom:'12px'}}>
            <h2 className='subHeading'>Industry</h2>
            <p style={{fontFamily:"Roboto", fontSize:"14px", cursor:'pointer'}}>Clear</p>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
            <div className='checkFilter'>
              <input type='checkbox'/>
              <p>Industry 1</p>
            </div>
            <div className='checkFilter'>
              <input type='checkbox'/>
              <p>Industry 2</p>
            </div>
            <div className='checkFilter'>
              <input type='checkbox'/>
              <p>Industry 3</p>
            </div>
            <div className='checkFilter'>
              <input type='checkbox'/>
              <p>Industry 4</p>
            </div>
          </div>
        </div>
        <div style={{paddingBottom:'20px', borderBottom:'1px solid'}}>
          <div style={{display:"flex", justifyContent:"space-between", justifyItems:'center', paddingTop:'10px', height:'40px', paddingBottom:'12px'}}>
            <h2 className='subHeading'>Company</h2>
            <p style={{fontFamily:"Roboto", fontSize:"14px", cursor:'pointer'}}>Clear</p>
          </div>
        </div>
        <div style={{paddingBottom:'20px', borderBottom:'1px solid'}}>
          <div style={{display:"flex", justifyContent:"space-between", justifyItems:'center', paddingTop:'10px', height:'40px', paddingBottom:'12px'}}>
            <h2 className='subHeading'>Paid</h2>
            <p style={{fontFamily:"Roboto", fontSize:"14px", cursor:'pointer'}}>Clear</p>
          </div>
        </div>
        <div style={{paddingBottom:'20px', borderBottom:'1px solid'}}>
          <div style={{display:"flex", justifyContent:"space-between", justifyItems:'center', paddingTop:'10px', height:'40px', paddingBottom:'12px'}}>
            <h2 className='subHeading'>Location</h2>
            <p style={{fontFamily:"Roboto", fontSize:"14px", cursor:'pointer'}}>Clear</p>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column"}}>
        <input className="searchBox"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleChange}
          style={{
            width: "92%",
            height: "30px",
            fontFamily: "Roboto",
          }}
        />
        <div style={{ alignSelf: "flex-end", paddingRight: "4%", display: "flex" }}>
          <button style={{
            width: "80px",
            display: "flex",
            height: "30px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            border: "None",
            backgroundColor: "white",
            cursor:"pointer",
            marginTop:"20px"
          }}>
            <p style={{fontFamily:"Roboto", fontSize:"13px"}}>Sort by</p>
            <img className='dropdown' src={dropDown}></img>
          </button>
        </div>
        <div className="results" style={{marginTop:"25px"}}>
          {searchResults.length === 0 ? (
            <div className="noResult"><p>Sorry, no such listing exists.</p></div>
          ) : (
            searchResults.map((searchResult) => (
              <SearchResult key={searchResult.id} data={searchResult} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;