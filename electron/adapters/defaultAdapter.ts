import { IFileAdapter } from "./abstraction";
import { Map, PrimarySkills, Hero, Position, OwnedCreature, SecondarySkillLevel, SecondarySkill, LearnedSecondarySkill, Creature } from "../model/model"
import { saveTextFile } from "../file-util"

export class DefaultAdapter implements IFileAdapter {

    getHeroNames(): Array<string> {
        //return ["Solmyr", "Fafner", "Daremyth"];
       return ["Orrin",
        "Valeska",
        "Edric",
        "Sylvia",
        "Lord Haart",
        "Sorsha",
        "Christian",
        "Tyris",
        "Rion",
        "Adela",
        "Cuthbert",
        "Adelaide",
        "Ingham",
        "Sanya",
        "Loynis",
        "Caitlin",
        "Mephala",
        "Ufretin",
        "Jenova",
        "Ryland",
        "Thorgrim",
        "Ivor",
        "Clancy",
        "Kyrre",
        "Coronius",
        "Uland",
        "Elleshar",
        "Gem",
        "Malcom",
        "Melodia",
        "Alagar",
        "Aeris",
        "Piquedram",
        "Thane",
        "Josephine",
        "Neela",
        "Torosar",
        "Fafner",
        "Rissa",
        "Iona",
        "Astral",
        "Halon",
        "Serena",
        "Daremyth",
        "Theodorus",
        "Solmyr",
        "Cyra",
        "Aine",
        "Fiona",
        "Rashka",
        "Marius",
        "Ignatius",
        "Octavia",
        "Calh",
        "Pyre",
        "Nymus",
        "Ayden",
        "Xyron",
        "Axsis",
        "Olema",
        "Calid",
        "Ash",
        "Zydar",
        "Xarfax",
        "Straker",
        "Vokial",
        "Moandor",
        "Charna",
        "Tamika",
        "Isra",
        "Clavius",
        "Galthran",
        "Septienna",
        "Aislinn",
        "Sandro",
        "Nimbus",
        "Thant",
        "Xsi",
        "Vidomina",
        "Nagash",
        "Lorelei",
        "Arlach",
        "Dace",
        "Ajit",
        "Damacon",
        "Gunnar",
        "Synca",
        "Shakti",
        "Alamar",
        "Jaegar",
        "Malekith",
        "Jeddite",
        "Geon",
        "Deemer",
        "Sephinroth",
        "Darkstorn",
        "Yog",
        "Gurnisson",
        "Jabarkas",
        "Shiva",
        "Gretchin",
        "Krellion",
        "Crag Hack",
        "Tyraxor",
        "Gird",
        "Vey",
        "Dessa",
        "Terek",
        "Zubin",
        "Gundula",
        "Oris",
        "Saurug",
        "Bron",
        "Drakon",
        "Wystan",
        "Tazar",
        "Alkin",
        "Korbac",
        "Gerwulf",
        "Broghild",
        "Mirlanda",
        "Rosic",
        "Voy",
        "Verdish",
        "Merist",
        "Styg",
        "Andra",
        "Tiva",
        "Pasis",
        "Thunar",
        "Ignissa",
        "Lacus",
        "Monere",
        "Erdamon",
        "Fiur",
        "Kalt",
        "Luna",
        "Brissa",
        "Ciele",
        "Labetha",
        "Inteus",
        "Aenain",
        "Gelare",
        "Grindan",
        "Cassiopeia",
        "Corkes",
        "Jeremy",
        "Illor",
        "Derek",
        "Leena",
        "Anabel",
        "Miriam",
        "Casmetra",
        "Eovacius",
        "Spint",
        "Andal",
        "Manfred",
        "Zilare",
        "Astra",
        "Dargem",
        "Giselle",
        //campaign heroes
        "Xeron",
        ];
    }

