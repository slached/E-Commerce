import React, {useEffect, useState} from 'react';
import {baseUrl} from "../../static/baseUrl";
import {Progress} from "@nextui-org/react";

export default function UploadImageForm(props) {

    const [file, setFile] = useState(null);
    const formData = new FormData();
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        formData.append("image", file);
    }, [file])

    return (
        <div className={"p-5 flex flex-col gap-4"}>
            <input onInput={event => {
                setFile(event.target.files[0])
            }} type={"file"}/>
            <button
                className={"border border-white rounded-md max-w-fit px-4 py-1"}
                onClick={() => {
                    fetch(`${baseUrl}/image/upload`, {
                        method: "POST",
                        credentials: "include",
                        headers: {Cookie: document.cookie},
                        body: formData

                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.status === 200) {
                                setErr("")
                                setLoading(prevState => !prevState)
                                setTimeout(() => {
                                    setSuccess(res.message)
                                    setLoading(prevState => !prevState)
                                }, 1500)
                            } else {
                                setSuccess("")
                                setErr(res.message)
                            }
                        })
                }}>Upload Image
            </button>
            {loading && <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md"/>}
            {err?.length > 0 && <p className={"text-red-600 text-[12px] font-semibold "}>{err.substring(0,50)}</p>}
            {success?.length > 0 &&
                <p className={"text-green-600 text-[12px] font-semibold "}>{success}</p>}
        </div>
    );
}

