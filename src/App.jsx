import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText as PrimeInputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Login from "./Pages/Login/Login.jsx";

export default function App() {


    return (
        <div className="flex justify-content-center align-items-center bg-gray-100" style={{ height: '98vh' }}>
            <Login></Login>
        </div>
    );
}
