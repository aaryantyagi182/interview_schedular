import React from 'react';
import {Link} from 'react-router-dom';
const Navbar=()=>{
	return(
		<ul> 
		 <li><Link to="/"  style={{ color:"white", fontSize: "20px"}}>INTERVIEW BIT</Link></li>
		 <li><Link to ="/List" style={{color:"white", fontSize: "20px"}}>INTERVIEW LIST</Link></li>
		 <li><Link to = "/" style={{color:"white",  fontSize: "20px"}}>SCHEDULE MEETING</Link></li>
		</ul>
	)
}
export default Navbar;