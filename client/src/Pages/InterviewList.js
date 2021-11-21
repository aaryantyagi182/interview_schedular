import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const InterviewList = () =>{
	let [data,setData]=useState([]);
	useEffect(()=>{
	    fetch("/allMeetings")
	    .then(res=>res.json())
	    .then(data=>{
		setData(data.meetings);
	    })
	    .catch(err=>{
		console.log(err);
	    })
	},[])
	const history=useNavigate();
	function calTime(stime){
	    let hr=parseInt(stime/100);
	    let min=stime%100+"";
	    let time=hr+":"+(min.length===1?"0":"")+min;
	    return time;
	}
    
	return (
	    <div style={{padding:"10px 15px",textAlign:"left"}}>
		<h3 class="page-heading">Interview List</h3>
		<div style={{border:"1px solid lightslategrey"}}>
		<div style={{"padding":"10px","display":"flex","justifyContent":"space-between","margin":"5px"}}>
		    <div className="col">Title</div>
		    <div className="col">Email1</div>
		    <div className="col">Email2</div>
		    <div className="col">Date</div>
		    <div className="col">Start Time</div>
		    <div className="col">End Time</div>
		    <div style={{float:"right"}} className="col">Reschedule</div>
		</div>
		{
		data.map(item => {
		    return (
			<div key={item._id} style={{"padding":"10px","display":"flex","justifyContent":"space-between","margin":"5px","backgroundColor":"lightgray"}}>
			    <div className="col">{item.title}</div>
			    <div className="col">{item.user1.email}</div>
			    <div className="col">{item.user2.email}</div>
			    <div className="col">{item.date}</div>
			    <div className="col">{calTime(item.startTime)}</div>
			    <div className="col">{calTime(item.endTime)}</div>
			    <span>
			    <button type="button" onClick={()=>{history("/edit/"+item._id)}}>Edit</button>
			    </span>
			</div>
		    )
		})
		}
		</div>
	    </div>
	    
	)
}

export default InterviewList;