import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const SearchedCard = ({ brand, perfume_name }) => {
  return (
    <div className="bg-muted rounded-2xl shadow-md overflow-hidden w-fit h-20 flex items-center px-4 mb-6 transition-all duration-300">
      <div className="flex items-center p-4">
        <img
          src="/placeholder.svg"
          alt="Product Image"
          width={80}
          height={80}
          className="w-16 h-16 object-cover mr-4 rounded-2xl"
        />
        <div>
          <h3 className="text-lg font-medium mb-2">{brand}</h3>
          <p className="text-muted-foreground text-sm mb-2">{perfume_name}</p>
        </div>
      </div>
    </div>
  )
}

const Card = ({ brand, perfume, similarity }) => (
  <div className="card bg-background rounded-2xl shadow-lg overflow-hidden p-4 transition-all duration-300 hover:shadow-2xl">
    <Link href="#" className="block" prefetch={false}>
      <div className="pt-4">
        <img
          src="/placeholder.svg"
          alt="Product Image"
          width={500}
          height={400}
          className="w-full h-64 object-cover rounded-t-2xl"
        />
      </div>
      <div className="p-4 rounded-b-2xl">
        <h3 className="text-lg font-medium mb-2">{brand}</h3>
        <p className="text-muted-foreground text-sm mb-2">{perfume}</p>
        <p className="text-muted-foreground text-sm mb-2">{similarity}% similarity</p>
      </div>
    </Link>
  </div>
)

export default function Search() {
  const perfume_details_list = [
    {
      brand: "Dior",
      perfume: "Miss Dior",
      similarity: 85
    },
    {
      brand: "Gucci",
      perfume: "Gucci Bloom",
      similarity: 92
    },
    {
      brand: "Yves Saint Laurent",
      perfume: "Black Opium",
      similarity: 88
    },
    {
      brand: "Prada",
      perfume: "Prada Candy",
      similarity: 93
    },
    {
      brand: "Versace",
      perfume: "Versace Eros",
      similarity: 91
    },
    {
      brand: "Chanel",
      perfume: "Coco Mademoiselle",
      similarity: 90
    }
  ]

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="w-full flex justify-center">
            <Input
              placeholder="Search for products..."
              className="w-3/4 bg-background shadow-none appearance-none pl-8 text-lg py-3 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-muted-foreground">Similar perfumes to:</span>
        </div>
        {/* searched card */}
        <SearchedCard brand={"Gucci"} perfume_name={"Guilty Pour Homme"} />
        {/* search results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
          {/* individual cards */}
          {perfume_details_list.map((perfume, index) => (
            <Card
              key={index}
              brand={perfume.brand}
              perfume={perfume.perfume}
              similarity={perfume.similarity}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}