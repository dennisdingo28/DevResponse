import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";
import ToasterProvider from "@/providers/ToastProvider";
import ActiveBugs from "@/components/Main/ActiveBugs";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "DevResponse",
  description: "Real time coding issues response",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <QueryProvider>
          <body className="min-h-screen bg-darkBlue">
            <ToasterProvider />
            <div className="h-screen bg-darkBlue">
              <Container>
                <div className="flex-1 bg-darkBlue">{children}</div>
              </Container>
            </div>
          </body>
        </QueryProvider>
      </AuthProvider>
    </html>
  );
}
