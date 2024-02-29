import React, { useState, useCallback } from "react"
import { addTodo, removeTodo } from "../store/slices/partOneSlice"
import { useAppDispatch, useAppSelector } from "../store"
import { Todo } from "../utils/types"
import { selectPartOne } from "../store/selectors"
import TodoItem from "../components/Todo/TodoItem"

const PartOne: React.FC = () => {
  const [newText, setNewText] = useState<string>("")
  const { todos = [] } = useAppSelector(selectPartOne)
  const dispatch = useAppDispatch()

  const handleAddTodo = useCallback(() => {
    if (newText.trim() !== "") {
      const newTodo = {
        text: newText,
        id: new Date().getTime(),
      }
      dispatch(addTodo(newTodo))
      setNewText("")
    }
  }, [dispatch, newText])

  const handleTodoOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setNewText(value)
    },
    []
  )

  const handleRemoveTodo = useCallback(
    (todo: Todo) => {
      dispatch(removeTodo(todo.id))
    },
    [dispatch]
  )

  return (
    <div className="flex flex-1 flex-col mx-2 max-w-xl">
      <div className="flex flex-col md:flex-row ">
        <input
          type="text"
          value={newText}
          className="h-10 flex flex-1 shadow-md rounded-md px-4 py-2 focus:border-2 focus:border-blue-500"
          onChange={handleTodoOnChange}
          placeholder="Enter new text"
        />
        <button
          className="font-face-ms font-bold py-2 px-8 mt-8 md:mt-0 md:ml-8 bg-gradient blue text-white"
          onClick={handleAddTodo}
        >
          Add Text
        </button>
      </div>
      <div className="h-[calc(100vh-320px)] md:h-[calc(100vh-250px)] overflow-y-scroll flex justify-center w-full mt-8">
        {todos.length > 0 ? (
          <ul className="w-full">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onRemove={handleRemoveTodo} />
            ))}
          </ul>
        ) : (
          <div>
            <p className="text-white font-face-mb text-xl mt-24">
              No text added yet
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PartOne
