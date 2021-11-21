import React from 'react';
import { useParams } from 'react-router';
import Information from './Information';
// import M from "materialize-css";

const EditMeet = ()=>{
    const {meetingId}=useParams();
    return (
        <div>
            <Information func="Edit" meetingId={meetingId}></Information>
        </div>
    )
}

export default EditMeet;