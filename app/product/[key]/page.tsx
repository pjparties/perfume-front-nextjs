'use client'

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

const ScaleCircle = ({ value, label, color }: { value: string; label: string; color: string }) => {
  const percentage = parseInt(value); // Assuming value is 1-100
  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-md">{label}</span>
      </div>
    </div>
  );
};

export default function Product(): JSX.Element {
  const key = Number(usePathname()?.split("/")[2]);
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/get_perfume_by_key?key=${key}`);
        if (!response.ok) throw new Error('Network response was not ok');
        setPerfume(await response.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [key]);

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (!perfume) return <div className="text-center p-8">No perfume data found.</div>;

  return (
    <div className="grow py-12 px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2 flex items-center lg:justify-center lg:px-12 transition-all">
            <Image
              src={perfume.image_url}
              width={400}
              height={400}
              alt={`${perfume.brand} ${perfume.perfume}`}
              className="h-48 w-48 md:h-64 md:w-64 lg:h-96 lg:w-96 rounded-lg shadow-xl"
              priority
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-7xl text-gray-700 mt-6">{perfume.perfume}</h2>
            <h1 className="text-3xl font-bold text-gray-900 ">{perfume.brand}</h1>
            <div>
              <p className="text-gray-600 text-lg md:text-2xl"><span className="font-semibold">Notes:</span> {perfume.notes}</p>
              <p className="text-gray-600 text-lg md:text-2xl mt-4 md:mt-8"><span className="font-semibold">Main Accords:</span> {perfume.main_accords}</p>
              <div className="flex space-x-8 py-8 lg:py-12 lg:justify-center">
                <ScaleCircle value={Math.round(parseFloat(perfume.sillage)).toString()} label="Sillage" color="#3b82f6" />
                <ScaleCircle value={Math.round(parseFloat(perfume.longevity)).toString()} label="Longevity" color="#10b981" />
              </div>
              <p className="text-gray-600 text-lg md:text-2xl"><span className="font-semibold">No. of Reviews:</span> {perfume.reviews}</p>
            </div>

            <Link
              href={`https://www.jomashop.com/search?q=${encodeURIComponent(`${perfume.brand} ${perfume.perfume}`)}`}
              className="mt-6 inline-block bg-black text-white px-16 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}