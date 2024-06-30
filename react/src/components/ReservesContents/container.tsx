import { Reserve } from "../../types/Reserve";
import { format } from "date-fns";
import { Pagination } from "../../types/Pagination";

type ReserveListProps = {
  reserves: Reserve[];
}

export const ReserveList = ({ reserves }: ReserveListProps) => {
  return (
    reserves.length === 0 ? (
      <div className="bg-hover border-l-4 border-borderColor text-textBase p-4" role="alert">
        <p className="font-bold">予約がありません</p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-borderColor">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-borderColor">予約番号</th>
              <th className="px-4 py-2 border border-borderColor">名前</th>
              <th className="px-4 py-2 border border-borderColor">人数</th>
              <th className="px-4 py-2 border border-borderColor">予約時間</th>
            </tr>
          </thead>
          <tbody>
            {reserves.map((reserve: Reserve, index: number) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border border-borderColor">{reserve.id}</td>
                <td className="px-4 py-2 border border-borderColor">{reserve.name}</td>
                <td className="px-4 py-2 border border-borderColor">{reserve.guest_number}</td>
                <td className="px-4 py-2 border border-borderColor">{`${format(new Date(reserve.start_date_time), 'yyyy/MM/dd HH:mm')} ～ ${format(new Date(reserve.end_date_time), 'yyyy/MM/dd HH:mm')}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

type PaginationContainerProps = {
  pagination: Pagination;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
};
export const PaginationContainer = ({
  pagination,
  setPage,
  limit,
  setLimit,
}: PaginationContainerProps) => {
  const pageNumbers = [];
  pageNumbers.push(1)

  if(pagination.page > 1) {
    if (pagination.page > 6) {
      pageNumbers.push("...");
    }
    const startPage = Math.max(2, pagination.page - 5);
    const endPage = Math.min(pagination.last_page - 1, pagination.page + 5);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (pagination.page + 5 < pagination.last_page - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(pagination.last_page);  
  }

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex-grow"></div>
      <div className="flex items-center justify-center flex-grow">
        <button
          onClick={() => setPage(pagination.page - 1)}
          disabled={pagination.page === 1}
          className={`px-3 py-1 rounded-l-md border ${pagination.page === 1 ? "bg-backColor text-fontBase" : "bg-white text-fontBase hover:bg-subMain"}`}
        >
      &lt;
        </button>
        {pageNumbers.map((number, index) =>
          typeof number === "number" ? (
            <button
              key={index}
              onClick={() => setPage(number)}
              className={`px-3 py-1 border ${number === pagination.page ? "bg-subMain text-white" : "bg-white text-fontBase hover:bg-subMain"}`}
            >
              {number}
            </button>
          ) : (
            <span key={index} className="px-3 py-1 border bg-white text-fontBase">
              {number}
            </span>
          ),
        )}
        <button
          onClick={() => setPage(pagination.page + 1)}
          disabled={pagination.page === pagination.last_page}
          className={`px-3 py-1 rounded-r-md border
         ${pagination.page === pagination.last_page ? "bg-white text-fontBase" : "bg-white text-fontBase hover:bg-subMain"}`}
        >
      &gt;
        </button>
      </div>
      <div className="flex-grow"></div>
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="border p-2 rounded-md  ml-2"
      >
        <option value={10}>10件</option>
        <option value={50}>50件</option>
        <option value={100}>100件</option>
      </select>
    </div>

  );
};
