import { ChangeEvent, FC, useState } from "react";
import { TreeMapItem } from "../../interfaces/treeMapItem.interface";
import { isJsonString, IsTreeMapItemValid } from "../../utils/util";
import "./DataInput.css";

const INVALID_DATA_STRUCTURE = "Invalid JSON";
const INVALID_ROW_NUM = "Invalid row number";
const INVALID_TREEMAP_ITEM = "Array contains invalid treemap item";

interface DataInputProps {
  onTreeMapChange: (treeMap: TreeMapItem[]) => void;
  onRowNumChange: (rowNum: number) => void;
}

export const DataInput: FC<DataInputProps> = ({
  onTreeMapChange,
  onRowNumChange,
}) => {
  const [dataStr, setDataStr] = useState("");
  const [dataError, setDataError] = useState("");
  const [rowNum, setRowNum] = useState("");
  const [rowNumError, setRowNumError] = useState("");

  const onDataChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setDataStr(input);
    if (!input) {
      setDataError(INVALID_DATA_STRUCTURE);
      return;
    }
    if (!isJsonString(input)) {
      setDataError(INVALID_DATA_STRUCTURE);
      return;
    }
    const obj = JSON.parse(input);
    const isArray = Array.isArray(obj);
    if (!isArray) {
      setDataError(INVALID_DATA_STRUCTURE);
      return;
    }
    for (let i = 0; i < obj.length; i++) {
      const valid = IsTreeMapItemValid(obj[i]);
      if (!valid) {
        setDataError(INVALID_TREEMAP_ITEM);
        return;
      }
    }
    onTreeMapChange(obj);
    setDataError("");
  };

  const onRowNumStrChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRowNum(e.target.value);
    if (!e.target.value) {
      setRowNumError(INVALID_ROW_NUM);
      return;
    }
    const value = Number(e.target.value);
    if (Number.isNaN(value)) {
      setRowNumError(INVALID_ROW_NUM);
      return;
    }
    if (value < 1) {
      setRowNumError(INVALID_ROW_NUM);
      return;
    }
    onRowNumChange(value);
    setRowNumError("");
  };

  return (
    <div className="dataInput">
      <h2 className="title">Data</h2>
      <textarea
        rows={10}
        style={{ width: "100%" }}
        value={dataStr}
        onChange={onDataChange}
      ></textarea>
      {dataError && <p className="error">{dataError}</p>}
      <h2 className="title rowNumTitle">Row Number</h2>
      <input
        className="rowNumberInput"
        type="number"
        value={rowNum}
        onChange={onRowNumStrChange}
      ></input>
      {rowNumError && <p className="error">{rowNumError}</p>}
    </div>
  );
};
