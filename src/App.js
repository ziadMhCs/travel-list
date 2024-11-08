import { useState } from "react";
import "./App.css";
const initialquantity = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];
function App() {
 const [items,setItems] = useState(initialquantity);
 function handelAddItems(i){
   setItems(items=>[...items,i]);
 }    
 function handelDeleteItem(id){
  // console.log(e);
  setItems(
    items=>   items.filter(
      (someItem)=>id!==someItem.id
     ) 
  )
 }
 function handelToggleItem(id){
  setItems(
    items=> 
      items.map((i)=>i.id===id? {...i,packed:!i.packed}:i)
    
  )
 }
  return (

    <div className="app">
      <Logo />
      <Form  onAddItem={handelAddItems}/>
      <PackingList  itemsProp={items} 
        onDeleteItem={handelDeleteItem}
        onToggleItems={handelToggleItem}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away👜</h1>;
}

function Form({onAddItem}) {
  const[description,setDescription] = useState("");
  const[quantity,setQuantity] = useState(1);
 
  function handelSubmit(e){
    e.preventDefault();
    if (!description) return;
    
    const newItem={description,quantity,packed:false, id:Date.now()}
    // console.log(newItem)
    onAddItem(newItem);
    setQuantity(1); setDescription("")
  }
  return (
    <form className="add-form" onSubmit={handelSubmit}>
      {/* <h3> what do you need for your 😍 trip ? </h3> */}
      <select value={quantity} onChange={e=> setQuantity(Number(e.target.value))}>

      {Array.from(
        {length:20}, (v,i)=>  <option value={i+1} key={i+1}> {i+1}</option>
      )}

      </select>
      <input type="text" placeholder="item.." value={description} onChange={(e)=>setDescription(e.target.value)}/>
      <button >add</button>
    </form>
  );
}

function PackingList({itemsProp,onDeleteItem,onToggleItems}) {
  return (
    <div className="list">
      <ul className="">
          {itemsProp.map((i) => (
            <Item key={i.id}  itemobj={i} 
            onToggleItems={onToggleItems} 
            onDeleteItem={onDeleteItem}/>
          ))}
      </ul>
    </div>
  );
}

function Stats() {
  return <footer className="stats">statisicts</footer>;
}
function Item({ itemobj,onDeleteItem,onToggleItems }) {
  return (
    <li >

        <input type="checkbox" 
        // value={itemobj.packed}
        checked={itemobj.packed}
         onChange={()=>onToggleItems(itemobj.id)}
         />
      <span  style={ itemobj.packed ?{textDecoration:"line-through"}:{}}>
        {itemobj.quantity} {itemobj.description}
      </span>
      <button onClick={()=>{
        onDeleteItem(itemobj.id)}}
      > ❌</button>
    </li>
  );
}
export default App;
