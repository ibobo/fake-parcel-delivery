import { Package } from "lucide-react";
import ParcelList from "./ParcelList";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Ermes consegne</h1>
          <Package className="w-6 h-6 text-blue-600" />
        </header>

        <ParcelList />
      </div>
    </main>
  );
}
