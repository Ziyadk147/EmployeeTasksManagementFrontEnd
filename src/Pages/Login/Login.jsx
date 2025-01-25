import {Card} from "primereact/card";
import {InputText as PrimeInputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React, {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle the login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };
    return (
        <Card title="Login" className="p-shadow-4 p-p-4" style={{ width: '300px' }}>
            <div className="mb-2">
                <label htmlFor="username">Username</label>
                <PrimeInputText
                    id="username"
                    type={"email"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-inputtext-sm w-full mb-2 mt-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password">Password</label>
                <PrimeInputText
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-inputtext-sm w-full mt-2"
                />
            </div>
            <Button label="Login" onClick={handleLogin} className="p-button-sm w-full" />
        </Card>

    )
}
export default Login