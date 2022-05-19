// import Add from "./components/Add";
import List from "./components/List";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Edit from "./components/Edit";
// import Abc from "./components/abc";
import Add1 from "./components/Add1";
import Edit1 from "./components/Edit1";


function App() {
  return (
    <BrowserRouter>
      <div className="">
        {/* <Abc /> */}
        {/* <List/> */}
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/add" element={<Add1 />}></Route>
          <Route path="/edit" element={<Edit1 />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
