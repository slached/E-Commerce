import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import SelectField from "../Select";
import {baseUrl} from "../../../static/baseUrl";
import {useSelector} from "react-redux";

export default function EditProduct(props) {

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [votes, setVotes] = useState();
    const [stars, setStars] = useState();
    const [discountPercentage, setDiscountPercentage] = useState();
    const [errMessage, setErrorMessage] = useState("")

    useEffect(() => {
        setName(props.pAndI?.product?.name)
        setPrice(props.pAndI?.product?.price)
        setQuantity(props.pAndI?.product?.quantity)
        setVotes(props.pAndI?.product?.votes)
        setStars(props.pAndI?.product?.stars)
        setDiscountPercentage(props.pAndI?.product?.discountPercentage)

    }, [props])

    const {selectedImages} = useSelector(selector => selector.globalReducer);

    const onEditTriggered = async () => {

        const images = []
        for (const image of selectedImages) images.push(image)

        const body = {
            imageId: images,
            name: name,
            price: price,
            quantity: quantity,
            votes: votes,
            stars: stars,
            discountPercentage: discountPercentage,
        }

        const updateRequest = await fetch(`${baseUrl}/product/update/${props.pAndI?.product._id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {Cookie: document.cookie, 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const response = await updateRequest.json()
        if (response.status === 200) window.location.reload()
        else setErrorMessage(response.message)

    }

    return (
        <Modal backdrop={"opaque"}
               isOpen={props.isOpen}
               onClose={props.onClose}
               size={"2xl"}
               className={"bg-white/90 py-[20px]"}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
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
                                    <SelectField selectedItems={props.selectedItems} allItems={props.images}/>
                                </label>
                            </div>
                            <div className={"flex gap-2"}>
                                <label className={"flex flex-col gap-[3px]"}>
                                    <p className={"text-[12px]"}><strong>Price</strong></p>
                                    <input className={"outline-none border border-gray-300 rounded-md p-3"}
                                           onChange={(e) => {
                                               setPrice(e.target.value)
                                           }} type={"text"} value={price}/>
                                </label>
                                <label className={"flex flex-col gap-[3px]"}>
                                    <p className={"text-[12px]"}><strong>Quantity</strong></p>
                                    <input className={"outline-none border border-gray-300 rounded-md p-3"}
                                           onChange={(e) => {
                                               setQuantity(e.target.value)
                                           }} type={"text"} value={quantity}/>
                                </label>
                                <label className={"flex flex-col gap-[3px]"}>
                                    <p className={"text-[12px]"}><strong>Votes</strong></p>
                                    <input className={"outline-none border border-gray-300 rounded-md p-3"}
                                           onChange={(e) => {
                                               setVotes(e.target.value)
                                           }} type={"text"} value={votes}/>
                                </label>
                            </div>
                            <div className={"flex gap-2"}>
                                <label className={"flex flex-col gap-[3px]"}>
                                    <p className={"text-[12px]"}><strong>Stars</strong></p>
                                    <input className={"outline-none border border-gray-300 rounded-md p-3"}
                                           onChange={(e) => {
                                               setStars(e.target.value)
                                           }} type={"text"} value={stars}/>
                                </label>
                                <label className={"flex flex-col gap-[3px]"}>
                                    <p className={"text-[12px]"}><strong>Discount Percentage</strong></p>
                                    <input className={"outline-none border border-gray-300 rounded-md p-3"}
                                           onChange={(e) => {
                                               setDiscountPercentage(e.target.value)
                                           }} type={"text"} value={discountPercentage}/>
                                </label>
                            </div>
                            <p className={"mt-3 text-[14px] font-semibold text-red-900"}>{errMessage}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button className={"text-red-600"} variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button variant={"bordered"} className={"text-green-700 border border-green-700"} onPress={() => onEditTriggered()}>
                                Edit
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
