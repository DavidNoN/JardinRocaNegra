import React from 'react';
import { Empty } from "antd";

const EmptyComponent = () => {
    return (
        <Empty description='No se encontraron resultados' style={{width: '100%', verticalAlign: 'center'}}/>
    );
};

export default EmptyComponent;
