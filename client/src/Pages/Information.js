import React , {useEffect, useState} from 'react';
import M from "materialize-css";

const Information = (props) => {
	var today = new Date().toISOString().split('T')[0];
	 
        const [emailList, setEmailList]=useState([]);
	const [title, setTitle] = useState("");
	const [email1, setEmail1] = useState("");
	const [email2, setEmail2] = useState("");
	const [date, setDate] = useState("");
	const [startTime,setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
        
	function calTime(stime){
        let hr=parseInt(stime/100)+"";
        let min=stime%100+"";
        let time=(hr.length==1?"0":"")+hr+":"+(min.length==1?"0":"")+min;
        return time;
    }

    useEffect(()=>{
        fetch("/getEmails").then(res=>res.json()).then(data=>{
            setEmailList(data);
            console.log(data);
        })
        if(props.func=="Edit"){
            fetch("/meetingDetail/"+props.meetingId).then(res=>res.json())
            .then(data=>{
                data=data.meeting;
                let start=calTime(data.startTime);
                let end=calTime(data.endTime)
                setTitle(data.title);
                setEmail1(data.user1.email);
                setEmail2(data.user2.email);
                setDate(data.date);
                setStartTime(start);
                setEndTime(end);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }, [])
    

    function doWork(e){
        e.preventDefault();
        console.log(title,date,startTime,endTime,email1,email2);

        // path for edit or create
        let path="/createMeeting";
        if(props.meetingId!==undefined){
            path="/edit/"+props.meetingId;
        }
        
        fetch(path,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                title,date,startTime,endTime,email1,email2
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#d32f2f red darken-2"});
            }
            else{
                M.toast({html:"saved successfully",classes:"#43a047 green darken-1"});
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div>
            <div className="container" style={{width:500,padding:"0px 20px 20px",marginTop:"20px", border:"2px solid black"}}>
                <h3 class="page-heading">{props.func}</h3>
                <form onSubmit={(e)=>{doWork(e)}}>
                    <div className="row">
                    <div className="col-25">
                        <label>TITLE :</label>
                    </div>
                    <div className="col-75">
                        <input placeholder="Meeting Title" id="title" type="text" value={title} onChange={e=>setTitle(e.target.value)} required/>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-25">
                        <label>INTERVIEWER: </label>
                    </div>
                    <div className="col-75">
                        {/* <input id="email1" type="email" placeholder="Email 1" value={email1} onChange={e=>setEmail1(e.target.value)} required/> */}
                        <select name="email1" id="email1" style={{display:"block",color:"lightslategrey"}} onChange={(e)=>{setEmail1(e.target.value)}} value={email1}>
                            <option value="">Select Email1</option>
                            {emailList.map((i) => (
                            <option value={i.email} key={"ls" + i.email}>
                                {i.name}-{i.email}
                            </option>
                            ))}
                        </select>
                    </div>
                    </div>
                    <div className='row'>
                    <div className='col-25'>
                        <label>INTERVIEWEE:</label>
                    </div>
                    <div className="col-75">
                        {/* <input id="email2" type="email" placeholder="Email 2" value={email2} onChange={e=>setEmail2(e.target.value)} required/> */}
                        <select name="email2" id="email2" style={{display:"block",color:"lightslategrey"}} onChange={(e)=>{setEmail2(e.target.value)}} value={email2}>
                            <option value="">Select Email2</option>
                            {emailList.map((i) => (
                            <option value={i.email} key={"ls" + i.email}>
                                {i.name}-{i.email}
                            </option>
                            ))}
                        </select>
                    </div>
                    </div>
                    <div className='row'>
                    <div className="col-25">
                        <label>DATE:</label>
                    </div>
                    <div className="col-75">
                        <input style={{color:"lightslategrey"}} name="date" type="date" min={today} value={date} onChange={e=>setDate(e.target.value)} required></input>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-25">
                        <label>StartTime</label>
                    </div>
                    <div className="col-75">
                        <input style={{color:"lightslategrey"}} type="time" name="start-time" value={startTime} onChange={e=>setStartTime(e.target.value)} required></input>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-25">
                        <label>EndTime</label>
                    </div>
                    <div className="col-75">
                        <input style={{color:"lightslategrey"}} type="time" name="end-time" value={endTime} onChange={e=>setEndTime(e.target.value)} required></input>
                    </div>
                    </div>
                    
                        <button style={{marginLeft:"300px", padding:"10px",fontFamily:"sans-serif",color:"black",fontWeight:"bold",border:"1px solid black",backgroundColor:"#ee6e73"}}>{props.func}</button>
                    
                </form>
            </div>
        </div>
    )

}

export default Information;