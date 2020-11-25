import React, { useState, useCallback } from "react";

export default function DelayedCount() {
    const [count, setCount] = useState(1);
  
    function handleClickAsync() {
      setTimeout(function delay() {
        setCount(count => count + 1);
        console.log(count)
      }, 1000);
    }
  
  

    function handleClickSync() {
        
      setCount(count + 1);
      
    //   console.log(count)
    }
  
    return (
      <div>
        <p>{count}</p>
        <button onClick={handleClickAsync}>Increase async</button>
        <button onClick={handleClickSync}>Increase sync</button>
      </div>
    );
  }