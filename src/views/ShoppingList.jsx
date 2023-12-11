import { Card, List, Button, Modal, Input } from "antd";
import { useState, useEffect } from "react";

import mockData from "../mock/shoppingList";

const data = mockData;
function Shopping() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenItem, setIsModalOpenItem] = useState(false);
  const [isModalOpenMember, setIsModalOpenMember] = useState(false);

  const initData =()=>{
     let url = "http://127.0.0.1:3000/shoppingList?id=656c558e46d662400d2e4081";

    fetch(url).then((res)=>{
      if(res.status == 200){
       res.json().then((data)=>{
        console.log(data._doc);
          setList(data._doc)
        });
      }
    })

  }

  useEffect(() => {
    initData()
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setList({
      ...list,
      listName: value,
    });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOkItem = () => {
    let val = valueItem;

    let url = `http://127.0.0.1:3000/item/create?itemName=${val}&listId=${list.id}`;

    fetch(url).then((res) => {
      if (res.status == 200) {
        console.log(res);
      }
    });

    if (val) {
      list.items.push({
        name: val,
        id: val + "32gdfg",
        isDone: false,
      });
    }
    setList({
      ...list,
    });
    setIsModalOpenItem(false);
  };
  const handleCancelItem = () => {
    setIsModalOpenItem(false);
  };

  const rmMumberById = (id, item) => {
    let isdelName = window.confirm(
      " Are you sure you want to remove the member? "
    );

    if (isdelName) {
      let url = `http://127.0.0.1:3000/shoppingList/deleteMumber?id=${item._id}&memberId=${id}`;

      fetch(url).then((res) => {
        if (res.status == 200) {
          console.log(res);
        }
      });

      let filterArr = list.members.filter((item) => item.id !== id);
      setList({
        ...list,
        members: filterArr,
      });
    }
  };

  const rmItemById = (id) => {
    let filterArr = list.items.filter((item) => item.id !== id);

    let url = `http://127.0.0.1:3000/shoppingList/deleteItem?id=${list.id}&itemId=${id}`;

    fetch(url).then((res) => {
      if (res.status == 200) {
        console.log(res);
      }
    });

    setList({
      ...list,
      items: filterArr,
    });
  };

  const changeDone = (id) => {
    let filterArr = list.items.map((item) => {
      if (item.id == id) {
        let url = `http://127.0.0.1:3000/item/itemChangeDone?itemId=${id}&isDone=${!item.isDone}`;

        fetch(url).then((res) => {
          if (res.status == 200) {
            console.log(res);
          }
        });

        return {
          ...item,
          isDone: !item.isDone,
        };
      } else {
        return item;
      }
    });

    console.log(filterArr);

    setList({
      ...list,
      items: filterArr,
    });
  };

  const handleOkMember = () => {
    setIsModalOpenMember(true);

    setValue(list.listName);
    let members = list.members;
    members.push({
      name: memberNamevalue,
      id: "sdfsd",
    });

    setList({
      ...list,
      members: members,
    });
    setMemberNamevalue("");

    setIsModalOpenMember(false);

    let url = `http://127.0.0.1:3000/shoppingList/addMumber?id=${list.id}&memberName=${memberNamevalue}`;

    fetch(url).then((res) => {
      if (res.status == 200) {
        console.log("rename ok");
      }
    });
  };

  const handleCancelMember = () => {
    setMemberNamevalue("");

    setIsModalOpenMember(false);
  };

  const ChangeName = () => {
    setValue(list.listName);

    showModal();

    let url = `http://127.0.0.1:3000/shoppingList/rename?id=${list.id}&listName=${value}`;

    fetch(url).then((res) => {
      if (res.status == 200) {
        console.log("rename ok");
      }
    });
  };

  const addItem = () => {
    setValueItem("");
    setIsModalOpenItem(true);
  };

  const addMember = () => {
    console.log("add");
    setMemberNamevalue("");
    setIsModalOpenMember(true);
  };

  const includeSolved = () => {
    //  let filterArr = list.items.filter((item) => item.isDone );

    // console.log(filterArr);
    initData()

    // setList({
    //   ...list,
    // });
  };

  const [value, setValue] = useState("");
  const [memberNamevalue, setMemberNamevalue] = useState("");

  const [valueItem, setValueItem] = useState("");

  const [list, setList] = useState(data);
  return (
    <>
      <Modal
        title="add member"
        open={isModalOpenMember}
        onOk={handleOkMember}
        onCancel={handleCancelMember}
      >
        <Input
          placeholder="Please input your member name"
          value={memberNamevalue}
          onChange={(e) => {
            setMemberNamevalue(e.target.value);
          }}
        />
      </Modal>

      <Modal
        title="change list name"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Please input your ListName"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Modal>

      <Modal
        title="add item to list"
        open={isModalOpenItem}
        onOk={handleOkItem}
        onCancel={handleCancelItem}
      >
        <Input
          placeholder="Please input a item desc"
          value={valueItem}
          onChange={(e) => {
            setValueItem(e.target.value);
          }}
        />
      </Modal>
      <Card title="Shopping List">
        <List
          header={
            <div>
              {list.listName}{" "}
              <Button className="greenBtn" onClick={ChangeName}>
                Rename
              </Button>{" "}
              <Button type="primary" onClick={addMember}>
                Add Member
              </Button>
            </div>
          }
          bordered
          dataSource={list.members}
          renderItem={(item, index) => (
            <List.Item>
              <div className="itemPosition">
                {item.name}
                {index != 0 ? (
                  <Button
                    danger
                    onClick={() => {
                      rmMumberById(item._id, item);
                    }}
                  >
                    Remove
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            </List.Item>
          )}
        ></List>

        <List
          className="ArchivedList"
          header={
            <div>
              Shopping Items{" "}
              <Button type="primary" onClick={includeSolved}>
                Including solved
              </Button>
            </div>
          }
          footer={
            <div>
              <Button className="greenBtn" onClick={addItem}>
                Add new item
              </Button>
            </div>
          }
          bordered
          dataSource={list.items}
          renderItem={(item) => (
            <List.Item>
              <div className="itemPosition">
                {item.name} {item.isDone}
                <Button
                  danger
                  onClick={() => {
                    rmItemById(item.id);
                  }}
                >
                  Remove
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button
                  onClick={() => {
                    changeDone(item.id);
                  }}
                >
                  {" "}
                  {item.isDone ? "Done" : "Mark"}
                </Button>{" "}
              </div>
            </List.Item>
          )}
        ></List>
      </Card>
    </>
  );
}

export default Shopping;
