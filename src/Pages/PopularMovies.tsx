import Media from '../Media';
import PageTitle from '../Components/PageTitle/PageTitle';

export default function PopularMovies() {
  return (
    <>
    <PageTitle title={'Popular Movies'} />
    <Media heading={'Popular Movies'} Url={'movie/popular'} category={'movie'}/>
    </>
  )
}
