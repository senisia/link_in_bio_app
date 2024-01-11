
import PropTypes from "prop-types";
import '../styles/VideoPage.scss';
import SpotifyLink from '../components/SpotifyLink';
import DiscordLink from '../components/DiscordLink';
import SteamLink from '../components/SteamLink';

function VideoPage(props) {
  const { displayStyle, userData } = props;

  return (
    <div className="VideoPage" id="VideoPage" style={{ display: displayStyle, '--color-scheme': userData.color_scheme }}>
      <div className='socials'>
        <p id='username'>{userData.username}</p>
        <div className='icons'>
          <SpotifyLink userData={userData}></SpotifyLink>
          <DiscordLink userData={userData}></DiscordLink>
          <SteamLink userData={userData}></SteamLink>
        </div>
      </div>
        <video src={`http://localhost:8000/api/users/stream-video/${userData.user_id}`} playsInline loop autoPlay muted id="video"></video>

    </div>
  );
}

VideoPage.propTypes = {
  displayStyle: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
};

export default VideoPage;
