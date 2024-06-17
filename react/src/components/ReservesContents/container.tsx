import { Reserve } from "../../types/Reserve";
import { format } from 'date-fns';

type ReserveListProps = {
  reserves: Reserve[];
}

export const ReserveList = ({reserves}: ReserveListProps) => {
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