export interface Todo {
  id: number;
  text: string;
}

export interface TodoState {
  todos: Todo[];
}

export interface Point {
  x: number;
  y: number;
}

export interface Description {
  id: number;
  type: "point" | "interval";
  data: Point[];
  text: string;
}

export interface DescriptionsState {
  descriptions: Description[];
  isLoading: boolean;
  error: string | null;
  stockData: Point[];
}
