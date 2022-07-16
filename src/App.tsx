import { useState } from "react";
import "./App.css";

import { DataInput } from "./components/DataInput/DataInput";
import { Result } from "./components/Result/Result";
import { TreeMapItem } from "./interfaces/treeMapItem.interface";

function App() {
  const [treeMapItems, setTreeMapItems] = useState<TreeMapItem[]>([]);
  const [rowNum, setRowNum] = useState<number>(0);

  const onTreeMapChange = (treeMap: TreeMapItem[]) => {
    setTreeMapItems(treeMap);
  };

  const onRowNumChange = (num: number) => {
    if (num) setRowNum(num);
  };

  return (
    <div className="app">
      <DataInput
        onTreeMapChange={onTreeMapChange}
        onRowNumChange={onRowNumChange}
      />
      <Result treeMapItems={treeMapItems} rowNum={rowNum} />
    </div>
  );
}

export default App;
