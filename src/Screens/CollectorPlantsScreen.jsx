import React from 'react';
import { Col, Row } from "antd";
import PlantCardComponent from "../Shared/PlantCardComponent";
import PropTypes from "prop-types";

const CollectorPlantsScreen = ( { plants, user } ) => {

    return (
        <Row gutter={[ 16, 16 ]}>
            {
                plants.filter( ( plant ) => plant.priceCollector && plant.category !== 'Carnivorous' ).map( ( plant ) => (
                    <Col key={plant.uid} xs={{ span: 21, offset: 1 }} sm={{ span: 21, offset: 1 }}
                         md={{ span: 11, offset: 1 }}
                         lg={{ span: 11, offset: 1 }} xl={{ span: 7, offset: 1 }} xxl={{ span: 5, offset: 1 }}
                    >
                        <PlantCardComponent isLoading={false} plantObj={plant} user={user} screen={'COLLECTOR'}/>
                    </Col>
                ) )
            }
        </Row>
    );
};

CollectorPlantsScreen.propTypes = {
    plants: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

export default CollectorPlantsScreen;
