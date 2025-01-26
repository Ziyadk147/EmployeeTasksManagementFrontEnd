import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import TaskAdditionSidebar from "../../Components/Sidebar/TaskAdditionSidebar.jsx";
import { useSelector } from "react-redux";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskManagement = () => {
    const [sidebarData, setSidebarData] = useState({ id: null, day: null });
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const days = ["Mon 01/20", "Tue 01/21", "Wed 01/22", "Thu 01/23", "Fri 01/24", "Sat 01/25", "Sun 01/26"];
    const employees = useSelector((state) => state.EmployeeReducer.employees);

    const [tasks, setTasks] = useState([
        { id: 5, day: "Mon 01/20", task: "Do something" },
        { id: 5, day: "Mon 01/20", task: "Additional Task" },
        { id: 6, day: "Tue 01/21", task: "Work on project" },
    ]);

    const handleTaskAddition = (id, day) => {
        setSidebarData({ id, day });
        setSidebarVisible(true);
    };

    const DraggableTask = ({ task }) => {
        const [, dragRef] = useDrag({
            type: "TASK",
            item: { id: task.id, day: task.day, task: task.task },
        });

        return (
            <Button ref={dragRef} className="p-button-text bg-primary w-full">
                {task.task}
            </Button>
        );
    };

    const DroppableCell = ({ rowData, day }) => {
        const [, dropRef] = useDrop({
            accept: "TASK",
            drop: (item) => handleTaskDrop(item.id, rowData.id, day, item.task),
        });

        const filteredTasks = tasks.filter((task) => task.id === rowData.id && task.day === day);

        return (
            <div ref={dropRef} className="flex flex-wrap gap-2 justify-center items-center h-full relative group">
                {filteredTasks.map((task, index) => (
                    <DraggableTask key={index} task={task} />
                ))}
                <Button
                    icon="pi pi-plus"
                    className="p-button-rounded p-button-text"
                    onClick={() => handleTaskAddition(rowData.id, day)}
                />
            </div>
        );
    };

    // Handle task drop logic
    const handleTaskDrop = (taskId, rowId, newDay, taskDescription) => {
        setTasks((prevTasks) => {
            // Remove the task from its original position
            const updatedTasks = prevTasks.filter((task) => !(task.id === taskId && task.task === taskDescription));

            // Add the task to the new position
            updatedTasks.push({ id: rowId, day: newDay, task: taskDescription });

            return updatedTasks;
        });
    };

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

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
                        <Button label="Publish" icon="pi pi-check" className="p-button-primary" onClick={() => console.log(tasks)} />
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
