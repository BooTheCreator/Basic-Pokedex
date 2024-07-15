//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [id, setID] = useState(1)
  //const[allPokemon, setAllPokemon] = useState([])
  //const[displayPokemon, setDisplayPokemon] = useState([])
  //const[findex, setFIndex] = useState(0)
  const[name,setName] = useState("")
  const [stats, setStats] = useState([]);
  const [type, setType] = useState([]);
  const [color, setColor] = useState([])

  React.useEffect(() => {
    const fetchPokemon = async () => {
      try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw Error('Could not fetch API !');
        const listItems = await response.json();
        //console.log(listItems);
        //setAllPokemon(listItems);
        //setDisplayPokemon(listItems);
        setName(listItems.name)
        setStats(listItems.stats)
        setType(listItems.types)
        setColor(listItems.types.map(typeInfo => typeInfo.type.name));
      }catch(err){
        console.log(err.message);
      }
    }
  fetchPokemon();
  }, [id])
 
  const handleLoad = () => { //Load Next Pokemon
    // setFIndex(findex+1);
    // const index = findex + 1;
    // setDisplayPokemon((prev) => [
    //   ...prev,
    //   ...allPokemon.slice(findex, index),
    // ]);
    // //setFIndex(index);
    setID(id+1)
  }

  const handleBack = () => {
    setID(id - 1)
  }

  const handlePictures = (id) => { //Display Pokemon Picture
    //const id = url.split("/")[url.split("/").length - 2]
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  };

  const handleColor = (type) => {
    switch (type) {
      case 'grass':
        return '#78C850';
      case 'fire':
        return '#F08030';
      case 'water':
        return '#6890F0';
      case 'bug':
        return '#A8B820';
      case 'normal':
        return '#A8A878';
      case 'poison':
        return '#A040A0';
      case 'electric':
        return '#F8D030';
      case 'ground':
        return '#E0C068';
      case 'fairy':
        return '#EE99AC';
      case 'fighting':
        return '#C03028';
      case 'psychic':
        return '#F85888';
      case 'rock':
        return '#B8A038';
      case 'ghost':
        return '#705898';
      case 'ice':
        return '#98D8D8';
      case 'dragon':
        return '#7038F8';
      case 'dark':
        return '#705848';
      case 'steel':
        return '#B8B8D0';
      case 'flying':
        return '#A890F0';
      default:
        return '#A8A878';
    }
  };

  return (
    <main className = "body" style = {{backgroundColor : handleColor(color[0])}}>
    <div className = 'container' >
      <p className = 'title' style = {{color : "white", backgroundColor : handleColor(color[0])}}>{name.toUpperCase()}</p>
      <div className = "type" style = {{color : "white", backgroundColor : handleColor(color[0])}}>
      {type.map(x => (
        <div key={x.type.slot}>
          {x.type.name.toUpperCase()}
        </div>
      ))}
      </div>
      <div style = {{color: "white"}}>
      {stats.map(x => (
        <div key={x.stat.name}>
          {x.stat.name.toUpperCase()}
          <div className="stat-bar" style={{ width: `${x.base_stat}px`,backgroundColor : handleColor(color[0])}}>{x.base_stat}</div>
        </div>
      ))}
      <img src = {handlePictures(id)} alt = '' style={{ height: "15rem", width: "10rem"}}></img>
      </div>
      
      <div className = 'button-container'>
      <button onClick = {handleBack} disabled = {id === 1} style = {{backgroundColor : handleColor(color[0])}}>Previous Pokemon</button>
      <button onClick = {handleLoad} style = {{backgroundColor : handleColor(color[0])}}>Next Pokemon</button>
      </div> 
    </div>
    </main>
  );
}

export default App;
