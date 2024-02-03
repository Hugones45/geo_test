import { useState } from 'react';

function App() {
  const [imageSrc, setImageSrc] = useState('');
  const [stateAcronym, setStateAcronym] = useState('');

  const [stateBr] = useState(['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'])
  const [toggle, setToggle] = useState(false)
  const [numbCheck, setNumbCheck] = useState(0)

  const generateMap = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/generate_map`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          state_acronym: stateAcronym.toUpperCase(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (stateBr.includes(stateAcronym.toUpperCase())) {
        setToggle(true);
        setImageSrc(`data:image/png;base64, ${result.image_base64}`);
      } else {
        setNumbCheck(1);
        setToggle(false);
      }
    } catch (error) {
      console.error('Error generating map:', error);
    }
  };

  return (
    <div>
      <label>
        State Acronym:
        <input
          type="text"
          value={stateAcronym}
          onChange={(e) => setStateAcronym(e.target.value)}
        />
      </label>
      <button onClick={generateMap}>Generate Map</button>
      {imageSrc && toggle && (
        <img
          key={imageSrc}
          src={imageSrc}
          alt="Map"
          style={{ width: '700px', height: '700px' }} // Set the width and height here
        />
      )}
      {!toggle && numbCheck > 0 && (
        <p>Estado não encontrado</p>
      )}
    </div>
  );
}

export default App;
