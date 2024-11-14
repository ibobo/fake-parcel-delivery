"use client";

import { useState } from "react";
import { generateRandomAddress } from "../data/addresses";
import { Package } from "lucide-react";

interface AddParcelFormProps {
  onAdd: (userName: string) => void;
}

export default function AddParcelForm({ onAdd }: AddParcelFormProps) {
  const [userName, setUserName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      onAdd(userName.trim());
      setUserName("");
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between text-blue-600"
      >
        <span className="text-lg font-semibold">Nuova consegna</span>
        <Package className="w-5 h-5" />
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm">
      <div className="space-y-3">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Inserisci il nome del destinatario"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Aggiungi
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Annulla
          </button>
        </div>
      </div>
    </form>
  );
}