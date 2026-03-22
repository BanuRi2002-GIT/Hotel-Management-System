// components/HotelDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useGetHotelByIdQuery } from "@/lib/api";
import { MapPin, Star, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: hotel, isLoading, isError } = useGetHotelByIdQuery(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-96 w-full rounded-xl mb-6" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (isError || !hotel) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Hotel not found</p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Go Back Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-96 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>

          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hotel.location}</span>
          </div>

          <div className="flex items-center space-x-1 mb-6">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-medium text-lg">
              {hotel?.rating ?? "No rating"}
            </span>
            <span className="text-muted-foreground">
              ({hotel.reviews?.length ?? "No"} Reviews)
            </span>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
          </div>

          <div className="border-t mt-6 pt-6 flex justify-between items-center">
            <div>
              <span className="text-3xl font-bold">${hotel.price}</span>
              <span className="text-gray-600"> / night</span>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}