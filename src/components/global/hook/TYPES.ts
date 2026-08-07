import bug from '@/assets/types/bug.svg'
import dark from '@/assets/types/dark.svg'
import dragon from '@/assets/types/dragon.svg'
import electric from '@/assets/types/electric.svg'
import fairy from '@/assets/types/fairy.svg'
import fighting from '@/assets/types/fighting.svg'
import fire from '@/assets/types/fire.svg'
import flying from '@/assets/types/flying.svg'
import ghost from '@/assets/types/ghost.svg'
import grass from '@/assets/types/grass.svg'
import ground from '@/assets/types/ground.svg'
import ice from '@/assets/types/ice.svg'
import normal from '@/assets/types/normal.svg'
import poison from '@/assets/types/poison.svg'
import psychic from '@/assets/types/psychic.svg'
import rock from '@/assets/types/rock.svg'
import steel from '@/assets/types/steel.svg'
import water from '@/assets/types/water.svg'

export interface TypeInfo {
  name: string
  backgroundColor: string
  image: string
}

export const TYPES = new Map<string, TypeInfo>([
  ['bug', { name: 'Bicho', backgroundColor: '#A7B723', image: bug }],
  ['dark', { name: 'Siniestro', backgroundColor: '#75574C', image: dark }],
  ['dragon', { name: 'Dragón', backgroundColor: '#7037FF', image: dragon }],
  [
    'electric',
    { name: 'Eléctrico', backgroundColor: '#F9CF30', image: electric },
  ],
  ['fairy', { name: 'Hada', backgroundColor: '#E69EAC', image: fairy }],
  ['fighting', { name: 'Lucha', backgroundColor: '#C12239', image: fighting }],
  ['fire', { name: 'Fuego', backgroundColor: '#F57D31', image: fire }],
  ['flying', { name: 'Volador', backgroundColor: '#A891EC', image: flying }],
  ['ghost', { name: 'Fantasma', backgroundColor: '#70559B', image: ghost }],
  [
    'grass',
    {
      name: 'Planta',
      backgroundColor: '#74CB48',
      image: grass,
    },
  ],
  ['ground', { name: 'Tierra', backgroundColor: '#DEC16B', image: ground }],
  ['ice', { name: 'Hielo', backgroundColor: '#9AD6DF', image: ice }],
  ['normal', { name: 'Normal', backgroundColor: '#AAA67F', image: normal }],
  ['poison', { name: 'Veneno', backgroundColor: '#A43E9E', image: poison }],
  ['psychic', { name: 'Psíquico', backgroundColor: '#FB5584', image: psychic }],
  ['rock', { name: 'Roca', backgroundColor: '#B69E31', image: rock }],
  ['steel', { name: 'Acero', backgroundColor: '#B7B9D0', image: steel }],
  ['water', { name: 'Agua', backgroundColor: '#6493EB', image: water }],
])

export const getTypeInfo = (type: string) =>
  TYPES.get(type.toLowerCase()) ?? {
    name: type,
    backgroundColor: '#999999',
    image: '',
  }
