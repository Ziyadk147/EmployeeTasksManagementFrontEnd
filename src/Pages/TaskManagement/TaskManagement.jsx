import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import TaskAdditionSidebar from "../../Components/Sidebar/TaskAdditionSidebar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useTaskAction from "../../Redux/Task/TaskActionHook.js";
import useLoginAction from "../../Redux/Login/LoginActionHook.js";
import {useNavigate} from "react-router-dom";

const TaskManagement = () => {
    const [sidebarData, setSidebarData] = useState({ id: null, day: null });
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const { getTasks, addTask } = useTaskAction();
    const days = ["Mon 01/20", "Tue 01/21", "Wed 01/22", "Thu 01/23", "Fri 01/24", "Sat 01/25", "Sun 01/26"];
    const employees = useSelector((state) => state.EmployeeReducer.employees);
    const reduxTasks = useSelector((state) => state.TaskReducer.tasks);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.LoginReducer.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        getTasks();
    }, []);
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }
    }, [isAuthenticated]);

    const [tasks, setTasks] = useState(reduxTasks);

    useEffect(() => {
        setTasks(reduxTasks); // Sync redux tasks to local state
    }, [reduxTasks]);

    console.log(tasks)
    const handleTaskAddition = (id, day) => {
        setSidebarData({ id, day });
        setSidebarVisible(true);
    };

    const DraggableTask = ({ task }) => {
        const [, dragRef] = useDrag({
            type: "TASK",
            item: {
                employeeID: task.employeeID,
                day: task.taskDate,
                taskDescription: task.taskDescription,
            },
        });

        return (
            <Button ref={dragRef} className="p-button-text bg-primary w-full">
                {task.taskDescription}
            </Button>
        );
    };


    const DroppableCell = ({ rowData, day }) => {
        const [, dropRef] = useDrop({
            accept: "TASK",
            drop: (item) => handleTaskDrop(item.employeeID, rowData.id, day, item.taskDescription),
        });

        // Filter tasks by employeeID and taskDate
        const filteredTasks = tasks.filter(
            (task) => task.employeeID === rowData.id && task.taskDate === day
        );

        return (
            <div ref={dropRef} className="flex flex-wrap gap-2 justify-center items-center h-full relative group">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => (
                        <DraggableTask key={index} task={task} />
                    ))
                ) : (
                    <Button
                        icon="pi pi-plus"
                        className="p-button-rounded p-button-text"
                        onClick={() => handleTaskAddition(rowData.id, day)}
                    />
                )}

            </div>
        );
    };


    const handleTaskDrop = (taskId, rowId, newDay, taskDescription) => {
        const updatedTasks = tasks.map((task) => {
            if (task.employeeID === taskId && task.taskDescription === taskDescription) {
                return { ...task, employeeID: rowId, taskDate: newDay };
            }
            return task;
        });

        setTasks(updatedTasks);
        dispatch({ type: "UPDATE_TASKS", payload: updatedTasks });
    };


    function handleTaskSubmit(tasks) {
        if (tasks.length !== -1) {
            console.log(JSON.stringify(tasks));
            addTask(JSON.stringify(tasks));
        }
    }

    const renderDayColumn = (day) => (
        <Column
            key={day}
            field={day}
            header={<div className="text-center text-sm font-medium">{day}</div>}
            body={(rowData) => <DroppableCell rowData={rowData} day={day} />}
        />
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-4 w-full">
                <div className="flex mb-4">
                    <h2 className="text-xl font-semibold">Job Scheduler</h2>
                    <div className="flex w-10 justify-content-end gap-2">
                        <Button label="Templates" className="p-button-outlined" />
                        <Button label="Actions" className="p-button-outlined" />
                        <Button label="Add" className="p-button-outlined" />
                        <Button label="Publish" icon="pi pi-check" className="p-button-primary" onClick={() => handleTaskSubmit(tasks)} />
                    </div>
                </div>

                <TaskAdditionSidebar
                    visible={sidebarVisible}
                    setVisible={setSidebarVisible}
                    tasks={tasks}
                    setTasks={setTasks}
                    id={sidebarData.id}
                    day={sidebarData.day}
                />

                <DataTable value={employees} responsiveLayout="scroll" className="shadow-4" showGridlines paginator rows={4}>
                    <Column
                        field="name"
                        header={<div className="text-center text-sm font-medium">Unassigned Shifts</div>}
                        body={(rowData) => (
                            <div className="flex items-center gap-4">
                                <Avatar label={rowData.firstName[0]} shape="circle" className="bg-blue-500 text-white" />
                                <span>{`${rowData.firstName} ${rowData.lastName}`}</span>
                            </div>
                        )}
                    />
                    {days.map((day) => renderDayColumn(day))}
                </DataTable>
            </div>

        </DndProvider>
    );
};

export default TaskManagement;
