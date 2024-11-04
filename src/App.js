import "./App.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];
function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away👜</h1>;
}

function Form() {
  function handelAdding(e){
    e.preventDefault();
  }
  return (
    <form className="add-form" onSubmit={handelAdding}>
      <h3> what do you need for your 😍 trip ? </h3>
      <select>

      {Array.from(
        {length:20}, (v,i)=>  <option value={i+1} key={i+1}> {i+1}</option>
      )}

      </select>
      <input type="text" placeholder="item.."/>
      <button >add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul className="">
          {initialItems.map((i) => (
            <Item key={i.id} itemobj={i} />
          ))}
      </ul>
    </div>
  );
}

function Stats() {
  return <footer className="stats">statisicts</footer>;
}
function Item({ itemobj }) {
  return (
    <li >
      <span  style={ itemobj.packed ?{textDecoration:"line-through"}:{}}>
        {itemobj.quantity}
        {itemobj.description}
      </span>
      <button>❌</button>
    </li>
  );
}
export default App;
