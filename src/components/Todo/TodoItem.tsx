import React, { useCallback } from "react"
import { Todo } from "../../utils/types"

interface TodoItemProps {
  todo: Todo
  onRemove: (todo: Todo) => void
}

const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo, onRemove }) => {
  const handleRemove = useCallback(() => {
    onRemove(todo)
  }, [onRemove, todo])

  return (
    <li
      onClick={handleRemove}
      className="bg-gray-100 hover:bg-gray-200 shadow-md rounded w-full py-6 px-6 mt-8"
    >
      <p className="text-gray-700 text-md font-face-ms font-bold capitalize">
        {todo.text}
      </p>
    </li>
  )
})

export default TodoItem
