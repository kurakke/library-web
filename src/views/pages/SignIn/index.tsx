import { useState } from "react";
import { DefaultLayout } from "~/ui/layouts/Default";
import React from "react";
import { useAuth } from "~/features/auth/hooks/useAuth";
import {Heading} from "~/ui/components/Heading";

export const SignInPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const auth = useAuth();

    const handleSignIn = async () => {
        try {
            const user = await auth.signIn(email, password);
            console.log('auth!!!!!!');
            console.log(user);
        } catch (error) {
            console.log('Error signing in: ', error);
        }
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        event.preventDefault();
        handleSignIn();
    }
    return (
        <DefaultLayout disableCtrls>
            <div className="flex flex-col justify-center px-30">
            <Heading>ログイン</Heading>
                <div　className="text-gray-dark font-black">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-20 mb-12">
                        <div>メールアドレス</div>
                        <label>
                            <input className="w-370 h-40 px-10 border rounded"　type="text" name='email' value={email} onChange={handleEmail} />
                        </label>
                    </div>
                    <div　className="mt-20 mb-12">
                        <div>パスワード</div>
                        <label>
                            <input className="w-370 h-40 px-10 border rounded"　type="password" name='password' value={password} onChange={handlePassword} />
                        </label>
                    </div>
                    <div className="flex justify-center mt-20">
                        <button className="w-200 h-40 bg-brand-green text-white rounded" type='submit'>保存</button>
                    </div>
                </form>
            </div>
            </div>
            </div>

        </DefaultLayout>
    );
};
