import Media from "../Media";
import PageTitle from "../Components/PageTitle/PageTitle";

export default function PopularTvshows() {
  return (
    <>
    <PageTitle title={"Popular TV Shows"}/>
      <Media heading={"Popular TV Shows"} Url={"tv/popular"} category={"tv"}/>
    </>
  );
}
