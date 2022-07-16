import {
  TreeMapRow,
  TreeMapItem,
  TreeMap,
} from "../interfaces/treeMapItem.interface";

export const DUMMY_ITEM_NAME = "dummy-item";

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const IsTreeMapItemValid = (obj: any): boolean => {
  if (!obj.name) {
    return false;
  }
  if (!obj.weight) {
    return false;
  }
  const weight = Number(obj.weight);
  if (Number.isNaN(weight)) {
    return false;
  }
  if (weight < 1) {
    return false;
  }
  if (!obj.value) {
    return false;
  }
  const value = Number(obj.value);
  if (Number.isNaN(value)) {
    return false;
  }
  return true;
};

const calculateRowWeight = (treeMapItems: TreeMapItem[], rowNum: number) => {
  const totalWeight = treeMapItems.reduce(
    (prev, curr) => prev + curr.weight,
    0
  );
  const maxWeight = Math.max.apply(
    Math,
    treeMapItems.map((item) => item.weight)
  );
  const avgWeight = totalWeight / rowNum;
  return Math.max(maxWeight, avgWeight);
};

export const constructTreeMap = (
  treeMapItems: TreeMapItem[],
  rowNum: number
): TreeMap | null => {
  if (!treeMapItems || !rowNum) {
    return null;
  }
  let weightPerRow = calculateRowWeight(treeMapItems, rowNum);
  const sorted = treeMapItems.sort((a, b) => b.weight - a.weight);
  const rows: TreeMapRow[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (rows.length < rowNum) {
      rows.push({
        treeMapItems: [sorted[i]],
        currentWeight: sorted[i].weight,
      });
      continue;
    }
    const targetRow = rows.find(
      // eslint-disable-next-line no-loop-func
      (row) => row.currentWeight + sorted[i].weight <= weightPerRow
    );
    if (targetRow) {
      targetRow.treeMapItems.push(sorted[i]);
      targetRow.currentWeight += sorted[i].weight;
    } else {
      console.log(rows);
      rows[0].currentWeight += sorted[i].weight;
      rows[0].treeMapItems.push(sorted[i]);
      weightPerRow = rows[0].currentWeight;
    }
  }
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].currentWeight < weightPerRow) {
      const diff = weightPerRow - rows[i].currentWeight;
      rows[i].treeMapItems.push({
        name: DUMMY_ITEM_NAME,
        weight: diff,
        value: 0,
      });
    }
  }
  console.log(`weightPerRow: ${weightPerRow}`);
  console.log(rows);
  return {
    weightPerRow: weightPerRow,
    TreeMapRows: rows,
  };
};
