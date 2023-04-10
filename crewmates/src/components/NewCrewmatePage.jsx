import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabase = createClient('https://odulradenujvtqndhfxp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdWxyYWRlbnVqdnRxbmRoZnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNDk4MDcsImV4cCI6MTk5NjcyNTgwN30.2NejGmYaQFcYySsBbQCIkmcF9roVnIaCzBvDP04HAR4');

function NewCrewmatePage() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('crewmate')
      .insert([{ name, color }]);
    if (error) {
      console.log('An error occurred:', error);
    } else {
      console.log('Data inserted successfully:', data);
    }

    // Reset form fields
    setName('');
    setColor('');
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Color:
        <select value={color} onChange={handleColorChange}>
          <option value="">--Select a color--</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="pink">Pink</option>
          <option value="orange">Orange</option>
     
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NewCrewmatePage;
