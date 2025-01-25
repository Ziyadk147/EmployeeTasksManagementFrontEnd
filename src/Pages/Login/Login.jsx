import {Card} from "primereact/card";
import {InputText as PrimeInputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React, {useState} from "react";
import {useFormik} from "formik";
import useLoginAction from "../../Redux/Login/LoginActionHook.js";
import {useSelector} from "react-redux";
const Login = () => {
    const {login } = useLoginAction()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: (values) => {
            const errors = {}
            if (!values.email) {
                errors.email = "Email is Required"
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = "Password is required"
            } else if (values.password < 6) {
                errors.password = "Password Length must be greater than 6"
            }
            return errors
        },
        onSubmit: async (values) => {
           await login(values);
        }
    })
    return (
        <Card title="Login" className="p-shadow-4 p-p-4" style={{width: '300px'}}>
            <div className="mb-2">
                <label htmlFor="EMAIL">Email</label>
                <PrimeInputText
                    id="email"
                    type={"email"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="p-inputtext-sm w-full mb-2 mt-2"
                />
                {formik.errors.email && formik.touched.email && (
                    <span className={"text-red-500"}>{formik.errors.email}</span>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="password">Password</label>
                <PrimeInputText
                    id="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="p-inputtext-sm w-full mt-2"
                />
                {formik.errors.password && formik.touched.password && (
                    <span className={"text-red-500"}>{formik.errors.password}</span>
                )}
            </div>
            <Button label="Login" onClick={formik.handleSubmit} className="p-button-sm w-full"/>
        </Card>

    )
}
export default Login