import React, {useState} from 'react';
import dropdownImg from "../static/Images/lang_dropdown_arrow.svg";

export default function HeaderBlackBar(props) {

    const languages = ["English", "Spanish", "French"];
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [isLanguageOptionListOpen, setIsLanguageOptionListOpen] = useState(false);

    const languageSelector = (value) => {
        setIsLanguageOptionListOpen(!isLanguageOptionListOpen)
        switch (value) {
            case "English":
                setSelectedLanguage("English")
                break
            case "Spanish":
                setSelectedLanguage("Spanish")
                break
            case "French":
                setSelectedLanguage("French")
                break
            default:
                break
        }
    }
    return (

        <div className={"flex bg-black text-white py-[15px] justify-around z-10 static"}>
            <div></div>
            <div className={"flex gap-[8px]"}>
                <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
                <a href={""}><strong>ShopNow</strong></a>
            </div>
            <div className={"cursor-pointer"} onClick={() => {
                languageSelector()
            }}>
                <div className={"flex gap-[11px] "}>
                    <p>{selectedLanguage}</p>
                    <img alt={"dropdown"} src={dropdownImg}/>
                </div>
                <div className={"z-30 absolute top-[52px] bg-black"}>
                    {isLanguageOptionListOpen && languages.map((value, index) => {
                        if (value !== selectedLanguage) {
                            return (<div className={"text-center"} key={index}>
                                <p onClick={() => {
                                    languageSelector(value)
                                }} className={"px-[5px] py-[3px]"}>{value}</p>
                                <hr/>
                            </div>)
                        }

                    })}
                </div>
            </div>
        </div>
    );
}

