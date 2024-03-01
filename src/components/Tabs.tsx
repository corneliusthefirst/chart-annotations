import React, { useMemo, useState } from "react"

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

  const Tab = ({ tab, index }: { tab: Tab; index: number }) => {
    const tabStyle = useMemo(
      () =>
        activeTab === tab.id
          ? "bg-gradient blue text-white"
          : "bg-gray-300 hover:bg-gray-300 shadow-md rounded text-gray-800",
      [activeTab]
    )


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

      <div className="flex justify-center mt-8">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default Tabs