    readData(buffer:Buffer): Map {
        const text = buffer.toString("ascii");

        saveTextFile("C:\\Games\\HoMM 3 Complete\\Games\\SaveGameEditor\\RawText\\output", text);
        console.log("start searching for heroes");

        const heroes:Array<Hero> = [];
        this.getHeroNames().forEach(heroName => {
            const tempHeroes: Array<Hero> = [];
            let indexOf = 0;
            while (indexOf >= 0) {
                indexOf = text.indexOf(heroName.padEnd(13, "\0"), indexOf + 20);
                if (indexOf > 0) {
                    const hero = this.readHero(indexOf, heroName, buffer);
                    tempHeroes.push(hero);
                } else {
                    break;
                }
            }

            if (tempHeroes.length > 0) {
                //we always add the last hero
                heroes.push(tempHeroes[tempHeroes.length-1]);
            }
        });

        console.log(JSON.stringify(heroes.filter(h => h.position.surfaceIndex <= 1)));

        return new Map();
    }

    readHero(heroIndex:number,heroName: string ,buffer:Buffer): Hero {
        const primarySkills = this.readPrimarySkills(heroIndex, buffer);
        const position = this.readPosition(heroIndex, buffer);
        const secondarySkiils = this.readSecondarySkills(heroIndex, buffer);
        const creatures = this.readCreatures(heroIndex, buffer);
        return new Hero(heroIndex, heroName, primarySkills, position, secondarySkiils, creatures);
    }

    readCoordinate(index1: number, index2: number, buffer: Buffer):number {
        return buffer.readInt16LE(index1);
    }

    readSecondarySkills(heroIndex: number, buffer: Buffer):LearnedSecondarySkill[] {
        const tempResult: LearnedSecondarySkill[] = [];
        const skillsLevelOffset = +13;
        for (let index = 0; index < 28; index++) {
            if(buffer[heroIndex + skillsLevelOffset + index] > 0) {
                tempResult.push({
                    level: buffer[heroIndex + skillsLevelOffset + index],
                    skill: index,
                });
            }
        }

        const skillPosittionOffsett = +41;
        const orderedResult: LearnedSecondarySkill[] = new Array(tempResult.length);
        tempResult.forEach(learnedSkill => {
            const skillIndex = buffer[heroIndex + skillPosittionOffsett + learnedSkill.skill];
            orderedResult[skillIndex-1] = learnedSkill;
        });
        return orderedResult;
    } 

    readCreatures(heroIndex: number, buffer: Buffer):OwnedCreature[] {
        const creatureIdOffset = -56;
        const creatureAmoutnOffset = -28;

        return [0,1,2,3,4,5,6].map( index => {
            const creatureId = buffer[heroIndex + creatureIdOffset + index*4];
            const creature: Creature = (creatureId === 255) ? Creature.NoCreature : creatureId;

            let quantity = 0;

            if(creatureId !== Creature.NoCreature) {
                quantity = buffer.readInt16LE(heroIndex + creatureAmoutnOffset + index*4);
            }

            return { 
                creature,
                quantity
            }
        });
    }

    readPosition(heroIndex: number, buffer: Buffer): Position {
       const surfaceData = buffer[heroIndex - 191];
       if (surfaceData < 0 || 1 < surfaceData) {
        console.error(`Hero index ${heroIndex} invalid surface value: ${surfaceData}`);
       }
       else {
           console.log(`Hero index ${heroIndex} has VALID  surface value: ${surfaceData}`)
       }
       return {
           X: this.readCoordinate(heroIndex - 195, heroIndex - 194, buffer),
           Y: this.readCoordinate(heroIndex - 193, heroIndex - 192, buffer),
           surfaceIndex: surfaceData,
           isOnSurface: surfaceData === 0,
       }
    }


    readPrimarySkills(heroIndex:number, buffer:Buffer): PrimarySkills {
        const primarySkillsOffset = 69;

        const result:PrimarySkills = {
            Attack: 1,
            Defence:1,
            SpellPower:1,
            Knowledge:1,
         }

         result.Attack = buffer[heroIndex + primarySkillsOffset];
         result.Defence = buffer[heroIndex + primarySkillsOffset+1];
         result.SpellPower = buffer[heroIndex + primarySkillsOffset+2];
         result.Knowledge = buffer[heroIndex + primarySkillsOffset+3];

         return result;
    }
    
}
