import { useState } from "react";
import  Item  from "./Item";

export default function PackingList({
  Items,
  ondeleteitem,
  ontoggleitem,
  onClearItems,
}) {
  const [sortBy, setSortby] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = Items;
  }

  if (sortBy === "description") {
    sortedItems = Items.slice().sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }

  if (sortBy === "packed") {
    sortedItems = Items.slice().sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            ondeleteitem={ondeleteitem}
            ontoggleitem={ontoggleitem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  );
}
