import { IFileAdapter } from "./abstraction";
import { Map, PrimarySkills, Hero, Position, OwnedCreature } from "../model/model"
import { saveTextFile } from "../file-util"
import { LearnedSecondarySkill, SecondarySkill } from "../model/SecondarySkill";
import { Creature } from "../model/Creature";
import { MapMode } from "../model/MapMode";
import { HeroDefinition } from "../model/HeroDefinition";

export class DefaultAdapter implements IFileAdapter {

    getHeroNames(mapMode: MapMode): Array<string> {
       return HeroDefinition
        .getAll(mapMode)
        .map(h => h.name);
    }

    readData(buffer:Buffer): Map {
        const text = buffer.toString("ascii");

        saveTextFile("C:\\Games\\HoMM 3 Complete\\Games\\SaveGameEditor\\RawText\\output", text);
        console.log("start searching for heroes");

        const heroes:Array<Hero> = [];
        this.getHeroNames(MapMode.ShadowOfDeath).forEach(heroName => {
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
        const secondarySkills = this.readSecondarySkills(heroIndex, buffer);
        const creatures = this.readCreatures(heroIndex, buffer);
        const experience = this.readExperience(heroIndex, buffer);
        return new Hero(heroIndex, heroName, experience, primarySkills, position, secondarySkills, creatures);
    }

    readCoordinate(index1: number, index2: number, buffer: Buffer):number {
        return buffer.readInt16LE(index1);
    }

    readSecondarySkills(heroIndex: number, buffer: Buffer):LearnedSecondarySkill[] {

        const allSkills = SecondarySkill.getAll();
        const tempResult: LearnedSecondarySkill[] = [];
        const skillsLevelOffset = +13;
        for (let index = 0; index < 28; index++) {
            if(buffer[heroIndex + skillsLevelOffset + index] > 0) {

                const skill = allSkills.find(s => s.index === index);

                tempResult.push({
                    level: buffer[heroIndex + skillsLevelOffset + index],
                    skill: skill.name,
                });
            }
        }

        const skillPosittionOffsett = +41;
        const orderedResult: LearnedSecondarySkill[] = new Array(tempResult.length);
        tempResult.forEach(learnedSkill => {
            const skillOffset = allSkills.find(s => s.name === learnedSkill.skill).index
            const skillIndex = buffer[heroIndex + skillPosittionOffsett + skillOffset];
            orderedResult[skillIndex-1] = learnedSkill;
        });
        return orderedResult;
    } 

    readCreatures(heroIndex: number, buffer: Buffer):OwnedCreature[] {
        const creatureIdOffset = -56;
        const creatureAmoutnOffset = -28;

        const allCreatures = Creature.getAll(MapMode.ShadowOfDeath);

        return [0,1,2,3,4,5,6].map( index => {
            const creatureId = buffer[heroIndex + creatureIdOffset + index*4];
            const creature: string = (creatureId === 255) ? null : allCreatures.find(c => c.id === creatureId).name;

            let quantity = 0;

            if(creatureId !== null) {
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
       return {
           X: buffer.readInt16LE(heroIndex - 195),
           Y: buffer.readInt16LE(heroIndex - 193),
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

    readExperience(heroIndex:number, buffer:Buffer): number {
        const experienceOffset = -130;
        return buffer.readInt32LE(heroIndex + experienceOffset);
    }
    
}
