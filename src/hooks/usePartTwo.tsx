import { debounce } from "lodash"
import DescriptionModal from "../components/DescriptionModal"
import { addDescription } from "../store/slices/partTwoSlice"
import { Description, Point } from "../utils/types"
import { useCallback, useEffect, useRef, useState } from "react"
import { useModal } from "../contexts/modal-context/modal-context"
import { useAppDispatch, useAppSelector } from "../store"
import { selectPartTwo } from "../store/selectors"

export const usePartTwo = () => {
  const chartRef = useRef<any>(null)
  const { showModal, hideModal } = useModal()
  const dispatch = useAppDispatch()
  const partTwoData = useAppSelector(selectPartTwo)
  const stockData = partTwoData?.stockData || []
  const isLoading = partTwoData?.isLoading || false
  const [chartOptions, setChartOptions] = useState<
    ApexCharts.ApexOptions | undefined
  >({
    states: {
      active: {
        allowMultipleDataPointsSelection: true,
      },
    },
    chart: {
      id: "stock-chart",
      type: "area",
      events: {
        markerClick: function (_, __, { dataPointIndex }) {
          handleDataPointClick(dataPointIndex)
        },
        selection: (_, config) => {
          const { xaxis } = config
          handleIntervalSelect({ start: xaxis.min, end: xaxis.max })
        },
      },
      selection: {
        enabled: true,
        xaxis: {
          min: undefined,
          max: undefined,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    markers: {
      size: 4,
    },
  })

  const handleSaveDescription = useCallback(
    (description: Description | null) => {
      description && dispatch(addDescription(description))
      hideModal()
      setChartOptions((prev) => ({
        ...prev,
        chart: {
          ...prev?.chart,
          selection: {
            xaxis: {
              min: new Date().getTime(),
              max: undefined,
            },
          },
        },
      }))
    },
    [dispatch, hideModal]
  )

  const handleDataPointClick = useCallback(
    (dataPointIndex: number) => {
      const point: Point = stockData[dataPointIndex]

      const newDescription: Description = {
        id: new Date().getTime(),
        type: "point",
        data: [point],
        text: "",
      }

      showModal(
        <DescriptionModal
          onClose={handleSaveDescription}
          description={newDescription}
        />
      )
    },
    [showModal, handleSaveDescription, stockData]
  )

  const handleIntervalSelect = debounce((interval: any) => {
    const { start, end } = interval
    // filter selected points and sort in ascending date
    const selectedPoints = stockData.filter(
      (element) => element.x >= start && element.x <= end
    )

    const newDescription: Description = {
      id: new Date().getTime(),
      type: "interval",
      data: selectedPoints,
      text: "",
    }
    if (selectedPoints.length > 0) {
      showModal(
        <DescriptionModal
          onClose={handleSaveDescription}
          description={newDescription}
        />
      )
    }
  }, 1000)

  useEffect(() => {}, [chartOptions])

  return {
    chartRef,
    stockData,
    chartOptions,
    isLoading,
  }
}
