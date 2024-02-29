// PartTwo.tsx
import React, { useRef } from "react"
import Chart from "react-apexcharts"
import Grid from "../components/Grid"
import { usePartTwo } from "../hooks/usePartTwo"
import Loader from "../components/Loader"

const PartTwo: React.FC = React.memo(() => {
  const { stockData, chartOptions, isLoading, chartRef } = usePartTwo()

  return (
    <div className="w-full max-w-screen-lg mx-auto overflow-y-scroll h-[calc(100vh-170px)] md:h-[calc(100vh-165px)]">
      <h2 className="text-xl text-white font-bold mb-4">
        Microsoft (MSFT) Stock Price
      </h2>
      {stockData.length > 0 && (
        <>
          {isLoading && (
            <div className="flex justify-center items-center bg-gray-100 p-4 shadow-md rounded-lg min-h-96 mb-8">
              <Loader />
            </div>
          )}

          <div className="flex flex-col bg-white p-4 shadow-md rounded-lg min-h-96">
            <Chart
              ref={chartRef}
              type="line"
              series={[{ name: "Stock Price", data: stockData }]}
              options={chartOptions}
              height={400}
            />
          </div>

          <div className="flex flex-col bg-white p-4 shadow-md rounded-lg my-8">
            <Grid />
          </div>
        </>
      )}
    </div>
  )
})

export default PartTwo
