import React from 'react';
import SearchBarFooter from "../Components/SearchBarFooter";
import QRCode from '../static/Images/qrcode.svg'
import GooglePlayIcon from '../static/Images/GooglePlay.svg'
import AppleStoreIcon from '../static/Images/AppStore.svg'
import FacebookIcon from '../static/Images/Icon-Facebook.svg'
import TwitterIcon from '../static/Images/Icon-Twitter.svg'
import InstagramIcon from '../static/Images/icon-instagram.svg'
import LinkedInIcon from '../static/Images/Icon-Linkedin.svg'


export default function Footer(props) {
    return (
        <footer className={"flex flex-col bg-black"}>
            <div className={"flex px-[135px] text-white pt-[80px] gap-[85px] pb-[60px] mt-[50px] justify-center"}>
                <div className={"flex flex-col"}>
                    <h3 className={"text-[24px] mb-[24px] font-bold"}>Exclusive</h3>
                    <h2 className={"text-[20px] mb-[16px]"}>Subscribe</h2>
                    <p className={"mb-[16px]"}>Get 10% off your first order</p>
                    <SearchBarFooter/>
                </div>
                <div className={"flex flex-col"}>
                    <h3 className={"text-[20px] mb-[16px] font-bold"}>Support</h3>
                    <p className={"mb-[16px]"}>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                    <p className={"mb-[16px]"}>omerbsahin@gmail.com</p>
                    <p>+88015-88888-9999</p>
                </div>
                <div className={"flex flex-col"}>
                    <h3 className={"text-[20px] mb-[16px] font-bold"}>Account</h3>
                    <p className={"mb-[16px]"}>Login / Register</p>
                    <p className={"mb-[16px]"}>Cart</p>
                    <p className={"mb-[16px]"}>Wishlist</p>
                    <p className={"mb-[16px]"}>Shop</p>
                </div>
                <div className={"flex flex-col"}>
                    <h3 className={"text-[20px] mb-[16px] font-bold"}>Quick Link</h3>
                    <p className={"mb-[16px]"}>Privacy Policy</p>
                    <p className={"mb-[16px]"}>Terms Of Use</p>
                    <p className={"mb-[16px]"}>FAQ</p>
                    <p className={"mb-[16px]"}>Contact</p>
                </div>
                <div className={"flex flex-col"}>
                    <h3 className={"text-[24px] mb-[24px]"}>Download App</h3>
                    <p className={"mb-[8px] text-gray-400"}>Save $3 with App New User Only</p>
                    <div className={"flex gap-[10px] mb-[27px]"}>
                        <img alt={"qr"} src={QRCode}/>
                        <div className={"flex flex-col gap-[7px]"}>
                            <img className={"min-h-[30px] min-w-[104px]"} alt={"google"} src={GooglePlayIcon}/>
                            <img alt={"apple"} src={AppleStoreIcon}/>
                        </div>
                    </div>
                    <div className={"flex gap-[24px]"}>
                        <img alt={"facebook"} src={FacebookIcon}/>
                        <img alt={"twitter"} src={TwitterIcon}/>
                        <img alt={"instagram"} src={InstagramIcon}/>
                        <img alt={"linkedin"} src={LinkedInIcon}/>
                    </div>
                </div>
            </div>
            <div className={"border-none h-[1px] bg-gray-800"}></div>
            <p className={"text-gray-500 text-center pt-[16px] pb-[24px]"}>&copy; Copyright Sl4ched 2024. All right reserved</p>
        </footer>

    );
}
