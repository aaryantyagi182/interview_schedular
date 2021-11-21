import React from 'react';
import './App.css';
import Navbar from './Navbar';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import InterviewList from './Pages/InterviewList';
import CreateMeet from './Pages/CreateMeet';
import EditMeet from './Pages/EditMeet';
function App(){
  return (
    <BrowserRouter>
          <Navbar />
          <Routes>
          <Route path="/" element={<CreateMeet />} />
          <Route exact path="/List" element={<InterviewList />} />
          <Route path="/edit/:meetingId" element={<EditMeet />} />
          </Routes>
    </BrowserRouter>
  )
}
export default App;