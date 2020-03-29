import { LearnedSecondarySkill } from "./SecondarySkill";

export interface PrimarySkills {
    Attack: Number;
    Defence: Number,
    SpellPower: Number,
    Knowledge: Number,
}


export interface Position {
    X: number,
    Y: number,
    surfaceIndex: number,
    isOnSurface: boolean
}

export interface OwnedCreature {
    creature: string,
    quantity: number,
}
export class Hero {
    startingIndex:number;
    name:string;
    experience: number;
    primarySkills:PrimarySkills;
    secondarySkills:LearnedSecondarySkill[];
    creatures: OwnedCreature[];
    position: Position;
    constructor(startingIndex:number,
        name:string,
        experience: number,
        primarySkills:PrimarySkills,
        position: Position,
        secondarySkills:LearnedSecondarySkill[],
        creatures: OwnedCreature[]) {
        this.startingIndex = startingIndex;
        this.name = name;
        this.experience = experience;
        this.primarySkills = primarySkills;
        this.position = position;
        this.secondarySkills = secondarySkills;
        this.creatures = creatures;
    }
}

export class Map {
    heroes:Array<Hero> = [];
}
