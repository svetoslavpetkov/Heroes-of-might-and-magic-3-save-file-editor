import { IFileAdapter } from "./abstraction";
import { Map } from "../model/model"

export class DefaultAdapter implements IFileAdapter {

    getHeroNames(): Array<string> {
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
        "Giselle"];
    }

    readData(buffer:Buffer): Map {
        const text = buffer.toString("ascii");
        console.log("start searching for heroes");
        this.getHeroNames().forEach(heroName => {
            const posittions: Array<number> = []; 
            let indexOf = 0;
            while (indexOf >= 0) {
                indexOf = text.indexOf(heroName, indexOf + 8);
                if (indexOf > 0) {
                    posittions.push(indexOf);
                } else {
                    break;
                }
            }

            if (posittions.length === 0 ){
                console.log(`Hero ${heroName.padEnd(20)} NOT FOUND`);
            } else {
                console.log(`Hero ${heroName.padEnd(20)} at positions: ${posittions.join(", ")}`);
            }
        });

        console.log("end searching for heroes");

        return new Map();
    }
    
}