import React from 'react';
import BreadCrumb from "../../Components/Global/BreadCrumb";
import ImageAbout from "../../static/Images/about-page-img-1.png";

import AboutComponent from "../../Components/About/AboutComponent";

import Services from "../../static/Images/Services.svg";
import Services2 from "../../static/Images/Services-2.svg";
import Services3 from "../../static/Images/Services-3.svg";
import Services4 from "../../static/Images/Services-4.svg";
import Services5 from "../../static/Images/Services-5.svg";
import Services6 from "../../static/Images/Services-6.svg";
import Services7 from "../../static/Images/Services-7.svg";

export default function About(props) {
    return (
        <div className={"flex justify-center items-center"}>
            <div className={"flex flex-col pl-[135px] pt-[80px] max-w-[1300px]"}>
                <div className={"mb-[42px]"}><BreadCrumb/></div>
                <div className={"flex justify-between mb-[140px]"}>
                    <div className={"items-center mr-[50px] min-w-[310px]"}>
                        <h1 className={"text-[54px] font-semibold mb-[40px]"}>Our Story</h1>
                        <p className={"mb-[24px] leading-[25px]"}>
                            Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an
                            active
                            presense in Bangladesh. Supported by wide range of tailored marketing, data and service
                            solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers
                            across
                            the region.
                        </p>
                        <p className={"leading-[25px]"}>
                            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive
                            offers a
                            diverse assotment in categories ranging from consumer.
                        </p>
                    </div>
                    <img loading={"lazy"} className={"min-h-[609px] min-w-[705px] max-h-[609px] max-w-[705px]"} alt={"image"}
                         src={ImageAbout}/>
                </div>
                <div className={"grid grid-cols-4 gap-[40px] mb-[140px] mr-[135px]"}>
                    <AboutComponent type={1} image={Services} value={"10.5k"} text={"Sellers active our site"}/>
                    <AboutComponent type={2} image={Services2} value={"33k"} text={"Monthly ProductComp Sale"}/>
                    <AboutComponent type={1} image={Services3} value={"45.5k"} text={"Customer active in our site"}/>
                    <AboutComponent type={1} image={Services4} value={"25k"} text={"Annual gross sale in our site"}/>
                </div>
                <div className={"grid grid-cols-3 gap-[40px] mb-[140px] mr-[135px]"}>
                    <AboutComponent type={3} image={Services5} value={"FREE AND FAST DELIVERY"}
                                    text={"Free delivery for all orders over $140"}/>
                    <AboutComponent type={3} image={Services6} value={"24/7 CUSTOMER SERVICE"}
                                    text={"Friendly 24/7 customer support"}/>
                    <AboutComponent type={3} image={Services7} value={"MONEY BACK GUARANTEE"}
                                    text={"We return money within 30 days"}/>

                </div>
            </div>
        </div>
    );
}


