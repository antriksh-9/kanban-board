import React, { useState, useEffect } from "react";
import './App.css';
import Board from "./Components/Board/Board";
import Dropmenu from "./Components/Dropmenu/Dropmenu";
import { ReactComponent as NoPriority } from "./assets/icons_FEtask/No-priority.svg";
import { ReactComponent as Urgent } from "./assets/icons_FEtask/SVG - Urgent Priority colour.svg";
import { ReactComponent as High } from "./assets/icons_FEtask/Img - High Priority.svg";
import { ReactComponent as Medium } from "./assets/icons_FEtask/Img - Medium Priority.svg";
import { ReactComponent as Low } from "./assets/icons_FEtask/Img - Low Priority.svg";
import { ReactComponent as Backlog } from "./assets/icons_FEtask/Backlog.svg";
import { ReactComponent as Todo } from "./assets/icons_FEtask/To-do.svg";
import { ReactComponent as Inprogress } from "./assets/icons_FEtask/in-progress.svg";
import { ReactComponent as Done } from "./assets/icons_FEtask/Done.svg";
import { ReactComponent as Cancelled } from "./assets/icons_FEtask/Cancelled.svg";
import { ReactComponent as Down } from "./assets/icons_FEtask/down.svg";
import { ReactComponent as Display } from "./assets/icons_FEtask/Display.svg";

const url = "https://api.quicksell.co/v1/internal/frontend-assignment";

// Function to fetch API data and store in localStorage
const getApiData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  // Store tickets and users in localStorage
  localStorage.setItem("tickets", JSON.stringify(data.tickets));
  localStorage.setItem("users", JSON.stringify(data.users));
  return data;
};

// Function to retrieve data from localStorage
const getDataFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

function App() {
  const [groupCurrent, setGroupCurrent] = useState("Status");
  const [orderCurrent, setOrderCurrent] = useState("Priority");
  const [showDropdown, setShowDropdown] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // UseEffect to load tickets, users, and previous grouping/ordering states
  useEffect(() => {
    // Retrieve grouping and ordering from localStorage
    const storedGrouping = getDataFromLocalStorage("grouping");
    const storedOrdering = getDataFromLocalStorage("ordering");

    if (storedGrouping) setGroupCurrent(storedGrouping);
    if (storedOrdering) setOrderCurrent(storedOrdering);

    // Retrieve tickets and users from localStorage if available, else fetch from API
    const storedTickets = getDataFromLocalStorage("tickets");
    const storedUsers = getDataFromLocalStorage("users");

    if (storedTickets && storedUsers) {
      setTickets(storedTickets);
      setUsers(storedUsers);
    } else {
      getApiData().then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
    }
  }, []);

  // Save grouping and ordering to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("grouping", JSON.stringify(groupCurrent));
    localStorage.setItem("ordering", JSON.stringify(orderCurrent));
  }, [groupCurrent, orderCurrent]);

  return (
    <div className="app">
      <div className="app_navbar">
        <div className="dropdown_container">
          <button className="app_displaybutton" onClick={() => setShowDropdown((prev) => !prev)}>
            <Display /> <p>Display</p> <Down />
          </button>
          {showDropdown && (
            <Dropmenu
              show={setShowDropdown}
              group={groupCurrent}
              order={orderCurrent}
              setgroup={setGroupCurrent}
              setorder={setOrderCurrent}
            />
          )}
        </div>
      </div>

      <div className="app_outer">
        {groupCurrent === "Status" && (
          <div className="app_boards">
            <Board name="Backlog" type={groupCurrent} sort={orderCurrent} icon={<Backlog />} tickets={tickets} />
            <Board name="Todo" type={groupCurrent} sort={orderCurrent} icon={<Todo />} tickets={tickets} />
            <Board name="In progress" type={groupCurrent} sort={orderCurrent} icon={<Inprogress />} tickets={tickets} />
            <Board name="Done" type={groupCurrent} sort={orderCurrent} icon={<Done />} tickets={tickets} />
            <Board name="Canceled" type={groupCurrent} sort={orderCurrent} icon={<Cancelled />} tickets={tickets} />
          </div>
        )}

        {groupCurrent === "Priority" && (
          <div className="app_boards">
            <Board name="No Priority" level="0" type={groupCurrent} sort={orderCurrent} icon={<NoPriority />} tickets={tickets} />
            <Board name="Urgent" level="4" type={groupCurrent} sort={orderCurrent} icon={<Urgent />} tickets={tickets} />
            <Board name="High" level="3" type={groupCurrent} sort={orderCurrent} icon={<High />} tickets={tickets} />
            <Board name="Medium" level="2" type={groupCurrent} sort={orderCurrent} icon={<Medium />} tickets={tickets} />
            <Board name="Low" level="1" type={groupCurrent} sort={orderCurrent} icon={<Low />} tickets={tickets} />
          </div>
        )}

        {groupCurrent === "Users" && (
          <div className="app_boards">
            {users.map((user) => (
              <Board name={user.name} id={user.id} type={groupCurrent} sort={orderCurrent} tickets={tickets} key={user.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
