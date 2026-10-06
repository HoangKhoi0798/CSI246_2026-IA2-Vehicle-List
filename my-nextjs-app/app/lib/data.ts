"use server";

export type Vehicle = {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number;
  description: string;
  specs: {
    engine: string;
    transmission: string;
    mileage: number;
    exteriorColor: string;
    interiorColor: string;
    fuelType: string;
  };
  features: string[];
  image: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  author: string;
  text: string;
  date: Date;
};

const vehicles: Vehicle[] = [
  {
    id: "1",
    year: 2023,
    make: "Toyota",
    model: "Camry",
    price: 27999,
    description: "Sleek and reliable sedan with excellent fuel economy",
    specs: {
      engine: "2.5L 4-Cylinder",
      transmission: "8-Speed Automatic",
      mileage: 15000,
      exteriorColor: "Midnight Black",
      interiorColor: "Beige",
      fuelType: "Gasoline",
    },
    features: [
      "Adaptive Cruise Control",
      "Lane Departure Warning",
      "Apple CarPlay Integration",
      "Blind Spot Monitor",
      "LED Headlights",
    ],
    image: "/images/logo.jpg",
    comments: [
      {
        id: "c1",
        author: "John Smith",
        text: "Great family car, very comfortable ride!",
        date: new Date("2024-01-05"),
      },
    ],
  },
  {
    id: "2",
    year: 2024,
    make: "Honda",
    model: "CR-V",
    price: 32999,
    description: "Versatile SUV perfect for family adventures",
    specs: {
      engine: "1.5L Turbo 4-Cylinder",
      transmission: "CVT",
      mileage: 5000,
      exteriorColor: "Platinum White",
      interiorColor: "Gray",
      fuelType: "Gasoline",
    },
    features: [
      "Honda Sensing Suite",
      "Wireless Phone Charging",
      "Panoramic Sunroof",
      "Power Tailgate",
      "AWD System",
    ],
    image: "/images/logo.jpg",
    comments: [
      {
        id: "c2",
        author: "Sarah Johnson",
        text: "Love the safety features and spacious interior!",
        date: new Date("2024-01-08"),
      },
    ],
  },
];

export async function getVehicles(): Promise<Vehicle[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return vehicles;
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const allVehicles = await getVehicles();
  return allVehicles.find((vehicle) => vehicle.id === id) || null;
}

export async function addComment(
  vehicleId: string,
  comment: Omit<Comment, "id" | "date">,
): Promise<Comment> {
  // In a real app, this would be an API call
  const newComment: Comment = {
    id: Math.random().toString(36).substr(2, 9),
    ...comment,
    date: new Date(),
  };

  // Find the vehicle and add the comment
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  vehicle.comments.push(newComment);
  return newComment;
}
