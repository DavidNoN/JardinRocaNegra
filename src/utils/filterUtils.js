import { TbPlant2 } from "react-icons/tb";
import React from "react";
import { PiCactusFill } from "react-icons/pi";
import { GiBulb, GiCarnivorousPlant } from "react-icons/gi";
import { CARNIVOROUS, COLLECTOR } from "../constants/Constants";

export const buildFilterTreeObj = (categories, screenName) => {

    return [...categories]
        .filter(cat => screenName === COLLECTOR ? cat.name !== 'Carnivorous' : cat)
        .filter(cat => screenName === CARNIVOROUS ? cat.name === 'Carnivorous' : cat)
        .map(cat => {

        let icon;
        if (cat.name === 'Succulents') {
            icon = <TbPlant2 size={20} color={'#90486D'}/>;
        } else if (cat.name === 'Cactus') {
            icon = <PiCactusFill size={20} color={'#2C5920'}/>;
        } else if (cat.name === 'Bulbs') {
            icon = <GiBulb size={20} color={'#2C5920'}/>;
        } else {
            icon = <GiCarnivorousPlant size={20} color={'#2C5920'}/>;
        }

        return {
            title: cat.name,
            key: cat.name,
            icon: icon,
            children: cat.families.map(fam => {
                return {
                    title: fam.name,
                    key: cat.name + ' ' + fam.name,
                    children: fam.genres.map(genre => {
                        return {
                            title: genre.name,
                            key: cat.name + ' ' +  fam.name + ' ' +  genre.name
                        }
                    })
                }
            })
        }
    });
}

export const createDefaultSelected = (category, family, genre) => {

    if (genre) {
        return [`${category} ${family} ${genre}`];
    }

    if (!genre && family) {
        return [`${category} ${family}`];
    }

    if (!family) {
        return [`${category}`];
    }

}

export const createDefaultExpanded = (category, family, genre) => {

    if (genre) {
        return [`${category} ${family} ${genre}`];
    }

    if (!genre && family) {
        return [`${category} ${family}`];
    }

    if (!family) {
        return [`${category}`];
    }

}
