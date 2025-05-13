import './../../assets/styles/LoginBtn.css';
import { Link } from 'react-router-dom';


function LoginButton(props) {

    return (
        <div>
            <Link to={props.desti}>
                <button class="btn">
                    {props.title}
                </button>
            </Link>
        </div>
    )
}
export default LoginButton;