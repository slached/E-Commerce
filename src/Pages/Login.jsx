import React, {useState} from 'react';
import {baseUrl} from "../static/baseUrl";
import {useCookies} from "react-cookie";

export default function Login(props) {
    const inputStyles = "bg-[#FFF6F4] rounded-[4px] py-[13px] pl-[10px] max-w-[1000px] w-[478px] focus:outline-[#F47458]"

    const [cookies, setCookie, removeCookie] = useCookies();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMessage, setErrorMessage] = useState("")

    const onChange = (e) => {
        switch (e.target.id) {
            case "email":
                setEmail(e.target.value)
                break
            case "password":
                setPassword(e.target.value)
                break
            default:
                break
        }
    }

    const login = () => {
        fetch(`${baseUrl}/login`, {
            method: "POST", headers: {
                "Content-Type": "application/json", Accept: "*/*",
            }, body: JSON.stringify({email, password})
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    //set auth token after login success
                    setCookie("auth", res.token)
                    setErrorMessage("")
                    window.location.href = "http://localhost:3000"
                } else {
                    setErrorMessage(res.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (<div className={"font flex h-screen"}>
            <div className={"flex justify-center items-center flex-grow-[6]"}>
                <form className={"flex flex-col pl-[61px] pr-[60px] pt-[73px] pb-[92px] rounded-[20px] box-shadow "}>
                    <h2 className={"font-semibold text-[#F47458] text-[36px] mb-[60px]"}>Orange Bag</h2>
                    <h1 className={"font-semibold text-[56px] mb-[30px]"}>Sign in</h1>
                    <div className={"flex flex-col gap-y-[20px] mb-[40px]"}>
                        <label>
                            <p className={"mb-[7px]"}>Email</p>
                            <input id={"email"} value={email} onChange={onChange} placeholder={"example@gmail.com"}
                                   type={"email"}
                                   className={inputStyles}/>
                        </label>
                        <label>
                            <div className={"flex justify-between"}>
                                <p className={"mb-[7px]"}>Password</p>
                                <a href={""} className={"font-light text-[14px]"}>Forgot Password?</a>
                            </div>
                            <input id={"password"} value={password} onChange={onChange}
                                   placeholder={"*****************"} type={"password"} className={inputStyles}/>
                        </label>
                        <p className={"text-red-500 text-sm"}>{errMessage}</p>
                    </div>
                    <div className={"flex flex-col items-center"}>
                        <button
                            onClick={() => login()}
                            className={"bg-[#F47458] rounded-3xl text-white flex justify-center items-center py-[11px] w-[150px] mb-[40px]"}
                            type={"button"}>
                            <p className={"ml-[22px] mr-[18px]"}>Sign In</p>
                            <svg className={"mr-[29px]"} width="18" height="8" viewBox="0 0 18 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.562456 5.40625H14.7468L11.3648 1.11719C11.2687 0.995313 11.3554 0.8125 11.5125 0.8125H13.0312C13.2609 0.8125 13.4789 0.917969 13.6195 1.09844L17.4632 5.97344C17.85 6.46563 17.5007 7.1875 16.875 7.1875H0.562456C0.459332 7.1875 0.374956 7.10313 0.374956 7V5.59375C0.374956 5.49062 0.459332 5.40625 0.562456 5.40625Z"
                                    fill="white"/>
                            </svg>
                        </button>
                        <p style={{
                            color: "rgba(0, 0, 0, 0.2)"
                        }}>I don’t have an account ? <a href={"http://localhost:3000/register"} className={"text-[#F47458]"}>Sign up</a></p>
                    </div>
                </form>
            </div>
            <div className={"flex-grow-[4] bg-[#FFEDE1] flex justify-center items-center"}>
                <svg width="729" height="741" viewBox="0 0 729 741" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="265" width="464" height="736" fill="#FFEDE1"/>
                    <rect x="295.27" y="532.041" width="55" height="58" transform="rotate(25.9924 295.27 532.041)"
                          fill="#0E60FF"/>
                    <rect x="279.902" y="425.281" width="93" height="98" rx="46.5"
                          transform="rotate(10.9924 279.902 425.281)" fill="#F47458"/>
                    <path
                        d="M30.6238 713.058C39.7655 730.029 59.1674 737.314 59.1674 737.314C59.1674 737.314 63.7478 717.084 54.6061 700.114C45.4644 683.143 26.0625 675.858 26.0625 675.858C26.0625 675.858 21.4822 696.088 30.6238 713.058Z"
                        fill="#201F30"/>
                    <path
                        d="M36.9071 707.475C53.4116 717.415 59.768 737.157 59.768 737.157C59.768 737.157 39.3654 740.785 22.8609 730.845C6.3564 720.906 0 701.163 0 701.163C0 701.163 20.4027 697.536 36.9071 707.475Z"
                        fill="#F47458"/>
                    <path d="M406.939 214.726H303.963V216.198H406.939V214.726Z" fill="#FFCEAE"/>
                    <path d="M378.989 215.83H377.518V229.451H378.989V215.83Z" fill="#FFCEAE"/>
                    <path d="M334.121 215.83H332.649V229.451H334.121V215.83Z" fill="#FFCEAE"/>
                    <path d="M459.164 285.408H356.188V286.88H459.164V285.408Z" fill="#FFCEAE"/>
                    <path d="M385.609 272.155H384.138V285.776H385.609V272.155Z" fill="#FFCEAE"/>
                    <path d="M430.477 272.155H429.006V285.776H430.477V272.155Z" fill="#FFCEAE"/>
                    <path d="M595.975 318.54H492.999V320.013H595.975V318.54Z" fill="#FFCEAE"/>
                    <path d="M522.42 305.288H520.949V318.909H522.42V305.288Z" fill="#FFCEAE"/>
                    <path d="M567.288 305.288H565.817V318.909H567.288V305.288Z" fill="#FFCEAE"/>
                    <path d="M585.678 660.172H482.701V661.644H585.678V660.172Z" fill="#FFCEAE"/>
                    <path d="M512.123 646.919H510.652V660.54H512.123V646.919Z" fill="#FFCEAE"/>
                    <path d="M556.991 646.919H555.52V660.54H556.991V646.919Z" fill="#FFCEAE"/>
                    <path d="M409.882 423.828H306.905V425.3H409.882V423.828Z" fill="#FFCEAE"/>
                    <path d="M336.328 410.575H334.856V424.196H336.328V410.575Z" fill="#FFCEAE"/>
                    <path d="M381.196 410.575H379.725V424.196H381.196V410.575Z" fill="#FFCEAE"/>
                    <path d="M442.246 601.27H339.27V602.742H442.246V601.27Z" fill="#FFCEAE"/>
                    <path d="M368.692 588.017H367.221V601.638H368.692V588.017Z" fill="#FFCEAE"/>
                    <path d="M413.56 588.017H412.089V601.638H413.56V588.017Z" fill="#FFCEAE"/>
                    <path d="M607.009 547.521H504.032V548.994H607.009V547.521Z" fill="#FFCEAE"/>
                    <path d="M533.454 534.269H531.982V547.89H533.454V534.269Z" fill="#FFCEAE"/>
                    <path d="M578.322 534.269H576.851V547.89H578.322V534.269Z" fill="#FFCEAE"/>
                    <path
                        d="M283.699 711.546L112.728 678.336L112.967 677.105L282.708 710.076L294.307 650.361L138.939 620.182L134.449 602.976L135.661 602.659L139.952 619.1L295.777 649.368L283.699 711.546Z"
                        fill="#201F30"/>
                    <path
                        d="M129.624 712.921C136.757 714.306 143.663 709.642 145.05 702.502C146.437 695.362 141.779 688.451 134.646 687.065C127.513 685.68 120.607 690.344 119.22 697.484C117.833 704.624 122.491 711.535 129.624 712.921Z"
                        fill="#3F3D56"/>
                    <path
                        d="M256.93 737.649C264.063 739.035 270.969 734.37 272.356 727.23C273.743 720.09 269.085 713.179 261.952 711.793C254.819 710.408 247.913 715.073 246.526 722.213C245.139 729.352 249.797 736.264 256.93 737.649Z"
                        fill="#3F3D56"/>
                    <path
                        d="M461.28 487.308C465.695 488.166 469.971 485.278 470.83 480.858C471.688 476.438 468.804 472.16 464.389 471.302C459.973 470.444 455.698 473.332 454.839 477.752C453.981 482.172 456.864 486.45 461.28 487.308Z"
                        fill="#3F3D56"/>
                    <path
                        d="M317.77 633.836L125.597 596.508L110.442 452.38L387.02 506.103L386.612 506.855L317.77 633.836ZM126.746 595.454L317.107 632.43L385.103 507.009L111.866 453.935L126.746 595.454Z"
                        fill="#201F30"/>
                    <path
                        d="M253.655 593.722L148.751 591.95L127.32 516.577L278.298 519.128L278.154 519.567L253.655 593.722Z"
                        fill="#00FFC2"/>
                    <path
                        d="M392.826 494.618L391.698 494.071L405.763 465.025L452.977 474.196L452.738 475.428L406.47 466.441L392.826 494.618Z"
                        fill="#201F30"/>
                    <path d="M365.187 544.665L115.868 496.237L115.629 497.468L364.948 545.896L365.187 544.665Z"
                          fill="#201F30"/>
                    <path d="M342.098 587.252L120.921 544.29L120.682 545.522L341.859 588.484L342.098 587.252Z"
                          fill="#201F30"/>
                    <path d="M249.223 479.976L247.993 479.737L221.805 614.557L223.035 614.796L249.223 479.976Z"
                          fill="#201F30"/>
                    <path d="M304.3 490.634L269.283 623.736L270.495 624.055L305.512 490.953L304.3 490.634Z"
                          fill="#201F30"/>
                    <path d="M192.957 469.006L191.713 468.847L174.304 605.372L175.547 605.53L192.957 469.006Z"
                          fill="#201F30"/>
                    <path
                        d="M437.952 233.845C437.952 233.845 448.705 264.479 442.088 269.192C435.471 273.904 464.42 312.393 464.42 312.393L499.159 302.967L480.135 270.763C480.135 270.763 477.654 238.558 477.654 233.845C477.654 229.132 437.952 233.845 437.952 233.845Z"
                        fill="#FFD6BA"/>
                    <path opacity="0.1"
                          d="M437.952 233.845C437.952 233.845 448.705 264.479 442.088 269.192C435.471 273.904 464.42 312.393 464.42 312.393L499.159 302.967L480.135 270.763C480.135 270.763 477.654 238.558 477.654 233.845C477.654 229.132 437.952 233.845 437.952 233.845Z"
                          fill="black"/>
                    <path
                        d="M419.904 452.209C419.904 452.209 416.765 491.482 419.904 511.905C423.043 532.327 427.751 588.882 427.751 588.882C427.751 588.882 427.751 695.707 445.014 697.278C462.278 698.849 474.833 700.42 476.402 694.136C477.972 687.852 468.555 684.71 473.263 681.568C477.972 678.426 479.541 667.43 473.263 654.862C466.986 642.294 473.263 515.047 473.263 515.047L503.082 595.166C503.082 595.166 506.221 661.146 509.36 670.571C512.498 679.997 506.221 697.278 517.207 698.849C528.192 700.42 540.748 690.994 547.025 687.852C553.303 684.71 537.609 684.71 540.748 683.139C543.887 681.568 553.303 676.855 550.164 675.284C547.025 673.713 543.886 598.307 543.886 598.307C543.886 598.307 535.255 437.284 524.269 431.001C513.283 424.717 506.221 435.54 506.221 435.54L419.904 452.209Z"
                        fill="#201F30"/>
                    <path
                        d="M448.153 690.994V703.561C448.153 703.561 434.028 737.724 448.153 737.724C462.277 737.724 473.263 741.264 473.263 736.551V694.136L448.153 690.994Z"
                        fill="#201F30"/>
                    <path
                        d="M536.683 689.752L538.744 702.149C538.744 702.149 558.282 733.532 544.349 735.849C530.416 738.166 520.159 743.46 519.386 738.811L512.428 696.97L536.683 689.752Z"
                        fill="#201F30"/>
                    <path
                        d="M446.8 255.135C461.838 259.292 477.402 250.46 481.563 235.407C485.724 220.355 476.907 204.782 461.87 200.625C446.832 196.468 431.268 205.3 427.107 220.353C422.946 235.405 431.763 250.978 446.8 255.135Z"
                        fill="#FFD6BA"/>
                    <path
                        d="M451.292 280.974C451.292 280.974 459.139 304.538 471.694 299.826L484.25 295.113L506.221 445.924C506.221 445.924 488.958 471.06 463.847 455.35C438.737 439.641 451.292 280.974 451.292 280.974Z"
                        fill="white"/>
                    <path
                        d="M473.264 276.261L480.326 261.337C480.326 261.337 521.915 280.974 528.193 287.258C534.47 293.542 534.47 302.967 534.47 302.967L523.485 342.241C523.485 342.241 526.623 428.644 526.623 431.786C526.623 434.928 537.609 452.208 529.762 445.924C521.915 439.64 520.346 433.357 514.068 442.782C507.791 452.208 493.666 463.205 493.666 463.205L473.264 276.261Z"
                        fill="#F47458"/>
                    <path
                        d="M528.193 389.37L523.484 433.357C523.484 433.357 495.235 458.492 501.513 460.063C507.79 461.634 510.929 455.35 510.929 455.35C510.929 455.35 521.915 466.347 528.193 460.063C534.47 453.779 550.164 394.083 550.164 394.083L528.193 389.37Z"
                        fill="#FFD6BA"/>
                    <path
                        d="M465.564 189.522C459.588 187.637 453.158 185.744 447.168 187.593C444.375 188.58 441.765 190.025 439.445 191.868C432.754 196.77 426.29 203.478 425.979 211.769L428.349 211.526C427.774 213.603 426.746 215.527 425.338 217.158C425.881 216.365 426.498 218.06 425.983 218.872L421.489 225.957C425.754 225.606 429.776 229.815 429.235 234.064C431.989 225.154 435.768 215.108 444.504 211.86C448.91 210.222 453.781 210.696 458.451 211.213C462.759 211.69 467.258 212.253 470.834 214.704C474.409 217.156 476.655 222.131 474.63 225.968C476.626 225.843 478.312 227.677 478.741 229.632C479.17 231.586 478.661 233.61 478.155 235.546C479.717 237.457 482.681 235.34 484.093 233.314C487.407 228.559 490.609 223.407 491.128 217.634C491.646 211.86 488.624 205.37 483.047 203.809C483.931 203.251 484.563 202.372 484.81 201.356L480.317 199.695C481.531 199.852 482.762 199.583 483.799 198.932C481.39 200.455 468.522 190.454 465.564 189.522Z"
                        fill="#201F30"/>
                    <path
                        d="M459.139 271.548C459.139 271.548 446.363 259.016 441.765 259.784C437.168 260.552 430.89 271.548 430.89 271.548C430.89 271.548 393.224 284.116 394.794 296.684C396.363 309.251 413.627 370.518 413.627 370.518C413.627 370.518 427.751 444.353 415.196 452.208C402.641 460.063 474.833 480.485 476.403 471.06C477.972 461.634 481.111 367.377 476.403 353.238C471.694 339.099 459.139 271.548 459.139 271.548Z"
                        fill="#F47458"/>
                    <path
                        d="M514.068 296.684H533.474C533.474 296.684 547.026 356.38 548.595 362.664C550.165 368.948 553.303 398.796 551.734 398.796C550.165 398.796 518.777 392.512 518.777 397.225L514.068 296.684Z"
                        fill="#F47458"/>
                    <path
                        d="M513.411 454.511H439.121C431.871 421.128 431.265 388.875 439.121 358.059H513.411C501.422 388.32 500.673 420.353 513.411 454.511Z"
                        fill="#FFCEAE"/>
                    <path
                        d="M408.918 408.509L430.89 417.934C430.89 417.934 473.263 424.218 473.263 406.938C473.263 389.657 430.89 399.083 430.89 399.083L416.764 394.562L408.918 408.509Z"
                        fill="#FFD6BA"/>
                    <path
                        d="M413.626 287.258L394.793 291.971L380.668 375.231C380.668 375.231 375.96 397.225 383.807 398.796C391.654 400.367 413.626 412.934 413.626 412.934C413.626 412.934 416.765 389.37 423.042 389.37L407.348 376.802L416.765 321.819L413.626 287.258Z"
                        fill="#F47458"/>
                    <path d="M147.292 448.125H44.3154V449.597H147.292V448.125Z" fill="#FFCEAE"/>
                    <path d="M73.7377 434.872H72.2666V448.493H73.7377V434.872Z" fill="#FFCEAE"/>
                    <path d="M118.606 434.872H117.135V448.493H118.606V434.872Z" fill="#FFCEAE"/>
                    <path d="M183.334 230.188H80.3574V231.66H183.334V230.188Z" fill="#FFCEAE"/>
                    <path d="M155.383 231.292H153.912V244.913H155.383V231.292Z" fill="#FFCEAE"/>
                    <path d="M110.515 231.292H109.044V244.913H110.515V231.292Z" fill="#FFCEAE"/>
                    <path d="M307.046 375.233H204.069V376.706H307.046V375.233Z" fill="#FFCEAE"/>
                    <path d="M279.095 376.338H277.624V389.959H279.095V376.338Z" fill="#FFCEAE"/>
                    <path d="M234.227 376.338H232.756V389.959H234.227V376.338Z" fill="#FFCEAE"/>
                    <path d="M111.986 374.497H9.00977V375.97H111.986V374.497Z" fill="#FFCEAE"/>
                    <path d="M84.0356 375.602H82.5645V389.223H84.0356V375.602Z" fill="#FFCEAE"/>
                    <path d="M39.1664 375.602H37.6953V389.223H39.1664V375.602Z" fill="#FFCEAE"/>
                    <path d="M235.558 300.87H132.581V302.342H235.558V300.87Z" fill="#FFCEAE"/>
                    <path d="M162.003 287.617H160.532V301.238H162.003V287.617Z" fill="#FFCEAE"/>
                    <path d="M206.871 287.617H205.4V301.238H206.871V287.617Z" fill="#FFCEAE"/>
                </svg>
            </div>
        </div>

    );
}
