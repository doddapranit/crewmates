import { useState, useEffect } from 'react';
import EditCrewmateModal from './EditCrewmateModal';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabase = createClient('https://odulradenujvtqndhfxp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdWxyYWRlbnVqdnRxbmRoZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNDk4MDcsImV4cCI6MTk5NjcyNTgwN30.2NejGmYaQFcYySsBbQCIkmcF9roVnIaCzBvDP04HAR4');

function HomePage() {
  const [crewmates, setCrewmates] = useState([]);
  const [selectedCrewmate, setSelectedCrewmate] = useState(null);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  async function fetchCrewmates() {
    const { data } = await supabase.from('crewmate').select('*');
    setCrewmates(data);
  }

  async function handleEditCrewmate(crewmate) {
    setSelectedCrewmate(crewmate);
  }

  async function handleDeleteCrewmate(id) {
    const { error } = await supabase.from('crewmate').delete().eq('id', id);
    if (error) {
      alert('Error deleting crewmate');
    } else {
      fetchCrewmates();
    }
  }

  async function handleModalClose() {
    setSelectedCrewmate(null);
    fetchCrewmates();
  }

  return (
    <div>
      <h1>Crewmates</h1>
      <ul>
        {crewmates.map((crewmate) => (
          <li key={crewmate.id}>
            <Link to={`/crewmate/${crewmate.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid gray', borderRadius: '5px', marginBottom: '10px' }}>
                <div style={{ marginRight: '10px' }}>{crewmate.name}</div>
                <div style={{ width: '20px', height: '20px', backgroundColor: crewmate.color }}></div>
              </div>
            </Link>
            <button onClick={() => handleEditCrewmate(crewmate)}>Edit</button>
            <button onClick={() => handleDeleteCrewmate(crewmate.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedCrewmate && <EditCrewmateModal crewmate={selectedCrewmate} onClose={handleModalClose} />}
      <Link to="/new-crewmate">Create a Crewmate</Link>
    </div>
  );
}

export default HomePage;
