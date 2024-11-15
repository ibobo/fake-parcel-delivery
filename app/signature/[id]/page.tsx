import { ArrowLeft } from "lucide-react";
import { parcels } from "@/data/parcels";
import Link from "next/link";
import SignatureCanvas from "./SignatureCanvas";

export const runtime = "edge";

export default async function SignaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const stringId = (await params).id;
  const parcelId = parseInt(stringId, 10);
  let userName = isNaN(parcelId)
    ? undefined
    : parcels.find((p) => p.id === parcelId)?.userName;
  if (!userName) {
    userName = decodeURIComponent(stringId);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-semibold text-gray-900">
            Questa consegna è per {userName}
          </h1>
        </div>
      </header>

      <div className="flex-1 p-4 flex flex-col">
        <SignatureCanvas />
      </div>
    </div>
  );
}
