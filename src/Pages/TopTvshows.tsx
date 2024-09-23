import Media from '../Media'
import PageTitle from '../Components/PageTitle/PageTitle'

export default function TopTvshows() {
  return (
    <>
    <PageTitle title={'Top Tv Shows'}/>
    <Media heading={'Top Tv Shows'} Url={'tv/top_rated'} category={'tv'}/>
    </>
  )
}
