import { useState } from "react";
import "./App.css";
const initialquantity = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true }, 
  { id: 3, description: "Toothbrush", quantity: 1, packed: false }, { id: 4, description: "Shampoo", quantity: 1, packed: false }, { id: 5, description: "Laptop", quantity: 1, packed: true }, { id: 6, description: "Charger", quantity: 1, packed: false }, { id: 7, description: "Snacks", quantity: "Assorted", packed: true }, { id: 8, description: "Travel Guidebook", quantity: 1, packed: false }, { id: 9, description: "Jacket", quantity: 1, packed: false }, { id: 10, description: "Sunglasses", quantity: 1, packed: true }, 
];
function App() {
  const [items, setItems] = useState(initialquantity);
  function handelAddItems(i) {
    setItems(items => [...items, i]);
  }
  function handelDeleteItem(id) {
    // console.log(e);
    setItems(
      items => items.filter(
        (someItem) => id !== someItem.id
      )
    )
  }
  function handelToggleItem(id) {
    setItems(
      items =>
        items.map((i) => i.id === id ? { ...i, packed: !i.packed } : i)

    )
  }
  return (

    <div className="app">
      <Logo />
      <Form onAddItem={handelAddItems} />
      <PackingList items={items}
        onDeleteItem={handelDeleteItem}
        onToggleItems={handelToggleItem} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away👜</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() }
    // console.log(newItem)
    onAddItem(newItem);
    setQuantity(1); setDescription("")
  }
  return (
    <form className="add-form" onSubmit={handelSubmit}>
      {/* <h3> what do you need for your 😍 trip ? </h3> */}
      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>

        {Array.from(
          { length: 20 }, (v, i) => <option value={i + 1} key={i + 1}> {i + 1}</option>
        )}

      </select>
      <input type="text" placeholder="item.." value={description} onChange={(e) => setDescription(e.target.value)} />
      <button >add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItems }) {
  const [sortBy,setSortBy]  = useState("input");
  let sortedItems;

  switch(sortBy){
    case "input":

      sortedItems = items;
      break;
      case "description":
      sortedItems = items.slice().sort((a,b)=>a.description.localeCompare(b.description))
      break;
        case "packed":
          sortedItems = items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))
          break;
      
    }

  return (
    <div className="list">
      <ul className="">
        {sortedItems.map((i) => (
          <Item key={i.id} itemobj={i}
            onToggleItems={onToggleItems}
            onDeleteItem={onDeleteItem} />
        ))}
      </ul>

      <select value={sortBy} className="actions"
      onChange={(e)=>setSortBy(e.target.value)} >
        <option value="input">SORT BY INPUT ORDER</option>
        <option value="description">SORT BY DESCRIPTION</option>
        <option value="packed">SORT BY PACKED STATUS</option>
      </select>
    </div>
  );
}

function Stats({ items }) {
  
  if(!items.length){
    return(
      <footer className="stats"> 
    
     start adding some items to your packing list! 🚀 
    </footer>

    )
  }
  const numberOfitems = items.length;
  const numberOfpackedItems = items.filter(i => i.packed).length;
  const percentage = Math.round(numberOfpackedItems / numberOfitems * 100)
 

  return (
    <footer className="stats"> 
    
    {(numberOfitems===numberOfpackedItems) ?"you got everything! ready to go 🌍 ": `🧳you have ${numberOfitems} items on your list, and you already packed ${numberOfpackedItems} items!
  (${percentage}%)`}

  </footer>
  )
}
function Item({ itemobj, onDeleteItem, onToggleItems }) {
  return (
    <li >

      <input type="checkbox"
        // value={itemobj.packed}
        checked={itemobj.packed}
        onChange={() => onToggleItems(itemobj.id)}
      />
      <span style={itemobj.packed ? { textDecoration: "line-through" } : {}}>
        {itemobj.quantity} {itemobj.description}
      </span>
      <button onClick={() => {
        onDeleteItem(itemobj.id)
      }}
      > ❌</button>
    </li>
  );
}
export default App;
