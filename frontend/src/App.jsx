
import React , {useState} from "react";

function App(){
  const [count,setCount] = useState(0);
  const [isDark,setIsDark]=useState(false);
  const [name,setName]=useState("");

  return (
    <div style={{
      backgroundColor:isDark?'#2c3e50':'#ffffff' ,
      color:isDark?'#ffffff':'#000000' ,
      padding:'20px',
      transition:'all 0.5s ease'
      , border: 'solid 1px red'
     }} >
      <h1>current count is {count} </h1>
      <button onClick={()=> setCount(count+1)}> click me increase count : {count}</button>
      <button onClick={()=> setCount(count-1)}> click me decrease  count : {count}</button>
      <button onClick={()=> setCount(0)}>  reset</button>
<label>
  <input type="checkbox" checked={isDark} onChange={(e)=> setIsDark(e.target.checked )}/>
  dark mode
</label>

<input
 type="text" value={name} 
 placeholder="enter your name"
 onChange={(e)=> setName(e.target.value)}
 />
      


    </div>
  );
}
export default App;