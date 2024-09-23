import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HeadingSection from "../Components/HeadingSection";
import Pagination from "../Components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { baseUrl, getPeople } from "../Services/services/services";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
import PageTitle from "../Components/PageTitle/PageTitle";

export default function People() {
  const [currentPage, setCurrentPage] = useState(1);


  const {
    data: persons,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["persons", currentPage],
    queryFn: () => getPeople(currentPage),
  });


  if (isLoading)
    return (
      <LoadingScreen />
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500">
        Error fetching data. Please try again later.
      </div>
    );

  interface Person {
    id: number;
    name: string;
    profile_path: string;
  }

  return (
    <>
    <PageTitle title={"Celebrities"}/>
    <section className="py-10 bg-[#111827] text-white">
      <div className="container mx-auto px-4">
        <HeadingSection heading="Most Popular Celebs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {persons.map((person: Person) => (
            <div
              key={person.id}
              className="flex flex-col items-center bg-[#1f2937] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <Link to={`/peopleDetails/${person.id}`}>
                <img
                  src={baseUrl + person.profile_path}
                  className="w-[8rem] h-[8rem] rounded-full object-cover border-4 border-[#6028ff] mb-4 transition-transform duration-300 hover:scale-105"
                  alt={person.name}
                />
              </Link>
              <h3 className="text-lg font-semibold">{person.name}</h3>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </section>
    </>
  );
}
