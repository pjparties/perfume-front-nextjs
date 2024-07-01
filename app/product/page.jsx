import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"


// TODO: Use the page as slug and pass in props of perfume to the page.
export default function Product({ }) {
  // Perfume data
  const Perfume = {
    brand: "Acme Perfumes",
    name: "Enchanted Mist",
    description: "Discover the captivating fragrance of Enchanted Mist, a harmonious blend of floral and citrus notes that will transport you to a enchanted garden. Experience the magic of Enchanted Mist and let it become your signature scent.",
    sillage: 9,
    longevity: 8.5,
    price: 99.99,
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-background">
        {/* product image */}
        <div className="max-w-md w-full px-4 py-8 md:mr-8">
          <img
            src="/placeholder.svg"
            width={400}
            height={400}
            alt="Product Image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        {/* title and description */}
        <div className="max-w-md w-full px-4 py-8 text-center md:text-left">
          <h1 className="text-2xl font-bold text-black">{Perfume.brand}</h1>
          <h2 className="text-xl font-semibold text-black">{Perfume.name}</h2>
          <p className="mt-2 text-muted-foreground">
            {Perfume.description}
          </p>
          {/* rating and reviews */}
          <div className="mt-6 flex items-center">
            <div className="relative h-20 w-20 mr-4">
              <div className="absolute inset-0 rounded-full bg-primary p-2 text-center text-primary-foreground">
                <div className="text-2xl font-bold">{Perfume.sillage}</div>
                <div className="text-xs">Sillage</div>
              </div>
            </div>
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-full bg-secondary p-2 text-center text-secondary-foreground">
                <div className="text-2xl font-bold">{Perfume.longevity}</div>
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
      <Footer />
    </>
  )
}