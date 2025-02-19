import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Navigate, Route, Routes } from 'react-router-dom';
import Table from './Components/Table';
import Form from './Components/Form';

function App() {
  return (
    <>
      <Routes> 
        <Route  path = "/" element = {<Navigate to = "/home"/>} /> 
        <Route  path = "/home" element = {<Form/>} > 
           <Route path = ":userId" />
        </Route>
         <Route  path = "/table" element = {<Table/>} />

      </Routes>

    </>
  );
}

export default App;
