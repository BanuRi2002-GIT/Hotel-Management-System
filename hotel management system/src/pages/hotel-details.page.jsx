import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddReviewMutation, useGetHotelByIdQuery } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { Building2, Coffee, MapPin, PlusCircle, Star, Tv, Wifi } from "lucide-react";
import { useParams } from "react-router";

const HotelDetailsPage = () => {
  const { _id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(_id);
  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
  const { user } = useUser();

  const handleAddReview = async () => {
    try {
      await addReview({ hotelId: _id, comment: "This is a test review", rating: 5 }).unwrap();
    } catch (error) {}
  };

  if (isLoading) return <main className="px-4"><Skeleton className="w-full h-[400px] rounded-lg" /></main>;

  if (isError) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Hotel</h2>
      <p className="text-muted-foreground">{error?.data?.message || "Something went wrong."}</p>
    </div>
  );

  return (
    <main className="px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full h-[400px]">
            <img src={hotel.image} alt={hotel.name} className="absolute object-cover rounded-lg w-full h-full" />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <div className="flex items-center mt-2">
            <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
            <p className="text-muted-foreground">{hotel.location}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-bold">{hotel?.rating ?? "No rating"}</span>
            <span className="text-muted-foreground">({hotel?.reviews?.length ?? 0} reviews)</span>
          </div>
          <p className="text-muted-foreground">{hotel.description}</p>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center"><Wifi className="h-5 w-5 mr-2" /><span>Free Wi-Fi</span></div>
                <div className="flex items-center"><Building2 className="h-5 w-5 mr-2" /><span>Restaurant</span></div>
                <div className="flex items-center"><Tv className="h-5 w-5 mr-2" /><span>Flat-screen TV</span></div>
                <div className="flex items-center"><Coffee className="h-5 w-5 mr-2" /><span>Coffee maker</span></div>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold"></p>
              <p className="text-sm text-muted-foreground">per night</p>
            </div>
            <Button disabled={isAddReviewLoading} onClick={handleAddReview}>
              <PlusCircle className="w-4 h-4 mr-2" /> Add Review
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HotelDetailsPage;
