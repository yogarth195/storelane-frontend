import { HeroItems } from "../components/HeroItems";
import { LaptopSection } from "../components/ImpactComponents/MainDiv";
import { LoadingIcon } from "../components/LoadingIcon";
import { ScrollableSlider } from "../components/ScrollableSlider";


export function TestingPage() {
    return <div className="">
        {/* <LoadingIcon/> */}
        {/* <TextScroller text={"hello"}/> */}
        {/* <HeroItems/> */}
        <LaptopSection/>
        
        <img
            src="/svgs/image.png"
            alt="Hero background"
            className="w-[329px] h-[251px] mx-20 my-20 "
        />

    </div>
}