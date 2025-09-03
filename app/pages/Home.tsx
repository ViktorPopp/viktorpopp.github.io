import React from "react";
import Icon from "../components/Icon";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full px-4">
      <div className="max-w-4xl mx-auto text-center ">
        <div className="mb-8">
          <Icon />

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Viktor Popp
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
            Hobbyist Operating System Developer
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl">
            Hi, I'm Viktor Popp, a systems programmer and creator of HexiumOS,
            an experimental OS written in Rust. I'm passionate about low-level
            development, performance and security, and I also work on simple
            backend projects.
          </p>
        </div>
      </div>
    </div>
  );
}
