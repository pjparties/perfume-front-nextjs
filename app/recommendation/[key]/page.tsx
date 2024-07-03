'use client'
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

interface CardProps {
  brand: string;
  perfume: string;
  image_url: string;
}

const Card: React.FC<CardProps> = ({ brand, perfume, image_url }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
      <Image
        src={image_url}
        alt={`${brand} ${perfume}`}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{brand}</h3>
        <p className="text-gray-700 text-base">{perfume}</p>
      </div>
    </div>
  );
};

export default function Recommendation() {
  const [searchedPerfume, setSearchedPerfume] = useState<Perfume | null>(null);
  const [numberOfRecs, setNumberOfRecs] = useState<number>(6);
  const [recKeys, setRecKeys] = useState<number[] | null>(null);
  const [recommendedPerfumes, setRecommendedPerfumes] = useState<Perfume[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const key_s = usePathname()?.split("/")[2];
  const key = Number(key_s);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/get_perfume_by_key?key=${key}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Perfume = await response.json();
        setSearchedPerfume(data);
        if (data.recommended_perfumes) {
          const recKeys = JSON.parse(data.recommended_perfumes) as number[];
          setRecKeys(recKeys);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [key]);

  useEffect(() => {
    if (recKeys) {
      const fetchRecommendedPerfumes = async () => {
        const obj: Perfume[] = [];
        const keys = recKeys.slice(0, numberOfRecs);
        for (const key of keys) {
          try {
            const response = await fetch(`http://localhost:5000/api/get_perfume_by_key?key=${key}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data: Perfume = await response.json();
            obj.push(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        setRecommendedPerfumes(obj);
        setIsLoading(false);
      };

      fetchRecommendedPerfumes();
    }
  }, [recKeys, numberOfRecs]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Recommend: {key}</h1>
      {searchedPerfume && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Searched Perfume:</h2>
          <Card
            brand={searchedPerfume.brand}
            perfume={searchedPerfume.perfume}
            image_url={searchedPerfume.image_url}
          />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Recommended Perfumes:</h2>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading recommended perfumes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendedPerfumes && recommendedPerfumes.map((perfume, index) => (
            <Card
              key={index}
              brand={perfume.brand}
              perfume={perfume.perfume}
              image_url={perfume.image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
}