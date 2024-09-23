import { Suspense , lazy } from 'react';
import { baseUrl } from '../../Services/services/services';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function TopMedia() {
        // Lazy load the MediaSlider component
        const MediaSlider = lazy(
            () => import("../MediaSlider/MediaSlider")
          );
  return (
    <>
         {/* Top Rated movies section */}
         <section className="p-5">
         <Suspense fallback={<LoadingScreen />}>
           <MediaSlider
             heading="Top Rated"
             baseUrl={baseUrl}
             param="top_rated"
           />
         </Suspense>
       </section>
    </>
  )
}
