import { Helmet } from 'react-helmet';

interface pageTitleProps{
  title: string;
}

export default function PageTitle( { title } : pageTitleProps ) {
  return (
    <Helmet>
    <title>
    { title }
    </title>
  </Helmet>
  )
}
