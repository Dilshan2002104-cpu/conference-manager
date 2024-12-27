import { useEffect, useState } from 'react';
import SidePanel from '../../Components/Sidepanel'
import './AttendanceManagement.css'
const AttendanceManagement = () => {

  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
      // Fetch attendance data from your API
      const fetchAttendanceData = async () => {
          const response = await fetch('http://localhost:5000/api/attendance/check-in'); 
          const data = await response.json();
          setAttendees(data);
      };

      fetchAttendanceData();
  }, [])


  return (
    <div>
      <SidePanel/>
      <div className='content-container'>
      <div className="attendance-dashboard">
            <h1>Attendance Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Participant ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Session Title</th>
                        <th>Check-in Time</th>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee) => (
                        <tr key={attendee.attendance_id}>
                            <td>{attendee.participant_id}</td>
                            <td>{attendee.name}</td>
                            <td>{attendee.email}</td>
                            <td>{attendee.session_title}</td>
                            <td>{attendee.check_in_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

      </div>
    </div>
  )
}

export default AttendanceManagement