import { Card, Button, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import mockData from "../mock/createShoppingList";

let data = mockData;

// const data = [
//   {
//     listName: "Shopping List 1",
//     id: "xxxx",
//     awid: "sdfsdfisngsdlf",
//     isDone:false,
//   },
//   {
//     listName: "Shopping List 2",
//     id: "xxxx2",
//     awid: "sdfsdfisngsdlf2",
//     isDone:false,
//   },

// ];

function CreateShoppingList() {
  const [value, setValue] = useState("");

  let navigate = useNavigate();

  const createFun = () => {
    if (value.length > 0) {
      let ownerID = "jjohanes";
      let url = `http://127.0.0.1:3000/shoppingList/create?owner=${ownerID}&listName=${value}`;
      fetch(url).then((res) => {
        if (res.status == 200) {
          console.log("ok");
        }
      });
      navigate("/");
    } else {
        alert("please input your listName")
    }
  };

  return (
    <>
      <div>

        <Card title="Create a Shopping">
          <Input
            placeholder="Please input your ListName"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />

          <Button type="primary" className="createBtn" onClick={createFun}>
            Submit
          </Button>
        </Card>
      </div>
    </>
  );
}

export default CreateShoppingList;
