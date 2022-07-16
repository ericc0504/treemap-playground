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
    return (
      <div
        key={uuidv4()}
        className="treemap-item"
        style={{
          backgroundColor:
            treeMapItem.name === DUMMY_ITEM_NAME
              ? "white"
              : treeMapItem.value > 0
              ? "green"
              : "red",
        }}
      >
        <p className="item-title">
          {treeMapItem.name !== DUMMY_ITEM_NAME && treeMapItem.name}
        </p>
        <p className="item-value">
          {treeMapItem.name !== DUMMY_ITEM_NAME &&
            `${treeMapItem.value * 100}%`}
        </p>
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
                  height: `calc(70vh/${rowNum})`,
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
