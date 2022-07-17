import {
  DataInput,
  INVALID_DATA_STRUCTURE,
  INVALID_ROW_NUM,
} from "./DataInput";
import { render, screen, fireEvent } from "@testing-library/react";

const setup = () => {
  render(<DataInput onTreeMapChange={() => {}} onRowNumChange={() => {}} />);
  const jsonInput = screen.getByRole("textbox");
  const rowNumInput = screen.getByRole("spinbutton");
  return {
    jsonInput,
    rowNumInput,
  };
};

test("Invalid json", () => {
  const { jsonInput } = setup();
  fireEvent.change(jsonInput, {
    target: { value: "123" },
  });
  screen.getByText(INVALID_DATA_STRUCTURE);
});

test("Invalid array", () => {
  const { jsonInput } = setup();
  fireEvent.change(jsonInput, {
    target: { value: `{  "name": "A", "weight": 3, "value": -0.02 }` },
  });
  screen.getByText(INVALID_DATA_STRUCTURE);
});

test("Correct input", () => {
  const { jsonInput } = setup();
  fireEvent.change(jsonInput, {
    target: {
      value: `[
      {  "name": "A", "weight": 3, "value": -0.02 },
      {  "name": "B", "weight": 3, "value": 0.05 },
      {  "name": "C", "weight": 6, "value": 0.015 },
      {  "name": "D", "weight": 2, "value": -0.01 },
      {  "name": "E", "weight": 3, "value": 0.01 }
  ]`,
    },
  });
  const errMsg = screen.queryByText(INVALID_DATA_STRUCTURE, {});
  expect(errMsg).toBeNull();
});

test("Decimal row number", () => {
  const { rowNumInput } = setup();
  fireEvent.change(rowNumInput, {
    target: { value: "1.2" },
  });
  screen.getByText(INVALID_ROW_NUM);
});

test("Negative row number", () => {
  const { rowNumInput } = setup();
  fireEvent.change(rowNumInput, {
    target: { value: "-1" },
  });
  screen.getByText(INVALID_ROW_NUM);
});

test("Correct row number", () => {
  const { rowNumInput } = setup();
  fireEvent.change(rowNumInput, {
    target: { value: "1" },
  });
  const error = screen.queryByText(INVALID_ROW_NUM);
  expect(error).toBeNull();
});
