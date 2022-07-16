export interface TreeMapItem {
  name: string;
  weight: number;
  value: number;
}

export interface TreeMapRow {
  currentWeight: number;
  treeMapItems: TreeMapItem[];
}

export interface TreeMap {
  weightPerRow: number;
  TreeMapRows: TreeMapRow[];
}
