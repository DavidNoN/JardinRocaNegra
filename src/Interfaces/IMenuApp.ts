import React from "react";

type Component = React.FC<any> | React.LazyExoticComponent<React.FC<any>>

export interface IMenuApp<C extends Component> {
    name: string;
    url: string
    component: C;
    props?: React.ComponentProps<C>;
}

