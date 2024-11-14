"use client";

import { Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { parcels as initialParcels } from "@/data/parcels";
import { generateRandomAddress } from "@/data/addresses";
import AddParcelForm from "@/components/AddParcelForm";

export default function Home() {
  const [parcels, setParcels] = useState(initialParcels);

  const handleAddParcel = (userName: string) => {
    const newParcel = {
      userName,
      address: generateRandomAddress(),
    };
    setParcels([...parcels, newParcel]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Consegne</h1>
          <Package className="w-6 h-6 text-blue-600" />
        </header>
        
        <div className="space-y-3">
          {parcels.map((parcel) => (
            <Link 
              href={`/signature/${parcel.id ?? encodeURIComponent(parcel.userName)}`} 
              key={parcel.id ?? parcel.userName}
              className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">{parcel.userName}</h2>
                  <p className="text-sm text-gray-600">{parcel.address}</p>
                </div>
                <div className="text-blue-600">
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
          
          <AddParcelForm onAdd={handleAddParcel} />
        </div>
      </div>
    </main>
  );
}