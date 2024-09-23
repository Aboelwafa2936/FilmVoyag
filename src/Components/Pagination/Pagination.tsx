
interface paginationProps {
  currentPage: number;
  setCurrentPage: Function;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
}: paginationProps) {
  // Function to handle pagination click
  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
      setCurrentPage(newPage);
    }
  };

  // Generate pagination numbers: current, previous, next
  const pagination = [];
  if (currentPage > 1) {
    pagination.push(currentPage - 1);
  }
  pagination.push(currentPage);
  pagination.push(currentPage + 1);

  return (
    <>
      <div className="max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto p-6 rounded-lg">
        <div className="flex justify-center">
          <nav
            className="flex flex-wrap justify-center space-x-1 sm:space-x-2"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="relative inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-[#6028ff] border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Pagination Numbers */}
            {pagination.map((pageNum) => (
              <span
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`relative inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium ${
                  pageNum === currentPage
                    ? "bg-[#6028ff] text-white"
                    : "text-gray-700 bg-white hover:bg-fuchsia-200"
                } border border-fuchsia-100 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10`}
              >
                {pageNum}
              </span>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="relative inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-[#6028ff] border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}