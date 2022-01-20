import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState({});
  const [currentPokemonId, setCurrentPokemonId] = useState(0);
  const button = document.querySelector('button')

  const fetchPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  };

  const getRandomInt = (min = 1, max = 600) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const add = () => {
    if (pokemon.id === 600) {
      pokemon.id = 0;
    }
    return pokemon.id + 1;
  }

  const decrease = () => {
    if (pokemon.id === 1) {
      pokemon.id = 601;
    }
    return pokemon.id - 1;

  }

  useEffect(() => { 
   console.log({ pokemon });
    setCurrentPokemonId(pokemon.id);
    pokemon?.abilities?.map((ability) => console.log(ability.ability.name));
    setCurrentPokemonId(pokemon.id);  
  }, [pokemon]);

  return (
    <div className="App">    
      <header className="App-header">    
      <button className='btn-github'>
        <a  className='btn-github' href='https://github.com/gustavopadilla1/IDGS-10A_React-Pok-dex.git'>GitHub</a>
      </button>

        <div className="flex-container">
          <img
            src={pokemon?.sprites?.back_default ?? "https://m.media-amazon.com/images/I/91s3ed2bcdL._SX500_.jpg"}
            className="poke-image"
            alt="logo" />

          <img src={pokemon?.sprites?.front_default ?? "https://www.clipartmax.com/png/small/190-1908923_open-pokeball-clip-art-pokeball-hd-png.png"}
            className="poke-image"
            alt="logo" />

        </div>

        <a className='text'>{pokemon.id ?? ""}</a>
        <a className='text'>{pokemon.name ?? "No Pokemon Selected"}</a>

        <div className="flex-cotainer">
          <button className="button" onClick={() => fetchPokemon(decrease())}>Back</button>
          <button className="button" onClick={() => fetchPokemon(getRandomInt())}>Random</button>
          <button className="button" onClick={() => fetchPokemon(add())}> Next </button>
        </div>

      </header>
      
      <button className='button'>
        <a href="#miModal" className='button'>Abilidades</a>
      </button>


      <div id="miModal" className="modal">
        <div className="modal-contenido">    
          <h3>{"Nombre:"}</h3>
          <a className='text'> {pokemon?.name ?? "No Pokemon Selected"}</a>
          <h3>{"Abilidades"}</h3>

          <ul className='text'>
            {
              pokemon?.abilities?.map((ability) => (
                <li key={ability.ability.id}>                   
                    {ability.ability.name }                
                </li>                  
              ))
           
            }          
               <img src={pokemon?.sprites?.back_default } />
               <img src={pokemon?.sprites?.back_shiny} />              
               <img src={pokemon?.sprites?.front_default} />
               <img src={pokemon?.sprites?.front_shiny} />
               
          </ul>

          <button className="modal-boton-cerrar" href="#">
            <a className="modal-boton-cerrar" href="#">Cerrar</a>
          </button>
        </div>
      </div>
    </div>

  );
}


export default App;

