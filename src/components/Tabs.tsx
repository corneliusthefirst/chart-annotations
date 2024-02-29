import React, { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { selectPartTwo } from "../store/selectors"
import { clearError } from "../store/slices/partTwoSlice"

type Tab = {
  id: number
  title: string
  content: React.ReactNode
}

type TabsProps = {
  tabs: Tab[]
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id)
  const dispatch = useAppDispatch()
  const { error } = useAppSelector(selectPartTwo)

  const Tab = ({ tab, index }: { tab: Tab; index: number }) => {
    const tabStyle = useMemo(
      () =>
        activeTab === tab.id
          ? "bg-gradient blue text-white"
          : "bg-gray-300 hover:bg-gray-300 shadow-md rounded text-gray-800",
      [activeTab]
    )

    useEffect(() => {
      let timeout: NodeJS.Timeout
      if (error) {
        // Set timeout to clear the error after 1 seconds
        timeout = setTimeout(() => {
          dispatch(clearError())
        }, 1000)
      }

      return () => clearTimeout(timeout)
    }, [error])

    return (
      <button
        key={tab.id}
        className={`font-face-mb font-bold py-2 px-8 my-8 text-sm ${index === tabs.length - 1 ? "ml-8" : ""} ${tabStyle} `}
        onClick={() => {
          setActiveTab(tab.id)
        }}
      >
        {tab.title}
      </button>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center overflow-x-auto lg:overflow-x-hidden">
        {tabs.map((tab, index) => (
          <Tab key={tab.id} tab={tab} index={index} />
        ))}
      </div>
      {error && (
        <div className="flex justify-center items-center w-full">
          <p className="text-md text-red-500">{error}</p>
        </div>
      )}
      <div className="flex justify-center mt-8">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default Tabs
