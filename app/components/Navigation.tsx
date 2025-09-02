// deno-lint-ignore-file jsx-button-has-type
"use client";

import React from "react";
import { Page } from "../models";

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export default function Navigation({
  currentPage,
  onPageChange,
}: NavigationProps) {
  const navItems: { key: Page; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Viktor Popp
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onPageChange(item.key)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.key
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
