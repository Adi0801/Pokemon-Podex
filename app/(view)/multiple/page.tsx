"use client"

import React, { useState } from 'react';
import { PokemonType } from '@/app/types/PokemonType';
import { trpc } from '@/app/_trpc/client';
import { PokemonRow } from '@/app/Components/PokemonRow';

import { Typography, TextField, Button } from '@mui/material';

function MultipleView() {
  const [names, setNames] = useState<string[]>([]);
  const [pokemonData, setPokemonData] = useState<PokemonType[]>([]);
  const getPokemon = trpc.getPoke.getMultiplePokemons.useQuery({ names });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNames = e.target.value.split(',').map((name) => name.trim());
    setNames(inputNames);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Names:', names);
    const data = await getPokemon.data;
    setPokemonData(data || []);
    setNames([]);
  };

  return (
    <div className="max-w-md mx-auto">
      <Typography variant="h3" component="h1"  color= "green"  className="text-3xl font-bold mb-5 mu">Search Pokemon</Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="names" className="block mb-1">Pokemon-Name:</label>
          <TextField
            type="text"
            id="names"
            name="names"
            value={names.join(', ')}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter Pokemon Names"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Search Pokemon
        </Button>
      </form>
      {pokemonData.length > 0 ? (
        pokemonData.map((pokemon) => (
          <PokemonRow key={pokemon.id} pokemon={pokemon} />
        ))
      ) : (
        <Typography variant="body1" className="text-red-500">Please provide correct pokemon name.</Typography>
      )}
    </div>
  );
}

export default MultipleView;
