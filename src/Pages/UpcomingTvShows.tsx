import Media from "../Media";
import PageTitle from "../Components/PageTitle/PageTitle";

export default function UpcomingTvShows() {
  return (
    <>
      <PageTitle title={"Upcoming Tv Shows"} />
      <Media
        heading={"TV shows airing today"}
        Url={"tv/airing_today"}
        category={"tv"}
      />
    </>
  );
}
