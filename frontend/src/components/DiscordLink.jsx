import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types'


function DiscordLink(props) {
    const userData = props.userData

    if (userData.discord_link) {    
        return (
            <a href={userData.discord_link} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faDiscord} size='2xl' color='white' className='inline-icons'></FontAwesomeIcon>
            </a>
        )}
}

DiscordLink.propTypes = {
    userData: PropTypes.object.isRequired
}


export default DiscordLink