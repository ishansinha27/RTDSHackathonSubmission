import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="text-primary text-xl font-bold">GPU<span className="text-secondary">Finder</span></span>
            </Link>
          </div>
          
          {!isMobile ? (
            <>
              <nav className="hidden md:flex space-x-10">
                <Link href="/" className="text-base font-medium text-gray-700 hover:text-primary">
                  Home
                </Link>
                <Link href="#service-finder" className="text-base font-medium text-gray-700 hover:text-primary">
                  Find Resources
                </Link>
                <Link href="#features" className="text-base font-medium text-gray-700 hover:text-primary">
                  Features
                </Link>
                <Link href="#" className="text-base font-medium text-gray-700 hover:text-primary">
                  Contact
                </Link>
              </nav>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <Button asChild>
                  <Link href="#service-finder">
                    Get Started
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/" onClick={() => setIsOpen(false)} className="text-base font-medium text-gray-700 hover:text-primary py-2">
                    Home
                  </Link>
                  <Link href="#service-finder" onClick={() => setIsOpen(false)} className="text-base font-medium text-gray-700 hover:text-primary py-2">
                    Find Resources
                  </Link>
                  <Link href="#features" onClick={() => setIsOpen(false)} className="text-base font-medium text-gray-700 hover:text-primary py-2">
                    Features
                  </Link>
                  <Link href="#" onClick={() => setIsOpen(false)} className="text-base font-medium text-gray-700 hover:text-primary py-2">
                    Contact
                  </Link>
                  <Button asChild className="mt-4">
                    <Link href="#service-finder" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
