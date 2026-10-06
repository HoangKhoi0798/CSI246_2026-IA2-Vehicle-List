import Link from "next/link";
import Image from "next/image";
import { getVehicles } from "@/app/lib/data";
import { Card, CardContent } from "@/app/ui/components/Card";
import Button from "@/app/ui//components/Button";

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Available Vehicles</h1>
      <p className="text-gray-600 mb-8">Car inventory</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <div className="relative h-48 w-full bg-gray-100">
              <Image
                src={vehicle.image}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover"
              />
            </div>
            <CardContent>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h2>
                <span className="text-lg font-bold text-blue-600">
                  ${vehicle.price.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {vehicle.description}
              </p>
              <Link href={`/vehicles/${vehicle.id}`} className="w-full">
                <Button variant="primary" fullWidth>
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
