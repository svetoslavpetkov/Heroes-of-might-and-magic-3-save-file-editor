
export interface PrimarySkills {
    Attack: Number;
    Defence: Number,
    SpellPower: Number,
    Knowledge: Number,
}

export enum SecondarySkill {
    Pathfinding = 0,
    Archery,
    Logistics,
    Scouting,
    Diplomacy,
    Navigation,
    Leadership,
    Wisdom,
    Mysticism,
    Luck,
    Ballistics,
    EagleEye,
    Necromancy,
    Estates,
    FireMagic,
    AirMagic,
    WaterMagic,
    EarthMagic,
    Scholar,
    Tactics,
    Artillery,
    Learning,
    Offense,
    Armourer,
    Intelligence,
    Sorcery,
    Resistance,
    FirstAid,
}

export enum SecondarySkillLevel {
    Basic = 1,
    Advanced = 2,
    Expert = 3,
}

export class Hero {
    startingIndex:number;
    name:string;
    primarySkills:PrimarySkills;
    constructor(startingIndex:number,name:string, primarySkills:PrimarySkills) {
        this.startingIndex = startingIndex;
        this.name = name;
        this.primarySkills = primarySkills;
    }
}

export class Map {
    heroes:Array<Hero> = [];
}