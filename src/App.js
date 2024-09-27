import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import axios from "axios";
import spinner from "./icons_FEtask/svg-spinners--bars-rotate-fade.svg";

function App() {
  const [order, setOrder] = useState("title");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [group, setGroup] = useState("priority");

  const userMemberObj = {
    "usr-1": {
      name: "Anoop Sharma",
      path: require("./icons_FEtask/user.svg").default,
    },
    "usr-2": {
      name: "Yogesh",
      path: require("./icons_FEtask/user.svg").default,
    },
    "usr-3": {
      name: "Shankar Kumar",
      path: require("./icons_FEtask/user.svg").default,
    },
    "usr-4": {
      name: "Ramesh",
      path: require("./icons_FEtask/user.svg").default,
    },
    "usr-5": {
      name: "Suresh",
      path: require("./icons_FEtask/user.svg").default,
    },
  };
  const statusMemberObj = {
    Todo: { name: "Todo", path: require("./icons_FEtask/To-do.svg").default },
    Done: { name: "Done", path: require("./icons_FEtask/Done.svg").default },
    Cancelled: {
      name: "Cancelled",
      path: require("./icons_FEtask/Cancelled.svg").default,
    },
    "In progress": {
      name: "In Progress",
      path: require("./icons_FEtask/in-progress.svg").default,
    },
    Backlog: {
      name: "Backlog",
      path: require("./icons_FEtask/Backlog.svg").default,
    },
  };
  const priorityLevels = {
    4: {
      type: "Urgent",
      path: require("./icons_FEtask/SVG - Urgent Priority colour.svg").default,
    },
    3: {
      type: "High",
      path: require("./icons_FEtask/Img - High Priority.svg").default,
    },
    2: {
      type: "Medium",
      path: require("./icons_FEtask/Img - Medium Priority.svg").default,
    },
    1: {
      type: "Low",
      path: require("./icons_FEtask/Img - Low Priority.svg").default,
    },
    0: {
      type: "No Priority",
      path: require("./icons_FEtask/No-priority.svg").default,
    },
  };

  const GroupSetterfxn = (group) => {
    setGroup(group);
  };

  const OrderSetterfxn = (order) => {
    setOrder(order);
  };


  const loadTicketsData = async () => {
    try {
      const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
      setData(data);
      setLoading(true);
    } catch (err) {
      console.error("Error while fetching tickets:- ", err);
      throw err;
    }
  };
  

  useEffect(() => {
    loadTicketsData();
  }, []);

  return (
    <div className="App">
      {!loading ? (
        <div className="spinner">
          <img className="spinner-img" src={spinner} alt="spinner" />
        </div>
      ) : (
        <>
          <Header
            setOrderFunc={OrderSetterfxn}
            setGroupFunc={GroupSetterfxn}
            group={group}
            order={order}
          />
          <TaskBoard
            data={data}
            order={order}
            group={group}
            priorityLevels={priorityLevels}
            userObj={userMemberObj}
            statusObj={statusMemberObj}
          />
        </>
      )}
    </div>
  );
}

export default App;
