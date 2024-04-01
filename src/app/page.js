import HomFirstSec from "@/components/HomFirstSec";
import HomeSecondSec from "@/components/HomeSecondSec/page";
import HomeThirdSec from "@/components/HomeThirdSec/page";
import Navbar from "@/components/navbar";
import "./assets/style.scss"
import Footer from "@/components/footer/page";

export default function Home() {
  return (
    <>
      <div className="max-w-[2550px] flex flex-col m-auto">
        <Navbar />
        <div className="appMainContainer">
          <HomFirstSec />
          <HomeSecondSec />
          <HomeThirdSec />
          <Footer />
        </div>
      </div>
    </>
  );
}
