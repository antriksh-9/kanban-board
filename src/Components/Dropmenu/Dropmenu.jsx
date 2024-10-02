import React, {useState} from 'react'
import "./dropmenu.css"
import {ReactComponent as Down} from "../../assets/icons_FEtask/down.svg";
const Dropmenu = (props) => {
    const [showGroupingMenu, setShowGroupingMenu] = useState(false);
    const [showOrderMenu, setShowOrderMenu] = useState(false);
    
    var groupCurrent = props.group;
    var orderCurrent = props.order;
    const setGroupCurrent = props.setgroup;
    const setOrderCurrent = props.setorder;

    function groupClick(event){
        setShowGroupingMenu(false);
        props.show(false);
    }

    function orderClick(){
        setShowOrderMenu(false);
        props.show(false);
    }
    
    return (
    <div className='dropdown'>
        <div className="dropdown_1">
            <p>Grouping</p>
            <div className='groupingmenucontainer'>
                <button className='group' onClick={()=>{setShowGroupingMenu((prev)=>!prev); setShowOrderMenu(false)}}><p>{groupCurrent}</p><Down /> </button>
                {showGroupingMenu && (<div className='groupingMenu'>
                    <p onClick={()=>{groupClick();
                    setGroupCurrent("Status")}}>Status</p>
                    <p onClick={()=>{groupClick();
                    setGroupCurrent("Priority")}}>Priority</p>
                    <p onClick={()=>{groupClick();
                    setGroupCurrent("Users")}}>Users</p> 
                </div>        
                )}
            </div>
        </div>
        <div className="dropdown_2">
            <p>Ordering</p>
            <div className='orderingmenucontainer'>
                <button className='priority' onClick={()=>{setShowOrderMenu((prev)=>!prev); setShowGroupingMenu(false)}}><p>{orderCurrent}</p><Down/> </button>
                {showOrderMenu && (<div className='orderMenu'>
                    <p onClick={()=>{orderClick();
                    setOrderCurrent("Priority")}}>Priority</p>
                    
                    <p onClick={()=>{orderClick();
                    setOrderCurrent("Title")}}>Title</p>
                </div>        
                )}
            </div>
        </div>
    </div>
    );
}
export default Dropmenu;
