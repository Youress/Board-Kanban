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

  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const dClone = structuredClone(tabs);
      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
      dClone[tab].splice(taskIdx, 1);
      try {
        setLoading(true);
        await updateBoardData(boardId, dClone);
        setTabs(dClone);
        updateLastUpdated();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
    try {
      setLoading(true);
      await updateBoardData(boardId, dClone);
      setAddTaskTo("");
      setTabs(dClone);
      updateLastUpdated();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
      <DragDropContext>
        <div className="px-12 mt-6 flex">
          <div className="grid grid-cols-3 w-full">
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
