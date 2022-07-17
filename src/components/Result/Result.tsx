import { FC, useEffect, useMemo, useState } from "react";
import { TreeMap, TreeMapItem } from "../../interfaces/treeMapItem.interface";
import { constructTreeMap, DUMMY_ITEM_NAME } from "../../utils/util";
import "./Result.css";
import { v4 as uuidv4 } from "uuid";

interface ResultProps {
  treeMapItems: TreeMapItem[];
  rowNum: number;
}

export const Result: FC<ResultProps> = ({ treeMapItems, rowNum }) => {
  const treeMap: TreeMap | null = useMemo(
    () => constructTreeMap(treeMapItems, rowNum),
    [treeMapItems, rowNum]
  );
  const [colTemplates, setColTemplates] = useState<string[]>([]);

  useEffect(() => {
    const templates: string[] = [];
    setColTemplates(templates);
    treeMap?.TreeMapRows.forEach((row) => {
      let template = "";
      row.treeMapItems.forEach((item) => {
        template += `${item.weight / treeMap.weightPerRow}fr `;
      });
      templates.push(template);
    });
    setColTemplates(templates);
  }, [treeMap]);

  const generateTreeMapBlock = (treeMapItem: TreeMapItem) => {
    const treeMapItemName = treeMapItem.name;
    const value = `${Math.round(treeMapItem.value * 10000) / 100}%`;
    return (
      <div
        key={uuidv4()}
        className="treemap-item"
        data-tooltip={`${treeMapItemName}: value`}
        style={{
          backgroundColor:
            treeMapItem.name === DUMMY_ITEM_NAME
              ? "white"
              : treeMapItem.value > 0
              ? "#77c66e"
              : "#fd9193",
        }}
      >
        {treeMapItemName !== DUMMY_ITEM_NAME && (
          <>
            <p className="item-title">{treeMapItemName}</p>
            <p className="item-value">{value}</p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="result">
      <h2 className="title">Result</h2>
      <div className="treemap-contaier">
        {treeMap &&
          treeMap.TreeMapRows.map((row, idx) => {
            return (
              <div
                key={`row-${idx}`}
                className="treemap-row"
                style={{
                  gridTemplateColumns: colTemplates[idx],
                  height: `calc(70vh/${treeMap.TreeMapRows.length})`,
                }}
              >
                {row.treeMapItems.map((item) => {
                  return generateTreeMapBlock(item);
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};
