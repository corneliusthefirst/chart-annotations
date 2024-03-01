import React from "react"
import { useModal } from "../contexts/modal-context/modal-context"

const OnboardingModal: React.FC = () => {
  const { hideModal } = useModal()

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg px-8 py-4 md:w-1/2">
      <h2 className="text-lg font-face-mb font-bold text-gray-500 mb-4 mt-2 ">
        Onboarding Informations
      </h2>

      <div className="flex flex-col">
        <p className="font-face-sb mt-2">Part 1</p>
        <p className="text-md font-face-ml mt-2">
          Normal text addition onclick the Add Text button.View in the list and
          click on card to remove
        </p>
      </div>

      <div className="flex flex-col mt-4">
        <p className="font-face-sb">Part 2</p>
        <p className="text-md font-face-ml mt-2">
          Select a marker on chart, fill the description and view in grid below
          the selection and description associated.
        </p>
        <p className="text-md font-face-ml mt-2">
          For interval selection, first Click on the top right rectangle at
          center of toolbar tools to activate selection mode{" "}
        </p>
        <p className="text-md font-face-ml mt-2">
          Then do the selection of and interval, add the description and view the added description
          in grid below.
        </p>
      </div>

      <div className="flexflex-col  my-4">
        <button
          className="w-full px-4 py-2 bg-gradient blue text-white text-md font-face-mm rounded-md  focus:outline-none mt-2"
          onClick={hideModal}
        >
          OK Compris!
        </button>
      </div>
    </div>
  )
}

export default OnboardingModal
