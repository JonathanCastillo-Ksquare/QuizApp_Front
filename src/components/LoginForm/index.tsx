// Import React Stuff
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

// Styles
import './style.css'

// Context
import { useLoginContext } from '../../context/fireContext';

const LoginForm = () => {

    const context = useLoginContext();

    // Stuff to control the form
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: "", password: "" } });


    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // State variables
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [invalidLoginMsg, setInvalidLoginMsg] = useState('');
    const [invalidLoginMsgVisibility, setInvalidLoginMsgVisibility] = useState(false);
    const [loginErrorCount, setLoginErrorCount] = useState(0);
    const [passVisibility, setPassVisibility] = useState(false);

    // Routes
    const toSettingsView = location.pathname && `/settingsView`;

    // Handlers
    const handleFormSubmit = async (e: any) => {
        setInputs({
            email: e.email,
            password: e.password
        })
        // setInvalidLoginMsgVisibility(false);

        try {
            const user = await context.logIn(e.email, e.password);

            if (!user) {
                throw new Error('No user found');
            }

            const token = await user.user.accessToken;
            localStorage.setItem("token", token)
            const uid = user.user.uid;

            context.setUserToken(token);


            navigate(toSettingsView, { replace: true })
        } catch (error) {
            console.error(error);

            //     if (loginErrorCount < 5) {
            //         setInvalidLoginMsg('Incorrect or invalid credentials.');
            //         setLoginErrorCount((prev) => prev + 1);
            //     } else {
            //         setInvalidLoginMsg('Too many attempts, try later.');
            //         setLoginErrorCount(0);
            //     }

            //     setInvalidLoginMsgVisibility(true);
        }
    };

    return (
        <div className="WrapperForm">
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <h2>Login</h2>
                <div className="Input-box">
                    <span className="Icon">
                        <i className='bx bxs-envelope' ></i>
                    </span>
                    <input type="email" placeholder='Email' {...register('email', { required: true })} />
                </div>
                <div className="Input-box">
                    <span className="Icon">
                        <i className='bx bxs-lock-alt'></i>
                    </span>
                    <input type="password" placeholder='Password' {...register('password', { required: true })} />
                </div>
                <div className="Forgot-pass">
                    <a href="">Forgot Password?</a>
                </div>

                <button type="submit">Login</button>
                <div className="Register-link">
                    <p>Don't have an account? <a href="">Register</a></p>
                </div>
            </form>
        </div>

    );
}

export default LoginForm