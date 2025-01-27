import {Sidebar, Button, Divider, InputText , Dropdown , Chips , InputTextarea } from "primereact"
import {Calendar} from "primereact/calendar";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useEmployeeAction from "../../Redux/Employee/EmployeeActionHook.js";
import {useFormik} from "formik";

export default function TaskAdditionSidebar({visible, setVisible, id, day , tasks , setTasks}) {


    const currentYear = new Date().getFullYear();
    const fullDate = new Date(`${day}/${currentYear}`);
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const fullDateString = fullDate.toLocaleDateString('en-US', options);

    const jobs = ["HR" , "SWE"]
    const [totalTime , setTotalTime] = useState(undefined);
    const {getEmployeeById} = useEmployeeAction()
    useEffect(() => {
        if(id){
            getEmployeeById(id)
        }
    }, [id]);
    const employees = useSelector((state) => state.EmployeeReducer.selectedEmployee);
    console.log(employees )
    const formik = useFormik({
        initialValues : {
            taskDate: "",
            startTime:"",
            endTime:"",
            task: "",
            job: "",
            employeeId:null
        }
        ,
        onSubmit: (values) => {
            console.log(values)
            const date = values.taskDate;
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const dayOfMonth = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${day} ${month}/${dayOfMonth}`;
            const payload = {
                taskDate: formattedDate,
                taskDescription: values.task,
                employeeID:values.employeeId
            };
            formik.resetForm()
            setTasks([...tasks , payload])
            setVisible(false);
        }
    })
    useEffect(() => {
        if(employees){
            formik.setFieldValue("employeeId" , employees.id)
        }

    }, [employees]);

    useEffect(() => {
        if (formik.values.endTime && formik.values.startTime) {
            const endTime = formik.values.endTime.getTime();
            const startTime = formik.values.startTime.getTime();

            if (endTime > startTime) {
                const difference = endTime - startTime;

                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                let displayTime;
                if (hours > 0 && minutes === 0 && seconds === 0) {
                    displayTime = `${hours} Hours`;
                } else if (hours === 0 && minutes > 0 && seconds === 0) {
                    displayTime = `${minutes} Minutes`;
                } else if (hours === 0 && minutes === 0 && seconds > 0) {
                    displayTime = `${seconds} Seconds`;
                } else {
                    displayTime = `${hours} Hours ${minutes} Minutes`;
                }

                setTotalTime(displayTime);
            } else {
                setTotalTime("Invalid Time Range");
            }
        }
    }, [formik.values.startTime, formik.values.endTime]);

    function convertTime(date){
        const newDate = new Date(date);
        return newDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    }
    const customHeader = (
        <div className="flex align-items-center gap-2">
            <span className="font-bold">{fullDateString}</span>
        </div>
    );
    return (
        <Sidebar
            visible={visible}
            onHide={() => setVisible(false)}
            modal={true} // No modal behavior, the background will not be dimmed
            showCloseIcon={true} // No close icon inside sidebar
            position={"right"}
            header={customHeader}
            className={"w-4"}
        >
            <Divider/>
            <div className="flex  sidebar-content my-0 py-0 w-full ">
                <ul className={"flex flex-row gap-6 my-0 py-0  list-none"}>
                    <li>Shift Details</li>
                    <li>Shift Tasks</li>
                    <li>Templates</li>
                </ul>
            </div>
            <Divider/>
            <div className="flex-column  sidebar-content my-0 py-0 w-full ">
                <div className="flex-row  ">
                    <span className={"pi-calendar-plus pi mr-2"}></span>
                    <span>Date</span>
                    <Calendar name={"taskDate"} id={"taskDate"} className={" w-6 ml-4"} value={formik.values.taskDate} onChange={formik.handleChange} appendTo={"self"} dateFormat="dd/mm/yy"/>

                </div>
                <div className=" flex flex-row mt-3 justify-content-start align-items-baseline p-0 m-0 ">
                    <div className="flex flex-row align-items-baseline w-4">
                        <span className={"pi-clock pi mr-2"}></span>
                        <span>Start</span>
                        <Calendar name={"startTime"} id={"startTime"} className={"w-6 ml-4"} value={formik.values.startTime} onChange={formik.handleChange} showTime={true}  dateFormat={"yyyy/dd/mm"}
                                  appendTo={"self"} timeOnly/>
                    </div>
                    <div className="flex flex-row align-items-baseline w-4">
                        <span className={"pi-clock pi mr-2"}></span>
                        <span>End</span>
                        <Calendar name={"endTime"} id={"endTime"} className={"w-6 ml-4"} value={formik.values.endTime} onChange={formik.handleChange}   showTime={true}  dateFormat="HH:mm"
                                  appendTo={"self"} timeOnly/>
                    </div>
                    <div className="flex flex-row align-items-baseline w-4">
                        <span className={"pi-clock pi mr-2"}></span>
                        <span>{totalTime}</span>
                    </div>
                </div>
            </div>
            <Divider/>
            <div className="flex-column  sidebar-content my-0 py-0 w-full ">
                <div className="flex-row my-3 justify-content-between">
                    <span className={"mr-6"}>Shift Details</span>
                    <InputText className={"w-8"} value={formik.values.task} onChange={formik.handleChange} name={"task"} id={"task"} style={{marginLeft: "2px"}} placeholder={"Type Here"}/>
                </div>
                <div className="flex-row my-3 justify-content-between">
                    <span className={"mr-6"}>Job</span>
                    <Dropdown options={jobs} optionLabel="name"
                              placeholder="Select a Job" className="ml-7 w-8"/>
                </div>
                <Chips className={"ml-3 w-7 hidden"} value={[formik.values.employeeId]} name={"employeeId"} id={"employeeId"}
                       disabled/>
                <div className="flex-row my-3 justify-content-between ">
                    <span className={"mr-8"}>Users</span>
                    <Chips className={"ml-3 w-7"} value={employees && [`${employees.firstName} ${employees.lastName}`]}
                           disabled/>
                </div>

            </div>
            <Divider/>
            <div className="flex-column  w-full ">
                <div className="flex-row my-3 justify-content-between">
                    <Button className={"text-center"} onClick={formik.handleSubmit}>Publish</Button>
                </div>

            </div>
        </Sidebar>

    )

}