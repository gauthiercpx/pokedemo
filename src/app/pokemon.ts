export class Pokemon {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  types?: string[];
  sprite?: string;
  abilities?: string[];

  constructor(
    id: number,
    name: string,
    height?: number,
    weight?: number,
    types?: string[],
    sprite?: string,
    abilities?: string[]
  ) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.sprite = sprite;
    this.abilities = abilities;
  }
}
