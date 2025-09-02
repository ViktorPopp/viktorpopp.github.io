"use client";

import { useState } from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navigation from "./components/Navigation";
import { Page } from "./models";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="h-[calc(100vh-4rem)]">{renderPage()}</main>
    </div>
  );
}
