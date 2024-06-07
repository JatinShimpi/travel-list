import { useState } from "react";

export default function App() {
  const [Items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handletoggleitem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } 
        : item
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
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴far away👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDisciprtion] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      return;
    }
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDisciprtion("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for the 😍 trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDisciprtion(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList({ Items, ondeleteitem, ontoggleitem }) {
  return (
    <div className="list">
      <ul>
        {Items.map((item) => (
          <Item
            item={item}
            key={item.id}
            ondeleteitem={ondeleteitem}
            ontoggleitem={ontoggleitem}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, ondeleteitem, ontoggleitem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => ontoggleitem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => ondeleteitem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>you have x items on your, and you already packed x(x%)</em>
    </footer>
  );
}
