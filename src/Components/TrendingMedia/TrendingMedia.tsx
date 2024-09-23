import { lazy, Suspense } from "react";
import { baseUrl } from "../../Services/services/services";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function TrendingMedia() {
  // Lazy load the MediaSlider component
  const MediaSlider = lazy(
    () => import("../MediaSlider/MediaSlider")
  );

  return (
    <>
      {/* Weekly trending movies section */}
      <section className="p-5">
        <Suspense fallback={<LoadingScreen />}>
          <MediaSlider
            heading="Weekly Trending"
            baseUrl={baseUrl}
            param="movie/week"
          />
        </Suspense>
      </section>
    </>
  );
}
