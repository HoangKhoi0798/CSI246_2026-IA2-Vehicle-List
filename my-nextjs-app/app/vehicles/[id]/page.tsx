import { getVehicle } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CommentForm from "./Comment";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/vehicles"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        &larr; Return to Main Page
      </Link>

      <div className="bg-white border rounded-lg overflow-hidden shadow-sm p-6 mb-8">
        <div className="relative h-80 w-full mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={vehicle.image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-gray-600 mt-1">{vehicle.description}</p>
          </div>
          <span className="text-2xl font-bold text-blue-600 mt-4 md:mt-0">
            ${vehicle.price.toLocaleString()}
          </span>
        </div>

        {/* Specifications */}
        <h2 className="text-xl font-semibold mb-4">Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
          <div>
            <span className="text-xs text-gray-500 block">Engine</span>
            <span className="font-medium">{vehicle.specs.engine}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Transmission</span>
            <span className="font-medium">{vehicle.specs.transmission}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Mileage</span>
            <span className="font-medium">
              {vehicle.specs.mileage.toLocaleString()} miles
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Exterior Color</span>
            <span className="font-medium">{vehicle.specs.exteriorColor}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Interior Color</span>
            <span className="font-medium">{vehicle.specs.interiorColor}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Fuel Type</span>
            <span className="font-medium">{vehicle.specs.fuelType}</span>
          </div>
        </div>

        {/* Features List */}
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
          {vehicle.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-gray-700 bg-blue-50/50 p-2 rounded"
            >
              <span className="text-blue-600 mr-2">&#10003;</span> {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Comments Section */}
      <section className="bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({vehicle.comments.length})
        </h2>

        <div className="space-y-4 mb-8">
          {vehicle.comments.length === 0 ? (
            <p className="text-gray-500 italic">
              Be the first to give us your opinion!
            </p>
          ) : (
            vehicle.comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-800">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{comment.text}</p>
              </div>
            ))
          )}
        </div>

        <CommentForm vehicleId={vehicle.id} />
      </section>
    </main>
  );
}
