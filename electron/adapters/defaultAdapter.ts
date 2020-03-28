import { IFileAdapter } from "./abstraction";
import { Map, PrimarySkills, Hero } from "../model/model"
import { saveTextFile } from "../file-util"

export class DefaultAdapter implements IFileAdapter {

    getHeroNames(): Array<string> {

        return ["Solmyr", "Fafner", "Daremyth"];
       /* return ["Orrin",
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
        "Giselle"];*/
    }

    readData(buffer:Buffer): Map {
        const text = buffer.toString("ascii");

        saveTextFile("C:\\Games\\HoMM 3 Complete\\Games\\SaveGameEditor\\RawText\\output", text);
        console.log("start searching for heroes");

        const heroes:Array<Hero> = [];
        this.getHeroNames().forEach(heroName => { 
            let indexOf = 0;
            while (indexOf >= 0) {
                indexOf = text.indexOf(heroName, indexOf + 20);
                if (indexOf > 0) {
                    const hero = this.readHero(indexOf, heroName, buffer);
                    heroes.push(hero);
                } else {
                    break;
                }
            }
        });

        

        console.log(JSON.stringify(heroes));

        return new Map();
    }


    readHero(heroIndex:number,heroName: string ,buffer:Buffer): Hero {
        const primarySkills = this.readPrimarySkills(heroIndex, buffer);
        
        return new Hero(heroIndex, heroName, primarySkills);
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