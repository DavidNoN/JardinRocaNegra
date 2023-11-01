import React from 'react';
import PlantCardComponent from "../Shared/PlantCardComponent";
import { Col, Row } from "antd";
import { checkTitleForSoldOutAndNewItem } from "../Utils/PlantCardUtils";
import { NEW, NEW_PLANTS } from "../Constants/Constants";
import PropTypes from "prop-types";

const NewPlantsScreen = ( { plants, user } ) => {

    return (
        <Row gutter={[ 16, 16 ]}>
            {
                plants.filter( ( plant ) => checkTitleForSoldOutAndNewItem( plant.quantity, new Date( plant.publishedDate ) ) === NEW ).map( ( plant ) => (
                    <Col key={plant.uid} xs={{ span: 21, offset: 1 }} sm={{ span: 21, offset: 1 }}
                         md={{ span: 11, offset: 1 }}
                         lg={{ span: 11, offset: 1 }} xl={{ span: 7, offset: 1 }} xxl={{ span: 5, offset: 1 }}
                    >
                        <PlantCardComponent isLoading={false} plantObj={plant} user={user} screen={NEW_PLANTS}/>
                    </Col>
                ) )
            }
        </Row>

    );
};

NewPlantsScreen.propTypes = {
    plants: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};
export default NewPlantsScreen;
