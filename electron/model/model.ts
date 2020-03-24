
export interface PrimarySkills {
    Attack: Number;
    Defence: Number,
    SpellPower: Number,
    Knowledge: Number,
}
export class Hero {
    name:string;
    primarySkills:PrimarySkills;
    constructor(name:string, primarySkills:PrimarySkills) {
        this.name = name;
        this.primarySkills = primarySkills;
    }
}

export class Map {
    heroes:Array<Hero> = [];
}