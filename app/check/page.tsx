'use client'
import { useEffect, useState } from "react";

// If using TypeScript, define an interface for your data
interface Perfume {
  key: number;
  brand: string;
  perfume: string;
  description: string;
}

export default function Check() {
  const [data, setData] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching data');
        const res = await fetch('http://localhost:5000/api/get_all_perfumes');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setData(data);
        console.log(data[0]);
      } catch (err) {
        setError('An error occurred while fetching data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Check</h1>
      {data.map((item) => (
        <div key={item.key}>
          <h1>{item.brand} - {item.perfume}</h1>
        </div>
      ))}
    </div>
  );
};