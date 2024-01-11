import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'


function SpotifyLink(props) {
    const userData = props.userData

    if (userData.spotify_link) {    
        return (
            <a href={userData.spotify_link} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faSpotify} size='2xl' color='white' className='inline-icons'></FontAwesomeIcon>
            </a>
        )}
}

SpotifyLink.propTypes = {
    userData: PropTypes.object.isRequired
}


export default SpotifyLink