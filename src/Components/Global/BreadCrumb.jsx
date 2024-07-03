import React, {useEffect, useState} from 'react';
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

export default function BreadCrumb(props) {

    const _ = require('lodash')
    const navigator = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();
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
            {breadCrumbItems.map(value => {

                if (value.tag !== "Home") {
                    return <BreadcrumbItem onPress={() => {
                        navigator({
                            pathname: `/${value.ref}`,
                            search: searchParams.get("language") && `?language=${searchParams.get("language")}`
                        })
                        window.location.reload()
                    }}>{value.tag}
                    </BreadcrumbItem>
                }else {
                    return <BreadcrumbItem onPress={() => {
                        navigator({
                            pathname: `${value.ref}`,
                            search: searchParams.get("language") && `?language=${searchParams.get("language")}`
                        })
                        window.location.reload()
                    }}>{value.tag}
                    </BreadcrumbItem>
                }


            })}
        </Breadcrumbs>
    );
}
