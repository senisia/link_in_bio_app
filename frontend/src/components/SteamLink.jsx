import { faSteam } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types'


function SteamLink(props) {
    const userData = props.userData

    if (userData.steam_link) {    
        return (
            <a href={userData.steam_link} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faSteam} size='2xl' color='white' className='inline-icons'></FontAwesomeIcon>
            </a>
        )}
}

SteamLink.propTypes = {
    userData: PropTypes.object.isRequired
}


export default SteamLink