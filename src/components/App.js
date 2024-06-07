import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./PackingList.1";
import Stats from "./Stats";

export default function App() {
  const [Items, setItems] = useState([]);

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items"
    );
    if (confirmed) setItems([]);
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handletoggleitem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        Items={Items}
        ondeleteitem={handleDeleteItems}
        ontoggleitem={handletoggleitem}
        onClearItems={handleClearItems}
      />
      <Stats Items={Items} />
    </div>
  );
}
