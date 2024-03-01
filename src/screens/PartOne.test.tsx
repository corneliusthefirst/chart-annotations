import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store" // Install redux-mock-store if not installed
import PartOne from "./PartOne"

// Mock the Redux store
const mockStore = configureStore([])

describe("PartOne component", () => {
  let store: any
  let component: any

  beforeEach(() => {
    store = mockStore({
      partOne: {
        todos: [
          { id: 1, text: "First Todo" },
          { id: 2, text: "Second Todo" },
        ],
      },
    })
    component = render(
      <Provider store={store}>
        <PartOne />
      </Provider>
    )
  })

  it("should render input field and button", () => {
    const { getByPlaceholderText, getByText } = component
    expect(getByPlaceholderText("Enter new text")).toBeInTheDocument()
    expect(getByText("Add Text")).toBeInTheDocument()
  })

  it("should add a new todo when text is entered and Add Text button is clicked", () => {
    const { getByPlaceholderText, getByText } = component
    const input = getByPlaceholderText("Enter new text")
    const addButton = getByText("Add Text")

    fireEvent.change(input, { target: { value: "New Todo" } })
    fireEvent.click(addButton)

    expect(store.getActions()).toEqual([
      {
        type: "partOne/addTodo",
        payload: {
          text: "New Todo",
          id: expect.any(Number),
        },
      },
    ])
  })

  it("should remove a todo when remove button is clicked", async () => {
    const { getByTestId } = component
    const removeButton = getByTestId("remove-todo-1")
    fireEvent.click(removeButton)

    await waitFor(() => {
      expect(store.getActions()).toEqual([
        {
          type: "partOne/removeTodo",
          payload: 1,
        },
      ])
    })
  })
})
