import { ReactNode } from "react";

export default function Modal({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg z-10 bg-white">
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}
