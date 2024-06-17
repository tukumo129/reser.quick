import { useNavigate } from "react-router-dom";
import { routePath } from "../../enums/routePath";
import { FaHome, FaCalendarAlt, FaCog } from "react-icons/fa";

const menuItems = [
  { label: "TOP", path: routePath.Top, icon: <FaHome className="w-7 h-7" /> },
  { label: "予約", path: routePath.Reserves, icon: <FaCalendarAlt className="w-7 h-7" /> },
];
const settingsItem = { label: "設定", path: routePath.Top, icon: <FaCog className="w-7 h-7" /> };

export const AdminHeaderContainer = () =>{
  const navigate = useNavigate();
  return (
    <header className="bg-white h-16 w-full flex justify-between items-center">
      <button onClick={() => navigate(routePath.Top)}
        className="text-3xl w-56 h-full font-bold">予約管理アプリ</button>
    </header>
  );
};

export const AdminMenubarContainer = () => {
  const navigate = useNavigate();
  return (
    <aside className="bg-base w-56 flex flex-col">
      <nav className="flex flex-col w-56 m-0 p-0 flex-grow">
        {menuItems.map((item, index) => (
          <div key={index} className="border-b h-16 border-borderColor">
            <button
              onClick={() => navigate(item.path)}
              className="flex items-center space-x-2 text-textBase w-full h-full p-4 rounded transition duration-200 hover:bg-hover"
            >
              <span className="w-12">{item.icon}</span>
              <span className="text-lg font-bold">{item.label}</span>
            </button>
          </div>
        ))}
      </nav>
      <div className="border-t h-16 w-56 border-borderColor ">
        <button
          onClick={() => navigate(settingsItem.path)}
          className="flex items-center space-x-2 text-textBase w-full h-full p-4 rounded transition duration-200 hover:bg-hover"
        >
          <span className="w-12">{settingsItem.icon}</span>
          <span className="text-lg font-bold">{settingsItem.label}</span>
        </button>
      </div>
    </aside>
  );
};