import { useEffect, useState } from "react";
import HomePage from "../parts/HomePage";
import VideoPage from "../parts/VideoPage";
import '../styles/UserPage.scss';
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "./ErrorPage";

function Home() {
    const [videoPageDisplayStyle, setVideoPageDisplayStyle] = useState("none");
    const [homePageDisplayStyle, setHomePageDisplayStyle] = useState("flex");
    const { username } = useParams();
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/get_user_by_username?username=${username}`)
            .then(res => {
                setUserData(res.data);
                setLoading(false);
                if (res.data.message) {
                  setErrorMessage(res.data.message)
                  setErrorStatus(true)
                }
            })
            .catch(err => {
                setErrorStatus(true);
                setErrorMessage(err.message);
                setLoading(false);
            });
    }, [username]);

    function playVideo() {
        const videoElement = document.getElementById('video');
        const videoContainer = document.getElementById('VideoPage');

        if (videoElement) {
            if (videoElement.muted) {
                videoElement.muted = false;
                videoElement.volume = 0.2;
                videoContainer.style.opacity = 1;
                videoElement.play();
            }
        }
    }

    if (loading) {
        return (
          <div className="loading-container">
            <p className="loading-text">Loading...</p>
          </div>
        )
    }

    if (errorStatus) {
        return (
            <ErrorPage errorMessage={errorMessage}></ErrorPage>
        );
    }

    const userDataObj = Object.assign({}, userData);

    function handleClick() {
      setVideoPageDisplayStyle("block");
      setHomePageDisplayStyle("none");
      playVideo();
  }


    return (
        <div className="UserPage">
            <HomePage onClick={handleClick} displayStyle={homePageDisplayStyle} userData={userDataObj}/>
            <VideoPage displayStyle={videoPageDisplayStyle} userData={userDataObj}/>
        </div>
    );
}

export default Home;
