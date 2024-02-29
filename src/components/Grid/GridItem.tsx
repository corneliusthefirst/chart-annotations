import moment from "moment"
import React from "react"
import { Description } from "../../utils/types"

interface GridItemProps {
  item: Description
}

const GridItem: React.FC<GridItemProps> = ({ item }) => {
  return (
    <tr className="flex flex-col-reverse md:flex-row">
      <td className="md:px-6 py-4">
        <ul className="flex flex-wrap justify-start md:w-96">
          {item.data.map((point) => (
            <li
              key={point.x}
              className="flex items-center justify-center bg-gray-200 font-face-sb font-semibold text-xs rounded-full py-1 mt-2 ml-1 px-4"
            >
              {moment(point.x).format("YYYY-MM-DD")}:
              <span>
                <p className="bg-gradient blue inline-block text-transparent bg-clip-text shadow-none px-1">
                  {point.y}
                </p>
              </span>
            </li>
          ))}
        </ul>
      </td>
      <td className="flex flex-1 justify-start mt-4  py-4">
        {item?.text[0]?.toLocaleUpperCase() + item?.text.slice(1)}
      </td>
    </tr>
  )
}

export default GridItem
