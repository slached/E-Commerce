import React, {useEffect, useState} from 'react';
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
import {useLocation, useNavigate} from "react-router-dom";

export default function BreadCrumb(props) {

    const _ = require('lodash')
    const navigator = useNavigate()
    const location = useLocation()

    const [breadCrumbItems, setBreadCrumbItems] = useState([])
    useEffect(() => {
        const items = location.pathname.split("/").map(value => {
            if (value.length === 0) {
                return {tag: "Home", ref: "/"}
            } else {
                return {tag: _.capitalize(value), ref: value}
            }
        })
        setBreadCrumbItems(prevState => [...prevState, ...items])
    }, []);


    return (
        <Breadcrumbs
            separator="/"
            itemClasses={{
                separator: "px-2"
            }}
        >
            {breadCrumbItems.map(value => <BreadcrumbItem onPress={() => {

                navigator(value.ref)
                window.location.reload()

            }}>{value.tag}</BreadcrumbItem>)}
        </Breadcrumbs>
    );
}
