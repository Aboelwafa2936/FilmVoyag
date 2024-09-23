import { lazy, Suspense } from "react";
import { baseUrl } from "../../Services/services/services";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function UpcomingMedia() {
    // Lazy load the MediaSlider component
    const MediaSlider = lazy(
      () => import("../MediaSlider/MediaSlider")
    );
  return (
    <>
      {/* Upcoming movies section */}
      <section className="p-5">
        <Suspense fallback={<LoadingScreen />}>
          <MediaSlider
            heading="Upcoming"
            baseUrl={baseUrl}
            param={"upcoming"}
          />
        </Suspense>
      </section>
    </>
  );
}
