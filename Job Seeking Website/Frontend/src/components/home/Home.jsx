import HeroSection from "./HeroSection"
import Cards from "./Cards";
import HowToUse from "./HowToUse";
import { useContext } from "react";
import { Context } from "../../store/Contexts";
import { Navigate } from "react-router-dom";
function Home() {
    const { isAuthorized, setAuthorized } = useContext(Context);
    console.log(isAuthorized);
    if (!isAuthorized) {
        return <Navigate to={"/login"} />;
    }
    return <>
        <HeroSection />
        <Cards />
        <HowToUse />
    </>
}

export default Home;