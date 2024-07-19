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
    DropdownTrigger,
    Input,
    useDisclosure
} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {useAsyncList} from "@react-stately/data";
import {baseUrl} from "../../static/baseUrl";
import {PlusIcon, SearchIcon, ChevronDownIcon, VerticalDotsIcon} from "../../static/NextIcons";

import {capitalize} from "lodash";
import EditAndCreateCategoryModal from "../../Components/Admin/Modals/EditAndCreateCategoryModal";
import {useDispatch} from "react-redux";

export default function Category() {

    const columns = [
        {uid: "image", name: "IMAGE"},
        {uid: "name", name: "NAME"},
        {uid: "updated at", name: "UPDATED AT"},
        {uid: "created at", name: "CREATED AT"},];

    const INITIAL_VISIBLE_COLUMNS = ["image", "name"];

    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [filterValue, setFilterValue] = useState("")
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [editedCategory, setEditedCategory] = useState({});
    const [modalType, setModalType] = useState("")
    const [selectedImage, setSelectedImage] = useState(new Set());

    let list = useAsyncList({
        async load({signal, cursor}) {
            if (cursor) setIsLoading(false);
            // If no cursor is available, then we're loading the first page.
            // Otherwise, the cursor is the next URL to load, as returned from the previous page.
            const res = await fetch(cursor || `${baseUrl}/category/getAll/?search=`, {signal});
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

    const topContent = useMemo(() => {

        return (<div className="flex flex-col gap-4">
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
                            {columns.map((column) => (<DropdownItem key={column.uid} className="capitalize">
                                {capitalize(column.name)}
                            </DropdownItem>))}
                        </DropdownMenu>
                    </Dropdown>
                    <Button onClick={() => {
                        setModalType("create")
                        onOpen()
                    }} variant={"faded"} endContent={<PlusIcon/>}>
                        Add New
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total {list.items.length} categories</span>
            </div>
        </div>);
    }, [filterValue, visibleColumns, list.items.length, onSearchChange,]);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        const headerColumnArray = columns.filter((column) => Array.from(visibleColumns).includes(column.uid))

        headerColumnArray.push({name: "ACTIONS", uid: "actions"})

        return headerColumnArray;
    }, [visibleColumns]);

    const renderCell = useCallback((listItem, columnKey) => {

        switch (columnKey) {
            case "image":
                return <img className={"h-[24px] bg-white"} loading={"lazy"} alt={`img ${listItem.category.name}`}
                            src={listItem.image.url}/>
            case "name":
                return <p>{listItem.category.name}</p>
            case "updated at":
                return <p>{listItem.category.updatedAt}</p>
            case "created at":
                return <p>{listItem.category.createdAt}</p>
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
                                setEditedCategory(listItem)
                                setModalType("edit")

                                setSelectedImage(new Set())
                                setSelectedImage(prevState => prevState.add(listItem.image._id))

                                onOpen()
                            }}>Edit</DropdownItem>
                            <DropdownItem onClick={() => {
                                fetch(`${baseUrl}/category/delete/${listItem.category._id}`, {
                                    method: "DELETE", credentials: "include", headers: {Cookie: document.cookies},
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        window.location.reload()
                                    })
                                    .catch(err => err)
                            }}>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>);
            default:
                return "";
        }

    }, []);

    return (<div className={"flex justify-center"}>
        <Table
            topContent={topContent}
            isHeaderSticky
            aria-label="products"
            baseRef={scrollerRef}
            bottomContent={hasMore ? (<div className="flex w-full justify-center">
                <Spinner ref={loaderRef} color="white"/>
            </div>) : null}
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
                        <TableRow key={item.category.name}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )

                }}
            </TableBody>
        </Table>

        <EditAndCreateCategoryModal selectedItem={selectedImage} pAndI={editedCategory} onOpen={onOpen}
                                    onClose={onClose}
                                    isOpen={isOpen}
                                    type={modalType}/>
    </div>);
}
