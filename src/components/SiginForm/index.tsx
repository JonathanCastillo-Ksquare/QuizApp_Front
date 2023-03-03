// Import React Stuff
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

// Styles
import './style.css'

// Context
import { useLoginContext } from '../../context/fireContext';

const SignInForm = () => {

    const context = useLoginContext();

    // Stuff to control the form
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { userName: "", email: "", password: "" } });


    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // State variables
    const [inputs, setInputs] = useState({
        userName: '',
        email: '',
        password: '',
    });
    const [invalidLoginMsg, setInvalidLoginMsg] = useState('');
    const [invalidLoginMsgVisibility, setInvalidLoginMsgVisibility] = useState(false);
    const [loginErrorCount, setLoginErrorCount] = useState(0);
    const [passVisibility, setPassVisibility] = useState(false);

    // Routes
    const toLoginView = location.pathname && `/`;

    // Handlers
    const handleFormSubmit = async (e: any) => {
        setInputs({
            userName: e.userName,
            email: e.email,
            password: e.password
        })
        // setInvalidLoginMsgVisibility(false);

        try {

            // const token = await user.user.accessToken;
            // localStorage.setItem("token", token)
            // // const uid = user.user.uid;

            // context.setUserToken(token);


            navigate(toLoginView, { replace: true })
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
        <div className="WrapperFormSignIn">
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <h2>Sign in</h2>
                <div className="Input-boxSignIn">
                    <span className="IconSignIn">
                        <i className='bx bxs-user'></i>
                    </span>
                    <input type="text" placeholder='Username' {...register('userName', { required: true })} />
                </div>
                <div className="Input-boxSignIn">
                    <span className="IconSignIn">
                        <i className='bx bxs-envelope' ></i>
                    </span>
                    <input type="email" placeholder='Email' {...register('email', { required: true })} />
                </div>
                <div className="Input-boxSignIn">
                    <span className="IconSignIn">
                        <i className='bx bxs-lock-alt'></i>
                    </span>
                    <input type="password" placeholder='Password' {...register('password', { required: true })} />
                </div>

                <button type="submit">Sign in</button>
            </form>
        </div>

    );
}

export default SignInForm