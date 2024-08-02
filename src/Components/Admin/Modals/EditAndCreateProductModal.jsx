import React, {useEffect, useState} from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Switch
} from "@nextui-org/react";
import ImageSelect from "../Selects/ImageSelectMultiple";
import {baseUrl} from "../../../static/baseUrl";
import {useDispatch, useSelector} from "react-redux";
import {
    clearColorTypes,
    clearSizeTypes,
    setColorTypes,
    setSelectedCategories,
    setSelectedImages, setSizeTypes
} from "../../../redux/Global";
import CategorySelect from "../Selects/CategorySelect";
import SelectForColorAndSizeOptions from "../Selects/SelectForColorAndSizeOptions";

export default function EditAndCreateProductModal(props) {

    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [votes, setVotes] = useState("");
    const [stars, setStars] = useState("");
    const [description, setDescription] = useState("");
    const [colorSwitch, setColorSwitch] = useState(false);
    const [sizeSwitch, setSizeSwitch] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [errMessage, setErrorMessage] = useState("")

    const {selectedImages, selectedCategories, colorTypes, sizeTypes} = useSelector(selector => selector.globalReducer);

    useEffect(() => {
        //clear first
        dispatch(clearColorTypes())
        dispatch(clearSizeTypes())
        setColorSwitch(false)
        setSizeSwitch(false)

        //if edit so set initial values
        if (props.type === "edit") {
            setName(props.pAndI?.product?.name)
            setPrice(props.pAndI?.product?.price)
            setQuantity(props.pAndI?.product?.quantity)
            setVotes(props.pAndI?.product?.votes)
            setStars(props.pAndI?.product?.stars)
            setDiscountPercentage(props.pAndI?.product?.discountPercentage)
            setDescription(props.pAndI?.product?.description)
            props.pAndI?.product?.colorOptions.length !== 0 && dispatch(setColorTypes(props.pAndI?.product?.colorOptions))
            props.pAndI?.product?.sizeOptions.length !== 0 && dispatch(setSizeTypes(props.pAndI?.product?.sizeOptions))

            //if current item has any color or size option set open that switch
            props.pAndI?.product?.colorOptions.length !== 0 && setColorSwitch(true)
            props.pAndI?.product?.sizeOptions.length !== 0 && setSizeSwitch(true)

        } else {
            //clear all input values
            dispatch(setSelectedImages(new Set()))
            dispatch(setSelectedCategories(new Set()))
            setName("")
            setPrice("")
            setQuantity("")
            setVotes("")
            setStars("")
            setDiscountPercentage("")
            setDescription("")
        }
    }, [props])

    const onSubmit = async () => {

        const body = {
            imageId: Array.from(selectedImages),
            categoryId: Array.from(selectedCategories),
            name: name,
            price: price,
            quantity: quantity,
            votes: votes,
            stars: stars,
            discountPercentage: discountPercentage,
            description: description,
            /*if any of the switches are off so just send blank array*/
            colorOptions: colorSwitch ? colorTypes : [],
            sizeOptions: sizeSwitch ? sizeTypes : []
        }

        let request
        if (props.type === "edit") {
            request = await fetch(`${baseUrl}/product/update/${props.pAndI?.product._id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {Cookie: document.cookie, 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
        } else {
            request = await fetch(`${baseUrl}/product/create`, {
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
               size={"2xl"}
               className={"bg-white/90 py-[20px]"}>
            <ModalContent>
                {(onClose) => (<>
                    {props.type === "edit" ?
                        <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader> :
                        <ModalHeader className="flex flex-col gap-1">Create Product</ModalHeader>
                    }
                    <ModalBody className={"flex flex-col gap-4"}>
                        <div className={"flex gap-4"}>
                            <label className={"flex flex-col gap-[3px]"}>
                                <p className={"text-[12px]"}><strong>Name</strong></p>
                                <input className={"outline-none border border-gray-300 rounded-md p-3"}
                                       onChange={(e) => {
                                           setName(e.target.value)
                                       }} type={"text"} value={name}/>
                            </label>
                            <label className={"flex flex-col gap-[3px]"}>
                                <p className={"text-[12px]"}><strong>Images</strong></p>
                                <ImageSelect selectedImages={props.selectedImages}/>
                            </label>
                            <label className={"flex flex-col gap-[3px]"}>
                                <p className={"text-[12px]"}><strong>Categories</strong></p>
                                <CategorySelect selectedCategories={props.selectedCategories}/>
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

                        <div className={"flex gap-4"}>
                            <div className={"flex flex-col gap-4"}>
                                <label className={"flex flex-col gap-[3px]"}>
                                    <p className={"text-[12px]"}><strong>Color Options</strong></p>
                                    <Switch isSelected={colorSwitch} onValueChange={setColorSwitch}
                                            aria-label="Automatic updates"/>
                                </label>

                                {colorSwitch && <div className={"flex gap-2"}>
                                    <label className={"flex flex-col gap-[3px]"}>
                                        <div className={"flex justify-between px-[10px]"}>
                                            <p className={"w-[20px]"}></p>
                                            <p className={"text-[12px]"}><strong>Color</strong></p>
                                            <p className={"text-[12px]"}><strong>Quantity</strong></p>
                                        </div>
                                        <SelectForColorAndSizeOptions type={"color"}/>
                                    </label>
                                </div>}
                            </div>

                            <div className={"flex flex-col gap-4"}>
                                <label className={"flex flex-col gap-[3px]"}>
                                    <p className={"text-[12px]"}><strong>Size Options</strong></p>
                                    <Switch isSelected={sizeSwitch} onValueChange={setSizeSwitch}
                                            aria-label="Automatic updates"/>
                                </label>

                                {sizeSwitch && <div className={"flex gap-2"}>
                                    <label className={"flex flex-col gap-[3px]"}>
                                        <div className={"flex justify-between px-[10px]"}>
                                            <p className={"w-[20px]"}></p>
                                            <p className={"text-[12px]"}><strong>Size</strong></p>
                                            <p className={"text-[12px]"}><strong>Quantity</strong></p>
                                        </div>
                                        <SelectForColorAndSizeOptions type={"size"}/>
                                    </label>
                                </div>}
                            </div>
                        </div>

                        <label className={"flex flex-col gap-[3px]"}>
                            <p className={"text-[12px]"}><strong>Description</strong></p>
                            <textarea className={"outline-none border border-gray-300 rounded-md p-3"}
                                      onChange={(e) => {
                                          setDescription(e.target.value)
                                      }} value={description}/>
                        </label>
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
