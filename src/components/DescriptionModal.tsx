import React, { useEffect, useState } from "react"
import { Description } from "../utils/types"

interface DescriptionModalProps {
  onClose: (descriptionBody: Description) => void
  description: Description
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  onClose,
  description,
}) => {
  const [text, setText] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  const handleButtonClick = () => {
    onClose({ ...description, text: text })
    setText("")
  }

  return (
    <div className="py-3 px-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-lg font-face-mb font-bold text-gray-500 mb-4">
        Add a description
      </h2>
      <textarea
        className="w-full md:w-64 border border-gray-300 rounded-md p-2 mb-4 focus:border-2 focus:border-blue-500"
        rows={4}
        placeholder="Enter your text here..."
        value={text}
        onChange={handleChange}
      />
      <div className="flex mb-2">
        <button
          className="w-full px-4 py-2 bg-gradient blue text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleButtonClick}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default DescriptionModal
