import TrendingMedia from "../Components/TrendingMedia/TrendingMedia";
import TopMedia from "../Components/TopMedia/TopMedia";
import UpcomingMedia from "../Components/UpcomingMedia/UpcomingMedia";
import HeroSection from "../Components/HeroSection/HeroSection";
import PageTitle from "../Components/PageTitle/PageTitle";


export default function Home() {
  return (
    <>
    <PageTitle title={"FilmVoyag"}/>
    <main className="bg-[#111827]">
      {/* Hero Section */}
      <HeroSection />
      {/* TrendingMedia Section */}
      <TrendingMedia />
      {/* TopMedia Section */}
      <TopMedia />
      {/* UpcomingMedia Section */}
      <UpcomingMedia />
    </main>
    </>
  );
}
