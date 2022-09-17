export const adapterPokemon = (val) => {
  const types = val.types.map((x) => {
    return x.type.name
  })
  const abilities = val.abilities.map((x) => {
    return x.ability.name
  })

  return {
    types: types,
    abilities: abilities,
    pic: val.sprites.front_default,
    name: val.name,
    weight: val.weight,
    height: val.height
  }
}

export const adapterType = (val) => {
  const list = val.pokemon.map((x) => {
    return x.pokemon
  })

  return list
}
