import React from 'react';
import Button from "../Components/Button";
import {Link, useSearchParams} from "react-router-dom";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";

export default function Page404(props) {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className={"flex flex-col gap-[40px] px-[135px] py-[80px]"}>
            <Breadcrumbs
                separator="/"
                itemClasses={{
                    separator: "px-2"
                }}
                className={"mb-[100px]"}
            >
                <BreadcrumbItem>
                    <Link to={{
                        pathname: '/',
                        search: searchParams.get("language") && `?language=${searchParams.get("language")}`
                    }}>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>404 Error</BreadcrumbItem>

            </Breadcrumbs>
            <h1 className={"text-center text-[110px] font-medium"}>404 Not Found</h1>
            <p className={"text-center mb-[40px] font-semibold"}>Your visited page not found. You may go home page.</p>
            <Link to={{
                pathname: '/',
                search: searchParams.get("language") && `?language=${searchParams.get("language")}`
            }}
                  className={"flex justify-center mb-[60px]"}>
                <Button text={"Back to home page"}/>
            </Link>
        </div>
    );
}
