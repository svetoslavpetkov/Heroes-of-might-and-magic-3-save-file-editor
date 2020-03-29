
export interface PrimarySkills {
    Attack: Number;
    Defence: Number,
    SpellPower: Number,
    Knowledge: Number,
}

export enum Creature {
    NoCreature = 0,
Pikeman,
Halberdier,
Archer,
Marksman,
Griffin,
RoyalGriffin,
Swordsman,
Crusader,
Monk,
Zealot,
Cavalier,
Champion,
Angel,
Archangel,
Centaur,
CentaurCapitan,
Dwarf,
BattleDwarf,
WoodElf,
GrandElf,
Pegasus,
SilverPegasus,
DendroidGuard,
DendroidSolider,
Unicorn,
WarUnicorn,
GreenDragon,
GoldDragon,
Gremlin,
MasterGremlin,
StoneGargoyle,
ObsidianGargoyle,
StoneGolem,
IronGolem,
Mage,
ArchMage,
Genie,
MasterGenie,
Naga,
NagaQueen,
Giant,
Titan,
Imp,
Familiar,
Gog,
Magog,
HellHound,
Cerberus,
Daemon,
HornedDaemon,
PitFiend,
PitLord,
Efreet,
EfreetSultan,
Devil,
ArchDevil,
Skeleton,
SkeletonWarrior,
WalkingDead,
Zombie,
Wight,
Wraight,
Vampire,
VampireLord,
Lich,
PowerLich,
BlackKnight,
DeadKnight,
BoneDragon,
GhostDragon,
Tryglodyte,
InfernalTryglodyte,
Harpy,
HarpyHag,
Beholder,
EvilEye,
Medusa,
MedusaQueen,
Minotaur,
MinotaurKing,
Manticore,
Scorpicore,
RedDragon,
BlackDragon,
Goblin,
Hobgoblin,
WolfRider,
WolfRaider,
Orc,
OrcChieftain,
Ogre,
OgreMage,
Roc,
Thunderbird,
Cyclops,
CyclopsKing,
Behemoth,
AncientBehemoth,
Gnoll,
GnollMarauder,
Lizardman,
LizardWarrior,
SerpentFly,
Dragonfly,
Basilisk,
GreaterBasilisk,
Gorgon,
MightyGorgon,
Wyvern,
WyvernMonarch,
Hydra,
ChaosHydra,
AirElemental,
EarthElemental,
FireElemental,
WaterElemental,
Golem,
DiamondGolem,
Pixies,
Sprites,
PsychicElementals,
MagicElementals,
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

export interface LearnedSecondarySkill {
    skill: SecondarySkill,
    level: SecondarySkillLevel,
}

export interface Position {
    X: number,
    Y: number,
    surfaceIndex: number,
    isOnSurface: boolean
}

export interface OwnedCreature {
    creature: Creature,
    quantity: number,
}
export class Hero {
    startingIndex:number;
    name:string;
    primarySkills:PrimarySkills;
    secondarySkills:LearnedSecondarySkill[];
    creatures: OwnedCreature[];
    position: Position;
    constructor(startingIndex:number,name:string, primarySkills:PrimarySkills, position: Position,
        secondarySkills:LearnedSecondarySkill[], creatures: OwnedCreature[]) {
        this.startingIndex = startingIndex;
        this.name = name;
        this.primarySkills = primarySkills;
        this.position = position;
        this.secondarySkills = secondarySkills;
        this.creatures = creatures;
    }
}

export class Map {
    heroes:Array<Hero> = [];
}
