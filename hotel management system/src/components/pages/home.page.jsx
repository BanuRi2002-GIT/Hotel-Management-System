import Hero from "../components/Hero";
import HotelListings from "../components/HotelListing";

function HomePage() {
  return (
    <main>
      <div className="relative min-h-[85vh]">
        <Hero />
      </div>
      <HotelListings />
    </main>
  );
}

export default HomePage;