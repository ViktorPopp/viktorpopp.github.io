import { Terminal } from "lucide-react";

export default function Icon() {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <Terminal className="h-16 w-16 text-white" />
        </div>
      </div>
    </div>
  );
}
