import { IMenuApp } from "../Interfaces/IMenuApp";
import { GiBurningTree, GiCactusPot, GiTreeSwing } from "react-icons/gi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";


export const MenuItems: IMenuApp<any>[] = [
    {
        name: "Coleccionistas",
        url: "/plants-available",
        component: GiCactusPot,
        props: {
            className: "bi d-block mx-auto mb-1 wh-24"
        }
    },
    {
        name: "Catálogo Por Mayor",
        url: "/wholesale",
        component: GiTreeSwing,
        props: {
            className: "bi d-block mx-auto mb-1 wh-24"
        }
    },
    {
        name: "Lo Nuevo",
        url: "/new-plants",
        component: GiBurningTree,
        props: {
            className: "bi d-block mx-auto mb-1 wh-24"
        }
    },
    {
        name: "Semillas",
        url: "/seeds",
        component: FontAwesomeIcon,
        props: {
            icon:  faSeedling,
            className: "bi d-block mx-auto mb-1 wh-24"
        }
    }
]