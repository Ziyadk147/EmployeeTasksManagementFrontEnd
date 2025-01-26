import {Button} from "primereact/button";
import React from "react";
import {useDrag} from "react-dnd";

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
export default DraggableTask