
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  // let blankobj = {fname : "", lname : "", email : "" ,password : "", date : "" ,gender : " ", hobby:[]}
  let [obj, setObj] = useState({});
  let [arr, setArr] = useState(JSON.parse(localStorage.getItem("user")) || []);
  let [count, setCount] = useState(JSON.parse(localStorage.getItem("id")) || 0);
  let [blankObj, setblankObj] = useState({});
  const [errors, seterror] = useState({});


  let navigate = useNavigate();
  let params = useParams();

 

  useEffect(() => {
    let editobj = arr.find((x) => x.id === Number(params.userId));
    console.log(editobj);
    setObj({ ...editobj });

  }, [arr]);


  //Validation
  const validate = () => {
    let isValid = true;

    if (!obj.fname) {
        isValid = false;
        errors.fname = 'Username is required';
    }

    if (!obj.email) {
        isValid = false;
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(obj.email)) {
        isValid = false;
        errors.email = 'Email is invalid';
    }

 
    if (!obj.password) {
        isValid = false;
        errors.password = 'PassWord is required';
    }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(obj.password)) {
      isValid = false;
      errors.password = 'Password is invalid';
  }

    if (!obj.age) {
        isValid = false;
        errors.age = 'Please enter your age'
    }


    seterror({ ...errors })
    return isValid;
}


  let createObj = async (e) => {
    // if(e.target.name === "hobby"){
    //     hobby = [];
    //    obj.hobby.push(e.target.value);
    // }

    if(e.target.type === "checkbox") {
      obj[e.target.name] = obj[e.target.name] ?? [];
      blankObj[e.target.name] = [];

      if (e.target.checked) {
     
        obj[e.target.name] = [...obj[e.target.name], e.target.value];

      } else {

        obj[e.target.name] = obj[e.target.name].filter( (x) => x !== e.target.value);
      }
    } else {
      obj[e.target.name] = e.target.value;
      blankObj[e.target.name] = "";
    }

    // console.log(e.target.value);
    setObj({ ...obj });
    setblankObj({ ...blankObj });
   
  };


  let saveData = () => {
    if(validate()){
        console.log(count);

        if (obj.id === undefined) {
          count += 1;
          setCount(count);
          obj.id = count;
          arr.push(obj);
    
          localStorage.setItem("id", JSON.stringify(count));
    
          // console.log(arr);
        } else {
          let updateRow = arr.findIndex((x) => x.id === obj.id);
          arr.splice(updateRow, 1, obj);
        }
    
        localStorage.setItem("user", JSON.stringify(arr));
        setArr([...arr]);
        setObj({ ...blankObj });
    
        navigate("/table");
    }
   
  };

  return (
    <>
      <div className="container ">
        <div className="d-flex justify-content-center mt-5">
        <form action="" className="w-50 bg-primary-subtle rounded-3">
            <h2 className="text-center">Form</h2>

          <label htmlFor="fname">Name:</label>
          <input
            type="text"
            className="form-control mb-1"
            name="fname"
            id="name"
            value={obj.fname || ""}
            onChange={createObj}
          />
          <p className='error text-danger mb-3'>{errors.fname}</p>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control mb-1"
            value={obj.email || ""}
            onChange={createObj}
          />
          <p className='error text-danger mb-3'>{errors.email}</p>

          <label htmlFor="date">Age:</label>
          <input
            type="number"
            name="age"
            className="form-control mb-1"
            value={obj.age || ""}
            onChange={createObj}
          />
          <p className=' error text-danger mb-3'>{errors.age}</p>

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control mb-1"
            value={obj.password || ""}
            onChange={createObj}
          />
          <p className='error text-danger mb-3'>{errors.password}</p>

          <label htmlFor="" className="pe-2 mb-3">
            Gender:
          </label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={createObj}
            checked={obj.gender === "male" || ""}
          />
          <span className="me-2">Male</span>
          
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={createObj}
            checked={obj.gender === "female" || ""}
          />
          <span className="me-2">Female</span>
           <br />

          <label htmlFor="" className="pe-2 mb-3 ">
            Hobbies:
          </label>
          <input
            type="checkbox"
            name="hobby"
            value="Travelling"
            onChange={createObj}
            checked={obj.hobby?.includes("coding") || ""}
          />
          <span className="me-2">Travelling</span>
          <input
            type="checkbox"
            name="hobby"
            value="cricket"
            onChange={createObj}
            checked={obj.hobby?.includes("cricket") || ""}
          />
          <span className="me-2">Cricket</span>
          
          <input
            type="checkbox"
            name="hobby"
            value="reading"
            onChange={createObj}
            checked={obj.hobby?.includes("reading") || ""}
          />
           <span  className="me-2">Reading</span>

          <input
            type="checkbox"
            name="hobby"
            value="travelling"
            onChange={createObj}
            checked={obj.hobby?.includes("travelling") || ""}
          />
          <span className="me-2"> Football</span>
           <br />

          <label htmlFor="textarea">Message(Optional):</label><br />
           <textarea name="message" className="mt-2" cols="68" rows = "5" id="textarea" onChange={createObj}></textarea>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary mt-3 px-4"
              onClick={saveData}
            >
              SUBMIT
            </button>
          </div>
        </form>
        </div>
      
      </div>
    </>
  );
};

export default Form;
