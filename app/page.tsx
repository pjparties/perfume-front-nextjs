import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 bg-background py-12 px-6">
                <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
                    <h1 className="text-4xl font-bold text-center">Find Your Signature Scent</h1>
                    <p className="text-muted-foreground text-lg text-center">Search and select perfumes to get recommendations</p>
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Input
                                type="search"
                                placeholder="Search for perfumes..."
                                className="flex-1 rounded-full bg-accent-10 px-4 py-3 text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <Button
                                variant="ghost"
                                className="rounded-full bg-muted text-muted-foreground px-4 py-2 hover:bg-muted-90 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary flex items-center gap-2"
                            >
                                Floral
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                className="rounded-full bg-muted text-muted-foreground px-4 py-2 hover:bg-muted-90 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary flex items-center gap-2"
                            >
                                Citrus
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                className="rounded-full bg-muted text-muted-foreground px-4 py-2 hover:bg-muted-90 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary flex items-center gap-2"
                            >
                                Woody
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                className="rounded-full bg-muted text-muted-foreground px-4 py-2 hover:bg-muted-90 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary flex items-center gap-2"
                            >
                                Spicy
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                className="rounded-full bg-muted text-muted-foreground px-4 py-2 hover:bg-muted-90 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary flex items-center gap-2"
                            >
                                Fruity
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                            <Button className="rounded-full bg-secondary text-secondary-foreground px-4 py-2 hover:bg-secondary-90 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary flex items-center gap-2">
                                Find Random
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </main>
    )
}

function ArrowRightIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}