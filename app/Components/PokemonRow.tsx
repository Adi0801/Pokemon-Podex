import { PokemonType } from "../types/PokemonType";

import { Grid, Typography, Avatar } from '@mui/material';

export function PokemonRow({ pokemon }: { pokemon: PokemonType }) {
    return (
      <Grid container alignItems="center" borderBottom={1} py={2}>
      <Grid item xs={3}>
        <Typography>{pokemon.id}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{pokemon.name}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{pokemon.types}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Avatar alt={pokemon.name} src={pokemon.sprite} sx={{ width: 48, height: 48 }} />
      </Grid>
    </Grid>
    );
  }
