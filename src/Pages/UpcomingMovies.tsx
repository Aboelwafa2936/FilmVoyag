import Media from '../Media'
import PageTitle from '../Components/PageTitle/PageTitle'

export default function UpcomingMovies() {
    return<>
    <PageTitle title={'Upcoming Movies'} />
    <Media Url={'movie/upcoming'}  heading={'Upcoming Movies'} category={'movie'}/>
    </>
}
