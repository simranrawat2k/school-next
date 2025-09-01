import "./globals.css";

export const metadata = {
  title: "School Project",
  description: "Mini project using Next.js and MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
