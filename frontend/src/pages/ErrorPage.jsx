import { useParams } from "react-router-dom";
import '../styles/ErrorPage.scss';
import PropTypes from 'prop-types';
import NavBar from "../components/NavBar";

function ErrorPage(props) {
    const { errorMessage } = props;
    const { username } = useParams();

    if (errorMessage === "User is not in the database") {
        return (
            <>
            <NavBar/>
            <div className="ErrorPage">
                <div className="error-container">
                    <p className="error-text"><span className="username">{username}</span> is not a user</p>
                </div>
            </div>
            </>
        );
    } else {
        return (
            <>
            <NavBar/>
            <div className="unknown-error-container">
                <p className="unknown-error-text">{errorMessage}</p>
            </div>
            </>
        );
    }
}

ErrorPage.propTypes = {
    errorMessage: PropTypes.string.isRequired
};

export default ErrorPage;
