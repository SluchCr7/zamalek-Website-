import HeroNews from "../Components/Hero";
import MatchesSlider from "@/Components/MatchesLine";
import News from "@/Components/News";
import Table from "@/Components/Table";
import TeamsSlider from "@/Components/Teams";
import ZamalekAchievements from "@/Components/Competitions";
import FirstTeam from "@/Components/FirstTeam";
import PartnershipAd from "@/Components/PartnershipAd";
import ZamalekKitShowcase from "@/Components/Store";
import PresidentsHall from "@/Components/PresidentsHall";
import SocialWall from "@/Components/SocialWall";
import ArrowTopButton from "@/Components/ArrowTopButton";
import AdsComponent from "@/Components/AdsComponent";

export default function Home() {
  return (
    <div className="overflow-hidden min-h-screen w-full">
      <HeroNews />
      <MatchesSlider />
      <div className="w-full relative">
        <News />
        <Table />
        <ZamalekAchievements />

        <AdsComponent />

        <TeamsSlider />
        <FirstTeam />
        <ZamalekKitShowcase />
        <PartnershipAd />
        <SocialWall />
      </div>
      <ArrowTopButton />
    </div>
  );
}
