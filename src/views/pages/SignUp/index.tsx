import { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { awsConfiguration } from '../../../../awsConfiguration'
import { Credentials } from '@aws-amplify/core'
Amplify.Logger.LOG_LEVEL = 'DEBUG'
Amplify.register(Auth);
Amplify.register(Credentials);
Amplify.configure({ Auth: { awsConfiguration } });
// Auth.configure(awsConfiguration);

export const SignUpPage = () => {



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const newUser = await Auth.signUp({
                username: email,
                password: password,
            });
            console.log('auth!!!!!!');
            console.log(newUser);
            onSignUpSuccess();
        } catch (error) {
            console.log('Error signing up: ', error);
        }
    };

    const onSignUpSuccess = () => {
        console.log('Sign up successful!');
    };
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('post');
        handleSignUp();
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            email
                            <input type="text" name='email' value={email} onChange={handleEmail} />
                        </label>
                    </div>
                    <div>
                        <label>
                            password
                            <input type="password" name='password' value={password} onChange={handlePassword} />
                        </label>
                    </div>
                    <button type='submit'>submit</button>
                </form>
            </div>
        </div>
    );
};