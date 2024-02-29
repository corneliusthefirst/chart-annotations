import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Home from "./Home"
import { Provider } from "react-redux"
import { store } from "../store"

describe("Home Component", () => {
  test("renders tabs correctly", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    // Wait for the content to load
    await waitFor(() => {
      expect(screen.getByText("Part 1")).toBeInTheDocument()
      expect(screen.getByText("Part 2")).toBeInTheDocument()
    })
  })

  test("changes tab content when clicked", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    // Click on the second tab
    userEvent.click(screen.getByText("Part 2"))

    // Wait for the content to load
    await waitFor(() => {
      expect(screen.getByText("Microsoft (MSFT) Stock Price")).toBeInTheDocument()
    })

    // Click on the first tab
    userEvent.click(screen.getByText("Part 1"))

    // Wait for the content to load
    await waitFor(() => {
      expect(screen.getByText("Add Text")).toBeInTheDocument()
    })
  })
})
