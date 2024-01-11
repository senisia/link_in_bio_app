import '../styles/HomePage.scss'
import PropTypes from 'prop-types'

function HomePage(props) {
    const { displayStyle, onClick, userData } = props; // Destructure displayStyle and onClick from props

    function handleClick() {
        if (onClick) {
            onClick();
        }
    }


    return (
        <div className="HomePage" onClick={handleClick} style={{ display: displayStyle, '--color-scheme': userData.color_scheme }}>
            <div className='overlay'>
                <p> click </p>
            </div>
        </div>
    );
}

HomePage.propTypes = {
    onClick: PropTypes.func.isRequired,
    displayStyle: PropTypes.string.isRequired,
    userData: PropTypes.object.isRequired
};

export default HomePage