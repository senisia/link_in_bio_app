import React, { useEffect } from 'react'
import '../styles/Panel.scss'
import axios from 'axios';

function Panel() {

  const [pageState, setPageState] = "passive";

  useEffect(() => {

    const token = localStorage.getItem("token");

    axios.post("http://127.0.0.1:8000/api/get_state" , {token: token})
    .then(res => {
      setPageState(res.data.state);
      console.log(res);
    });

  });

  return (
    <div className='Panel'>
      Your page is: {pageState}
    </div>
  )
}

export default Panel