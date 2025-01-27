import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {useFormik} from "formik";
import useEmployeeAction from "../../Redux/Employee/EmployeeActionHook.js";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import useLoginAction from "../../Redux/Login/LoginActionHook.js";

const EmployeesCreate = () => {
    const {addEmployee , getEmployeeById , UpdateEmployee} = useEmployeeAction()
    const id = useParams().id
    useEffect(() => {
        if(id){
            getEmployeeById(id)
        }
    }, [id]);
    const employees = useSelector((state) => state.EmployeeReducer.selectedEmployee);
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }
    }, [isAuthenticated]);

    const formik = useFormik({
        initialValues: {
            email : "",
            firstName:"",
            lastName: "",
        }   ,
        validate: (values) => {
            const errors = {};

            // Email validation
            if (!values.email) {
                errors.email = "Email is required.";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address.";
            }

            // First Name validation
            if (!values.firstName) {
                errors.firstName = "First Name is required.";
            } else if (values.firstName.length < 2) {
                errors.firstName = "First Name must be at least 2 characters long.";
            }

            // Last Name validation
            if (!values.lastName) {
                errors.lastName = "Last Name is required.";
            } else if (values.lastName.length < 2) {
                errors.lastName = "Last Name must be at least 2 characters long.";
            }

            return errors;
        },
        onSubmit: async (values) => {
            if(id){
                await UpdateEmployee(values , parseInt(id))
            }
            else{
                await addEmployee(values)

            }
        },
    })
    const header = (
        <div className="flex pl-3  text-center">
            <h2>{id ? "Edit" : "Create"} Employee</h2>
        </div>
    )
    useEffect(() => {
        if(employees){
            formik.setFieldValue("email" , employees.email)
            formik.setFieldValue("firstName" , employees.firstName)
            formik.setFieldValue("lastName" , employees.lastName)
        }
    } , [employees])

    return (
        <div className="flex justify-content-center align-items-center w-full mt-5">
            <Card header={header} className="w-9">
                <div>
                    {/* Email Field */}
                    <label htmlFor="email" className="block text-900 font-medium mb-3 mt-3">
                        Email
                    </label>
                    <InputText
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Email address"
                        className={`w-full  ${formik.errors.email && formik.touched.email ? "p-invalid" : ""}`}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <small className="p-error">{formik.errors.email}</small>
                    )}

                    {/* First Name Field */}
                    <label htmlFor="firstName" className="block text-900 font-medium mb-3 mt-3">
                        First Name
                    </label>
                    <InputText
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        className={`w-full ${
                            formik.errors.firstName && formik.touched.firstName ? "p-invalid" : ""
                        }`}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <small className="p-error">{formik.errors.firstName}</small>
                    )}

                    {/* Last Name Field */}
                    <label htmlFor="lastName" className="block text-900 font-medium mb-3 mt-3">
                        Last Name
                    </label>
                    <InputText
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        className={`w-full ${
                            formik.errors.lastName && formik.touched.lastName ? "p-invalid" : ""
                        }`}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <small className="p-error">{formik.errors.lastName}</small>
                    )}

                    {/* Submit Button */}
                </div>
                <Button label={id ? "Update User" : "Create User"} icon="pi pi-user" type="submit" onClick={formik.handleSubmit} className="w-2 mt-4"/>

            </Card>
        </div>
    )
}

export default EmployeesCreate