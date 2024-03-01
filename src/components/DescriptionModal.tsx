import React, {  useState } from "react"
import { Description } from "../utils/types"

interface DescriptionModalProps {
  onClose: (descriptionBody: Description | null ) => void
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

  const handleSave = () => {
    onClose({ ...description, text: text })
    setText("")
  }

  const handleCancel = () => {
    onClose(null)
    setText("")
  }

  return (
    <div className="bg-white rounded-xl shadow-lg px-8 py-4">
      <h2 className="text-lg font-face-mb font-bold text-gray-500 mb-4 ">
        Add a description
      </h2>
      <textarea
        className="w-full md:w-64 border border-gray-300 rounded-md p-2 mb-4 focus:border-2 focus:border-blue-500"
        rows={4}
        placeholder="Enter your text here..."
        value={text}
        onChange={handleChange}
      />
      <div className="flexflex-col  mb-2">
        <button
          className="w-full px-4 py-2 bg-gradient blue text-white text-md font-face-mm rounded-md  focus:outline-none"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="w-full px-4 py-2 bg-gradient red text-white text-md font-face-mm rounded-md  focus:outline-none mt-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DescriptionModal
