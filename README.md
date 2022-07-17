# Treemap Playground

This web application help visualising treemap data which each rectangle has the same height and the item width depends on the weight of item.

## Run the app

### `yarn`

Restore all packages.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Schema

### TreemapItem
```
{
    name: string; // Length <= 50
    weight: number; // Must be an integer
    value: number;
}
```

### Sample Data Input
```
[
    {  "name": "A", "weight": 3, "value": -0.02 },
    {  "name": "B", "weight": 3, "value": 0.05 },
    {  "name": "C", "weight": 6, "value": 0.015 },
    {  "name": "D", "weight": 2, "value": -0.01 },
    {  "name": "E", "weight": 3, "value": 0.01 }
]
```