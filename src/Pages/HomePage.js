import React, { useState, useEffect} from 'react'
function HomePage() {

  const welcome ="Home Page";
  useEffect(() =>{

  });
  return (
    <form action="/action_page.php">
    <label for="birthday">Birthday:</label>
    <input type="date" id="birthday" name="birthday"/>
    <input type="submit"/>
  </form>
  
  )
}
export default HomePage;
