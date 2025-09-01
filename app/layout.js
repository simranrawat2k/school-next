import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "School Project",
  description: "Mini project using Next.js and MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}
