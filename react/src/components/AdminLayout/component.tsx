import { ReactNode } from "react";
import { AdminHeaderContainer, AdminMenubarContainer } from "./container";

type AdminLayoutProps = {
  pageName: string;
  mainContents: ReactNode;
}

export const AdminLayout = ({ pageName ,mainContents }: AdminLayoutProps) => {
  return (
    <div>
      <AdminHeaderContainer />
      <div className="flex" style={{ height: "calc(100vh - 4rem)" }}>
        <AdminMenubarContainer />
        <div className="bg-backColor w-full p-6">
          <h2 className="text-3xl font-bold pb-4">{pageName}</h2>
          {mainContents}
        </div>
      </div>
    </div>
  );
};  