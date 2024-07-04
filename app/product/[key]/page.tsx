'use client'

import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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

export default function Product(): JSX.Element {
  const key_s = usePathname()?.split("/")[2];
  const key = Number(key_s);
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/get_perfume_by_key?key=${key}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Perfume = await response.json();
        setPerfume(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!perfume) {
    return <div>No perfume data found.</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-background">
        {/* product image */}
        <div className="max-w-md w-full px-4 py-8 md:mr-8">
          <Image
            src={perfume.image_url}
            width={400}
            height={400}
            alt={`${perfume.brand} ${perfume.perfume}`}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>
        {/* title and description */}
        <div className="max-w-md w-full px-4 py-8 text-center md:text-left">
          <h1 className="text-2xl font-bold text-black">{perfume.brand}</h1>
          <h2 className="text-xl font-semibold text-black">{perfume.perfume}</h2>
          <p className="mt-2 text-muted-foreground">
            {perfume.notes}
          </p>
          {/* rating and reviews */}
          <div className="mt-6 flex items-center">
            <div className="relative h-20 w-20 mr-4">
              <div className="absolute inset-0 rounded-full bg-primary p-2 text-center text-primary-foreground">
                <div className="text-2xl font-bold">{perfume.sillage}</div>
                <div className="text-xs">Sillage</div>
              </div>
            </div>
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-full bg-secondary p-2 text-center text-secondary-foreground">
                <div className="text-2xl font-bold">{perfume.longevity}</div>
                <div className="text-xs">Longevity</div>
              </div>
            </div>
          </div>
          {/* buy now button */}
          <Button size="lg" className="mt-6">
            Buy Now
          </Button>
        </div>
      </div>
    </>
  )
}