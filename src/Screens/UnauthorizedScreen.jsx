import React from 'react';
import { Button, Result } from 'antd';

const UnauthorizedScreen = () => (
    <Result
        status="403"
        title="403"
        subTitle="Lo siento, no estas autorizado para ver este sitio."
        extra={<Button type="primary">Regresar a lo Nuevo</Button>}
    />
);

export default UnauthorizedScreen;
