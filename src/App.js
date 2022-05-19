import List from "./components/List";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Add1 from "./components/Add1";
import Edit1 from "./components/Edit1";


function App() {
  return (
    <BrowserRouter>
      <div className="">
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
