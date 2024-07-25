import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {baseUrl} from "../../../static/baseUrl";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedImage} from "../../../redux/Global";
import ImageSelectSingle from "../Selects/ImageSelectSingle";

export default function EditAndCreateCategoryModal(props) {

    const dispatch = useDispatch()

    const [name, setName] = useState();
    const [errMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (props.type === "edit") {
            setName(props.pAndI?.category?.name)
        } else {
            //clear all input values
            dispatch(setSelectedImage(new Set()))
            setName("")
        }
    }, [props])

    const {selectedImage} = useSelector(selector => selector.globalReducer);

    const onSubmit = async () => {

        let imageId_
        for (const imageId of selectedImage.values()) imageId_ = imageId

        const body = {
            imageID: imageId_,
            name: name,
        }

        let request
        if (props.type === "edit") {
            request = await fetch(`${baseUrl}/category/update/${props.pAndI?.category._id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {Cookie: document.cookie, 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
        } else {
            request = await fetch(`${baseUrl}/category/create`, {
                method: "POST",
                credentials: "include",
                headers: {Cookie: document.cookie, 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
        }

        const response = await request.json()
        if (response.status === 200) window.location.reload();
        else setErrorMessage(response.message);

    }

    return (
        <Modal backdrop={"opaque"}
               isOpen={props.isOpen}
               onClose={props.onClose}
               size={"xl"}
               className={"bg-white/90 py-[20px]"}
        >
            <ModalContent>
                {(onClose) => (<>
                    {props.type === "edit" ? <ModalHeader className="flex flex-col gap-1">Edit Category</ModalHeader> :
                        <ModalHeader className="flex flex-col gap-1">Create Category</ModalHeader>}
                    <ModalBody className={"flex flex-col gap-4"}>
                        <div className={"flex gap-4"}>
                            <label className={"flex flex-col gap-[3px]"}>
                                <p className={"text-[12px]"}><strong>Name</strong></p>
                                <input className={"outline-none border border-gray-300 rounded-md p-3"}
                                       onChange={(e) => {
                                           setName(e.target.value)
                                       }} type={"text"} value={name}/>
                            </label>
                            <label className={"flex flex-col gap-[3px] grow"}>
                                <p className={"text-[12px]"}><strong>Images</strong></p>
                                <ImageSelectSingle selectedItem={props.selectedItem}/>
                            </label>
                        </div>

                        <p className={"mt-3 text-[14px] font-semibold text-red-900"}>{errMessage}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button className={"text-red-600"} variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button variant={"bordered"} className={"text-green-700 border border-green-700"}
                                onPress={() => onSubmit()}>
                            {props.type === "edit" ? <p>Edit</p> : <p>Create</p>}
                        </Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>);
}
