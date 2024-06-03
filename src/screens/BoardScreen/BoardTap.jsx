import React, { memo } from "react";
import Task from "./Task";
import Droppable from "../../components/utils/StrictModeDroppable";

const BoardTap = ({ name, openTask, tasks, status, removeTask }) => {
  console.log("tab", name);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="sm:pl-6 pt-6"
        >
          <div className="flex flex-col p-9 bg-black">
            <div className="flex items-center justify-between mb-4">
              <h6 className="font-bold text-3xl font-sans text-white">
                {name}
              </h6>
              <button onClick={() => openTask(status)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                text={task.text}
                id={task.id}
                status={status}
                index={index}
                removeTask={removeTask}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default memo(BoardTap);
