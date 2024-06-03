import React, { useCallback, useState } from "react";
import BoardTap from "./BoardTap";
import AddTaskModal from "./AddTaskModal";
import useApp from "../../Hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import { setToaster } from "../../features/redux/UserSlice";
import { useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

const BoardInterface = ({ dataBoard, boardId, updateLastUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(dataBoard);
  const { updateBoardData } = useApp();
  const dispatch = useDispatch();

  const statusMap = {
    todos: "Todos",
    inProgress: "In Progress",
    completed: "Completed",
  };

  const handleUpdateBoardData = async (dClone) => {
    try {
      setLoading(true);
      await updateBoardData(boardId, dClone);
      setTabs(dClone);
      updateLastUpdated();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      dispatch(setToaster("Board Updated"))
    }
  };

  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const dClone = structuredClone(tabs);
      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
      dClone[tab].splice(taskIdx, 1);
      await handleUpdateBoardData(dClone);
    },
    [tabs]
  );

  const handleOpenTaskModule = useCallback(
    (status) => setAddTaskTo(status),
    []
  );
  const handleAddTask = async (text) => {
    if (!text.trim()) return dispatch(setToaster("Please fill the input"));
    const dClone = structuredClone(tabs);
    dClone[addTaskTo].unshift({ text, id: crypto.randomUUID() });
    await handleUpdateBoardData(dClone);

    setAddTaskTo("");
  };

  const handleDnd = async ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const dClone = structuredClone(tabs);
    //remove task task from tap 1
    const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);
    // add it to tab 2
    dClone[destination.droppableId].splice(destination.index, 0, draggedTask);
    await handleUpdateBoardData(dClone);
  };
  if (loading) return <AppLoader />;
  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
          loading={loading}
        />
      )}
      <DragDropContext onDragEnd={handleDnd}>
        <div className="sm:px-12 mt-6 flex px-6">
          <div className="grid sm:grid-cols-3 w-full">
            {Object.keys(statusMap).map((status) => (
              <BoardTap
                key={status}
                status={status}
                tasks={tabs[status]}
                name={statusMap[status]}
                openTask={handleOpenTaskModule}
                removeTask={handleRemoveTask}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default BoardInterface;
