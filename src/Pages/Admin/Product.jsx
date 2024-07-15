import React, {useCallback, useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    DropdownItem,
    DropdownMenu,
    Button,
    Dropdown,
    DropdownTrigger, Input, useDisclosure
} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {useAsyncList} from "@react-stately/data";
import {baseUrl} from "../../static/baseUrl";
import {PlusIcon, SearchIcon, ChevronDownIcon, VerticalDotsIcon} from "../../static/NextIcons";

import {capitalize} from "lodash";
import EditProduct from "../../Components/Admin/Modals/EditProduct";
import {useLoaderData} from "react-router-dom";

export default function Product() {

    const columns = [
        {uid: "image", name: "IMAGE"},
        {uid: "name", name: "NAME"},
        {uid: "price", name: "PRICE"},
        {uid: "quantity", name: "QUANTITY"},
        {uid: "votes", name: "VOTES"},
        {uid: "stars", name: "STARS"},
        {uid: "is discounted", name: "IS DISCOUNTED"},
        {uid: "discount percentage", name: "DISCOUNT PERCENTAGE"},
        {uid: "updated at", name: "UPDATED AT"},
        {uid: "created at", name: "CREATED AT"},
    ];

    const INITIAL_VISIBLE_COLUMNS = ["image", "name", "price", "quantity", "votes", "stars", "actions"];

    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [filterValue, setFilterValue] = useState("")
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [editedProduct, setEditedProduct] = useState({});
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedImagesKeyValue, setSelectedImagesKeyValue] = useState(new Set());
    const [imagesKeyValue, setImagesKeyValue] = useState(new Set());


    let list = useAsyncList({
        async load({signal, cursor}) {

            if (cursor) {
                setIsLoading(false);
            }

            // If no cursor is available, then we're loading the first page.
            // Otherwise, the cursor is the next URL to load, as returned from the previous page.
            const res = await fetch(cursor || `${baseUrl}/product/getAllWithImage/?search=`, {signal});
            let json = await res.json();

            setHasMore(json.next !== null);

            return {
                items: json.results, cursor: json.next,
            };
        },
    });

    const [loaderRef, scrollerRef] = useInfiniteScroll({hasMore, onLoadMore: list.loadMore});

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
        } else {
            setFilterValue("");
        }
    }, []);
    const onClear = useCallback(() => {
        setFilterValue("")
    }, [])

    const images = useLoaderData()

    const topContent = useMemo(() => {

        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%] text-black"
                        placeholder="Search by name..."
                        startContent={<SearchIcon/>}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small text-white"/>}
                                        variant="bordered">
                                    <p className={"text-white"}>Columns</p>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button variant={"faded"} endContent={<PlusIcon/>}>
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {list.items.length} products</span>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        list.items.length,
        onSearchChange,
    ]);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        const headerColumnArray = columns.filter((column) => Array.from(visibleColumns).includes(column.uid))

        headerColumnArray.push({name: "ACTIONS", uid: "actions"})

        return headerColumnArray;
    }, [visibleColumns]);

    const renderCell = useCallback((listItem, columnKey) => {

        switch (columnKey) {
            case "image":
                return <img className={"h-[24px] bg-white"} loading={"lazy"} alt={`img ${listItem.product.name}`}
                            src={listItem.images[0].url}/>
            case "name":
                return <p>{listItem.product.name}</p>
            case "price":
                return <p>${listItem.product.price}</p>
            case "quantity":
                return <p>{listItem.product.quantity}</p>
            case "votes":
                return <p>{listItem.product.votes}</p>
            case "stars":
                return <p>{listItem.product.stars}</p>
            case "is discounted":
                return <p>{listItem.product.isDiscounted.toString()}</p>
            case "discount percentage":
                return (listItem.product.isDiscounted ? <p>{listItem.product.discountPercentage}%</p> : <p>-</p>);
            case "updated at":
                return <p>{listItem.product.updatedAt}</p>
            case "created at":
                return <p>{listItem.product.createdAt}</p>
            case "actions":
                return (<div className="relative flex justify-end items-center gap-2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-300"/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem onClick={() => {
                                setEditedProduct(listItem)

                                setImagesKeyValue(new Set())
                                for (const eachObject of images.data) setImagesKeyValue(prevState => prevState.add({
                                    key: eachObject._id,
                                    label: eachObject.name
                                }))
                                setSelectedImagesKeyValue(new Set())
                                for (const eachObject of listItem.images) setSelectedImagesKeyValue(prevState => prevState.add(eachObject._id))

                                onOpen()
                            }}>Edit</DropdownItem>
                            <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>);
            default:
                return "";
        }
    }, []);

    return (
        <div className={"flex justify-center"}>
            <Table
                topContent={topContent}
                isHeaderSticky
                aria-label="products"
                baseRef={scrollerRef}
                bottomContent={hasMore ? (
                        <div className="flex w-full justify-center">
                            <Spinner ref={loaderRef} color="white"/>
                        </div>)
                    : null}
                classNames={{
                    base: "max-w-[800px] min-w-[1200px] bg-none",
                    table: "bg-gray-900 rounded-lg",
                    wrapper: "bg-gray-900",
                }}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => {
                        return <TableColumn key={column.uid}
                                            style={column.uid === "actions" ? {textAlign: "end"} : {textAlign: "start"}}>{column.name}</TableColumn>
                    }}
                </TableHeader>
                <TableBody
                    isLoading={isLoading}
                    items={list.items}
                    loadingContent={<Spinner color="white"/>}
                >
                    {(item) => {
                        return (
                            <TableRow key={item.product.name}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>)
                    }}
                </TableBody>
            </Table>

            <EditProduct selectedItems={selectedImagesKeyValue} images={imagesKeyValue} pAndI={editedProduct}
                         onOpen={onOpen} onClose={onClose}
                         isOpen={isOpen}/>
        </div>
    );
}

export const imageLoader = async () => {
    const images = await fetch(`${baseUrl}/image/getAll`)
    const imagesJson = await images.json()

    if (imagesJson.status !== 200) {
        return {err: imagesJson.err}
    } else return imagesJson

}