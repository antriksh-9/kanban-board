import React from 'react';
import "./Board.css";
import { ReactComponent as Add } from "../../assets/icons_FEtask/add.svg";
import { ReactComponent as DotMenu } from "../../assets/icons_FEtask/3 dot menu.svg";
import Card from '../Card/Card';

const Board = ({ name, level, type, sort, icon, id, tickets }) => {
  // Filter valid tickets based on grouping type
  if (!tickets) {
    return null; // Return null or a loading state while waiting for tickets
  }


  var validTickets = [];
  
  if (type === "Status") {
    validTickets = tickets.filter((ticket) => ticket.status === name);
  } else if (type === "Priority") {
    validTickets = tickets.filter((ticket) => ticket.priority === Number(level));
  } else if (type === "Users") {
    validTickets = tickets.filter((ticket) => ticket.userId === id);
  }

  // Sort tickets based on current sorting order
  if (sort === "Priority") {
    validTickets.sort((a, b) => b.priority - a.priority);
  } else if (sort === "Title") {
    validTickets.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className='board'>
      <div className='board_top'>
        {icon}
        <p className='board_top_title'>
          {name} <span>{validTickets.length}</span>
        </p>
        <Add />
        <DotMenu />
      </div>
      <div className='board_cards'>
        {validTickets.map((ticket) => (
          <Card
            id={ticket.id}
            title={ticket.title}
            tag={ticket.tag}
            priority={ticket.priority}
            grouping={type}
            status={ticket.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
