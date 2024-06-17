import { useNavigate } from "react-router-dom";
import { useGetReserves } from "../../services/ReserveService/UseGetReserves";
import { LoadingSpinner } from "../LoadingSpinner/component";
import { ReserveList } from "./container";
import { routePath } from "../../enums/routePath";
// import { useState } from "react";

// const Pagination: { page: number; lastPage: number; onPageChange: (page: number) => void } = ({ page, lastPage, onPageChange }) => {
//   const [limit, setLimit] = useState(10);

//   const generatePageNumbers = () => {
//     const pageNumbers: (number | string)[] = [];

//     if (lastPage <= 1) return pageNumbers;

//     pageNumbers.push(1);

//     if (page > 6) {
//       pageNumbers.push('...');
//     }

//     const startPage = Math.max(2, page - 5);
//     const endPage = Math.min(lastPage - 1, page + 5);

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }

//     if (page + 5 < lastPage - 1) {
//       pageNumbers.push('...');
//     }

//     pageNumbers.push(lastPage);

//     return pageNumbers;
//   };

//   const pageNumbers = generatePageNumbers();

//   return (
//     <div className="flex items-center justify-center mt-4">
//       <button
//         onClick={() => onPageChange(page - 1)}
//         disabled={page === 1}
//         className={`px-3 py-1 rounded-l-md border ${page === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
//       >
//               &lt;
//       </button>
//       {pageNumbers.map((number, index) =>
//         typeof number === 'number' ? (
//           <button
//             key={index}
//             onClick={() => onPageChange(number)}
//             className={`px-3 py-1 border ${number === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
//           >
//             {number}
//           </button>
//         ) : (
//           <span key={index} className="px-3 py-1 border bg-white text-gray-700">
//             {number}
//           </span>
//         )
//       )}
//       <button
//         onClick={() => onPageChange(page + 1)}
//         disabled={page === lastPage}
//         className={`px-3 py-1 rounded-r-md border ${page === lastPage ? 'bg-gray-300 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
//       >
//               &gt;
//       </button>
//       <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border p-2 rounded-md">
//         <option value={5}>5件</option>
//         <option value={10}>10件</option>
//         <option value={20}>20件</option>
//       </select>

//     </div>
//   );
// };

export const ReservesContents = (  ) => {
  const { reserves, isLoading, error } = useGetReserves();
  const navigate = useNavigate()

  if (isLoading) return <LoadingSpinner/>
  if (error) return <div>Error reserves</div>

  // const [page, setPage] = useState(1);
  return (
    <>
      <div className="flex my-4">
        <input
          type="text"
          placeholder="検索"
          className="border border-borderColor p-2 w-full"
        />
        <button className="bg-subMain text-fontBase border border-borderColor ml-2 font-bold w-16">
          検索
        </button>
      </div>
      <button onClick={() => navigate(routePath.ReserveCreate)} className="flex items-center border bg-subMain border-borderColor p-2 my-4 font-bold">
        <span className="mr-2">＋</span>
            新規登録
      </button>
      <ReserveList reserves={reserves}/>
      {/* <div className="mt-4">
        <Pagination page={page} lastPage={pagination.last_page} onPageChange={setPage} />
      </div> */}
    </>
  )
};
