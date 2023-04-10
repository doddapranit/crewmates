import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://odulradenujvtqndhfxp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdWxyYWRlbnVqdnRxbmRoZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNDk4MDcsImV4cCI6MTk5NjcyNTgwN30.2NejGmYaQFcYySsBbQCIkmcF9roVnIaCzBvDP04HAR4');

function CrewmatePage() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    fetchCrewmate();
  }, []);

  async function fetchCrewmate() {
    const { data, error } = await supabase.from('crewmate').select('*').eq('id', id).single();
    if (error) {
      alert('Error fetching crewmate');
    } else {
      setCrewmate(data);
    }
  }

  return (
    <div>
      {crewmate ? (
        <>
          <h1>{crewmate.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid gray', borderRadius: '5px', marginBottom: '10px' }}>
            <div style={{ marginRight: '10px' }}>Name: {crewmate.name}</div>
            <div style={{ width: '20px', height: '20px', backgroundColor: crewmate.color }}></div>
          </div>
          <button onClick={() => window.history.back()}>Back</button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CrewmatePage;
