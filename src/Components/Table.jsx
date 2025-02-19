import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Table = () => {
  let [arr, setArr] = useState(JSON.parse(localStorage.getItem("user")) || []);
  let navigate = useNavigate();

  let editRow = (id) => {
    navigate("/home/" +id);
  };

  let deleteRow = (id) => {
    if (window.confirm("Are you sure?")) {
      let deleteIndex = arr.findIndex((x) => x.id === id);
      // console.log(deleteIndex);
      // console.log(id);
      arr.splice(deleteIndex, 1);
      setArr([...arr]);

      localStorage.setItem("user", JSON.stringify(arr));
    }
    // console.log(id);
  };

  let addData = () => {
     navigate("/home");
  }

  return (
    <>
    <div className = "text-center mt-4">
    <button className = "btn btn-secondary text-white px-5" onClick = {addData}>Add Data</button>
    </div>
  
      <div className="container d-flex justify-content-center mt-3">
        
        <table className="table" border={1}>
          <thead>
            <tr>
              <th>Id:</th>
              <th>Name:</th>
              <th>Email:</th>
              <th>Password:</th>
              <th>Age:</th>
              <th>Gender:</th>
              <th>hobby:</th>
              <th>Message:</th>
              <th>Action:</th>
            </tr>
          </thead>
         
          <tbody>
            {arr?.map((x, i) => {
                console.log(x.password);
              return (
                <tr key={i}>
                  <td>{x.id}</td>
                  <td>{x.fname}</td>
                  <td>{x.email}</td>
                  <td>{x.password}</td>
                  <td>{x.age}</td>
                  <td>{x.gender}</td>
                  <td>{x.hobby?.join(", ")}</td>
                  <td>{x.message}</td>
                  
                  
                  <td className="d-flex">
                    <button
                      className="btn btn-primary me-3"
                      onClick={() => editRow(x.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger px-4"
                      onClick={() => deleteRow(x.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

  
    </>
  );
};

export default Table;
