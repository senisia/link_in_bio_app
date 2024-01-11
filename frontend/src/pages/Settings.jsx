import { Input } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import '../styles/Settings.scss'
import { HexColorPicker } from 'react-colorful';
import ErrorPage from "./ErrorPage";
import NavBar from "../components/NavBar";

function Settings() {
    const apiUrl = "http://localhost:8000/api/users/update_user_preferences";
    const [token, setToken] = useState(false);
    const [color_scheme, setColorScheme] = useState("");
    const [spotify_link, setSpotifyLink] = useState("");
    const [discord_link, setDiscordLink] = useState("");
    const [steam_link, setSteamLink] = useState("");
    const [loading, setLoading] = useState(true);
    const [video, setVideo] = useState(null); // Initialize video state to null
    
    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setLoading(false);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();


        await axios.post(apiUrl, { token, spotify_link, discord_link, steam_link, color_scheme })
            .then(res => console.log(res))
            .catch(err => console.error(`An error was encountered: ${err}`));


        await axios.post(`http://localhost:8000/api/users/upload_video?token=${token}`, { 'video': video}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    if (loading) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading...</p>
            </div>
        );
    } else if (token === null) {
        return (
            <ErrorPage errorMessage="You are not signed in." />
        );
    } else {
        return (
            <>
                <NavBar></NavBar>
                <div className="Settings">
                    <div className="form-container-profile">
                        <form onSubmit={handleSubmit} className="form-profile">
                            <span>Enter color scheme:</span>
                            <HexColorPicker onChange={setColorScheme} color={color_scheme} />
                            <Input type="text" onChange={e => setSpotifyLink(e.target.value)} placeholder="Spotify link" />
                            <Input type="text" onChange={e => setDiscordLink(e.target.value)} placeholder="Discord link" />
                            <Input type="text" onChange={e => setSteamLink(e.target.value)} placeholder="Steam link" />
                            <label htmlFor="upload-button">Choose File</label>
                            <input type="file" accept="video/*" id="upload-button" onChange={e => setVideo(e.target.files[0])}></input>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Settings;
