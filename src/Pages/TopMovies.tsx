import Media from '../Media';
import PageTitle from '../Components/PageTitle/PageTitle';

export default function TopMovies() {
  return (
    <>
    <PageTitle title={'Top Movies'}/>
    <Media heading={'Top Movies'} Url={'movie/top_rated'} category={'movie'}/>
    </>
  )
}
