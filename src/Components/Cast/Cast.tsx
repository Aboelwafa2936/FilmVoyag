import React, { useMemo } from "react";
import HeadingSection from "../HeadingSection";
import { baseUrl } from "../../Services/services/services";
import Slider from "react-slick";
import { Link } from "react-router-dom";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
  known_for_department: string;
}

interface CastProps {
  cast: CastMember[];
}

const Cast: React.FC<CastProps> = ({ cast }) => {
  // Filtering the cast array by department (Acting)
  const department = useMemo(
    () => cast?.filter((member) => member?.known_for_department === "Acting") || [],
    [cast]
  );

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-5">
      <div className="container mx-auto">
        <HeadingSection heading={"Top Cast"} />
        <Slider {...settings}>
          {department.map((item) => {
            const imgSrc = item.profile_path
              ? `${baseUrl}${item.profile_path}`
              : "https://example.com/fallback-image.jpg"; // Valid fallback URL

            return (
              <div key={item.id} className="px-2 text-center">
                <Link to={`/peopleDetails/${item.id}`}>
                  <img src={imgSrc} className="rounded-full" alt={item.name} />
                </Link>
                <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
                <h4 className="text-gray-500">{item.character}</h4>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Cast;

