"use client";

import React from "react";
import { Mail, Github } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex items-center justify-center h-full px-4 py-8">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Get In Touch
        </h1>

        <div className="flex justify-center">
          <div className="w-full max-w-md space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      Email
                    </p>
                    <a
                      href="mailto:viktorpopp.dev@gmail.com"
                      className="text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      viktorpopp.dev@gmail.com
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-center">
                  <Github className="h-5 w-5 text-gray-800 dark:text-gray-200 mr-3" />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      GitHub
                    </p>
                    <a
                      href="https://github.com/viktorpopp"
                      className="text-gray-600 dark:text-gray-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/viktorpopp
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Best times to reach me:</strong> Evenings and weekends
                  (CEST). I typically respond within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
