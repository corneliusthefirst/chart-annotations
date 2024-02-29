import React from "react"
import { useAppSelector } from "../../store"
import GridItem from "./GridItem"
import { selectPartTwo } from "../../store/selectors"

const Grid: React.FC = () => {
  const { descriptions = [] } = useAppSelector(selectPartTwo)

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 ">
        <tr className="hidden md:block ">
          <th
            scope="col"
            className="w-96 px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Selections
          </th>
          <th
            scope="col"
            className=" px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Description
          </th>
        </tr>
        <tr className="block md:hidden">
          <th
            scope="col"
            className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Description And Selected Points
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {descriptions.map((item) => (
          <GridItem item={item} key={item.id} />
        ))}
      </tbody>
    </table>
  )
}

export default Grid
