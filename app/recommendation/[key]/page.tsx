'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"
import { SearchBar } from "@/components/SearchBar";

interface Perfume {
  key: number;
  brand: string;
  perfume: string;
  image_url: string;
  longevity: string;
  sillage: string;
  reviews: string;
  notes: string;
  main_accords: string;
  recommended_perfumes?: string;
}

interface CardProps {
  perfume: Perfume;
}

const Card: React.FC<CardProps> = ({ perfume }) => {
  return (
    <div className="bg-background rounded-2xl shadow-lg overflow-hidden p-4 transition-all duration-300 hover:shadow-2xl">
      <Link href={`/product/${perfume.key}`} className="block" prefetch={false}>
        <div className="pt-4">
          <Image
            src={perfume.image_url}
            alt={`${perfume.brand} ${perfume.perfume}`}
            width={500}
            height={400}
            className="w-full h-64 object-cover rounded-t-2xl transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4 rounded-b-2xl">
          <h3 className="text-lg font-medium mb-2">{perfume.brand}</h3>
          <p className="text-muted-foreground text-sm mb-2">{perfume.perfume}</p>
        </div>
      </Link>
    </div>
  );
};

export default function Recommendation() {
  const [searchedPerfume, setSearchedPerfume] = useState<Perfume | null>(null);
  const [recommendedPerfumes, setRecommendedPerfumes] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const key = Number(usePathname()?.split("/")[2]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/get_perfume_by_key?key=${key}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data: Perfume = await response.json();
        setSearchedPerfume(data);
        if (data.recommended_perfumes) {
          const recKeys = JSON.parse(data.recommended_perfumes) as number[];
          const recommendedData = await Promise.all(
            recKeys.slice(0, 6).map(async (recKey) => {
              const recResponse = await fetch(`http://localhost:5000/api/get_perfume_by_key?key=${recKey}`);
              if (!recResponse.ok) throw new Error('Network response was not ok');
              return recResponse.json();
            })
          );
          setRecommendedPerfumes(recommendedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="w-full flex justify-center">
            {/* <Input
              placeholder="Search for products..."
              className="w-3/4 bg-background shadow-none appearance-none pl-8 text-lg py-3 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-primary focus:outline-none"
            /> */}
            <SearchBar />
          </div>
        </div>
        {searchedPerfume && (
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="text-muted-foreground">Because you searched for:</span>
            </div>
            <div className="bg-background rounded-2xl shadow-lg overflow-hidden w-full h-20 flex items-center px-4 mb-6 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center p-4">
                <Image
                  src={searchedPerfume.image_url}
                  alt={`${searchedPerfume.brand} ${searchedPerfume.perfume}`}
                  width={80}
                  height={80}
                  className="w-16 h-16 object-cover mr-4 rounded-2xl"
                />
                <div>
                  <h3 className="text-lg font-medium">{searchedPerfume.brand} {searchedPerfume.perfume}</h3>
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading recommended perfumes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {recommendedPerfumes.map((perfume) => (
              <Card key={perfume.key} perfume={perfume} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}