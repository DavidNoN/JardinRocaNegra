import React from 'react';
import { Tabs } from "antd";
import '../styles/AdminBaseScreen.scss';
import { itemsAdminTabs } from "../constants/Constants";
import { FaCirclePlus } from "react-icons/fa6";

const AdminBaseScreen = () => {
    return (
        <Tabs
            defaultActiveKey="1"
            className='admin-tabs'
            addIcon={<FaCirclePlus />}
            type="card"
            size='large'
            items={itemsAdminTabs}
        />
    );
};

export default AdminBaseScreen;
