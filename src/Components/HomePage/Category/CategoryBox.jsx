import React from 'react';

export default function CategoryBox(props) {
    return (
        <div
            className={"flex flex-col items-center justify-center gap-[11px] px-[57px] py-[24px] rounded-[4px] border border-gray-400"}>
            <img alt={`category-box-${props.category}`} src={props.src}/>
            <p className={"font-semibold"}>{props.category}</p>
        </div>
    );
}
