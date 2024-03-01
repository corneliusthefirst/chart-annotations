import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PartTwo from './PartTwo';

// Mock the Redux store
const mockStore = configureStore([]);

// Mock the usePartTwo hook
(global as any).usePartTwo = () => ({
  stockData: [{ x: 1, y: 10 }, { x: 2, y: 20 }],
  chartOptions: {
    states: {
      active: {
        allowMultipleDataPointsSelection: true,
      },
    },
    chart: {
      id: 'stock-chart',
      type: 'area',
      selection: {
        enabled: true,
        xaxis: {
          min: undefined,
          max: undefined,
        },
      },
    },
    xaxis: {
      type: 'datetime',
    },
    markers: {
      size: 4,
    },
  },
  isLoading: false,
  chartRef: vi.fn(),
});

describe('PartTwo component', () => {
  let store: any
  let component: any


  test('renders stock price chart and grid when data is available', async () => {
    store = mockStore({
      partTwo: {
        stockData: [{ x: 1, y: 10 }, { x: 2, y: 20 }],
        isLoading: false,
      },
    });
    component = render(
      <Provider store={store}>
        <PartTwo />
      </Provider>
    )
    const { getByText, getByTestId } = component
    await waitFor(()=> {
      expect(getByText('Microsoft (MSFT) Stock Price')).toBeInTheDocument();
      expect(getByTestId('grid-component')).toBeInTheDocument();
      expect(getByTestId('chart-component')).toBeInTheDocument();
    })
  });

  test('renders loader component when loading', () => {
    store = mockStore({
      partTwo: {
        stockData: [{ x: 1, y: 10 }, { x: 2, y: 20 }],
        isLoading: true,
      },
    });
    component = render(
      <Provider store={store}>
        <PartTwo />
      </Provider>
    )
    const { getByTestId } = component
    expect(getByTestId('loader-component')).toBeInTheDocument();
  });

  test('renders stock price chart when data is available and not loading', async () => {
    store = mockStore({
      partTwo: {
        stockData: [{ x: 1, y: 10 }, { x: 2, y: 20 }],
        isLoading: false,
      },
    });
    component = render(
      <Provider store={store}>
        <PartTwo />
      </Provider>
    )
    const { queryByTestId } = component
    await waitFor(() => {
      expect(queryByTestId('loader-component')).not.toBeInTheDocument();
      expect(queryByTestId('grid-component')).toBeInTheDocument();
      expect(queryByTestId('chart-component')).toBeInTheDocument();
    });
  });
});
