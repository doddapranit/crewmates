import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://odulradenujvtqndhfxp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdWxyYWRlbnVqdnRxbmRoZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNDk4MDcsImV4cCI6MTk5NjcyNTgwN30.2NejGmYaQFcYySsBbQCIkmcF9roVnIaCzBvDP04HAR4');

function EditCrewmateModal({ crewmate, onClose }) {
  const [name, setName] = useState(crewmate.name);
  const [color, setColor] = useState(crewmate.color);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from('crewmate')
        .update({ name, color })
        .eq('id', crewmate.id);
      if (error) {
        throw error;
      }
      onClose();
    } catch (error) {
      console.log('Error updating crewmate: ', error.message);
    }
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', maxWidth: '500px' }}>
        <h2>Edit Crewmate</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="color">Color:</label>
            <select id="color" value={color} onChange={(event) => setColor(event.target.value)}>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="pink">Pink</option>
              <option value="orange">Orange</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCrewmateModal;
