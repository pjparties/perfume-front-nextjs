import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                About My Side Project
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                This is a simple about page for my side project. I'm building this in my free time to learn new
                technologies and explore a personal interest.
              </p>
              <div className="space-y-4 text-muted-foreground">
                <h2 className="text-2xl font-semibold">The Method and Techniques</h2>
                <p>
                  In building this side project, I've employed various techniques to ensure a robust and scalable application:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold">Modular Design:</span> Using React and Shadcn component library for better maintainability.</li>
                  <li><span className="font-semibold">Tailwind CSS:</span> For a consistent and visually appealing design system.</li>
                  <li><span className="font-semibold">Responsive Layout:</span> Ensuring great user experience across all devices.</li>
                  <li><span className="font-semibold">State Management:</span> (Your state management approach)</li>
                  <li><span className="font-semibold">Accessibility:</span> (Your accessibility considerations)</li>
                </ul>
              </div>
            </div>
            {/* <Image
              src="/placeholder.svg"
              width={550}
              height={550}
              alt="About"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            /> */}
          </div>
        </div>
      </main>
    </div>
  )
}