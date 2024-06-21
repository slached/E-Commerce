import React, {useState, useEffect} from 'react';
import BackToTopICON from '../static/Images/scroll-to-top-icon.svg'

export default function BackToTop(props) {

    const [pageScroll, setPageScroll] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            setPageScroll(window.scrollY)
        })
    }, [pageScroll])


    return (
        <div className={"flex justify-end sticky bottom-0 z-50 mb-[32px] mr-[89px]"}>
            {pageScroll > 500 && <img
                className={"cursor-pointer"}
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    })
                }
                } alt={"scroll to top"} src={BackToTopICON}/>}
        </div>
    );
}
