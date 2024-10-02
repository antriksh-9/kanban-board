import React from 'react'
import "./card.css"
import Tag from "../tags/Tag"
import {ReactComponent as NoPriority} from "../../assets/icons_FEtask/No-priority.svg";
import {ReactComponent as Urgent} from "../../assets/icons_FEtask/SVG - Urgent Priority colour.svg";
import {ReactComponent as Low} from "../../assets/icons_FEtask/Img - Low Priority.svg";
import {ReactComponent as Medium} from "../../assets/icons_FEtask/Img - Medium Priority.svg";
import {ReactComponent as High} from "../../assets/icons_FEtask/Img - High Priority.svg";
import {ReactComponent as Backlog} from "../../assets/icons_FEtask/Backlog.svg";
import {ReactComponent as Todo} from "../../assets/icons_FEtask/To-do.svg";
import {ReactComponent as Inprogress} from "../../assets/icons_FEtask/in-progress.svg"; 
import {ReactComponent as Done} from "../../assets/icons_FEtask/Done.svg"; 
import {ReactComponent as Cancelled} from "../../assets/icons_FEtask/Cancelled.svg"; 

const Card = (props) => {
  
  function iconSelectorpriority(){
    if(props.priority === 0) return <NoPriority className="card1" />
    else if(props.priority === 1) return <Low className="card1"/>
    else if(props.priority === 2) return <Medium className="card1"/>
    else if(props.priority === 3) return <High className="card1"/>
    else return <Urgent className="card1"/>
  }

  function iconSelectorstatus(){
    if(props.status === "Backlog") return <Backlog />
    else if(props.status === "Todo") return <Todo />
    else if(props.status === "In progress") return <Inprogress />
    else if(props.status === "Done") return <Done />
    else return <Cancelled />
  }

  return (
    <div className='card'>
        <div className='card_top'>
            <p className='card_id'>{props.id}</p>
        </div>
        <div className='card_title'>
        {props.grouping!=="Status" && iconSelectorstatus()}
          <p>{(props.title.length>50) ? props.title.slice(0,50)+'...' : props.title }</p>
        </div>
        <div className='card_tag'>
            {props.grouping!=="Priority" && iconSelectorpriority()}
            <Tag text={props.tag}/>
        </div>
    </div>
  )
}

export default Card