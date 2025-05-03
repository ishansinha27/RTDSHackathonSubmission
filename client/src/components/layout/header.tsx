import { Link } from "wouter";
import { LogoWithText } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Menu, User, LogOut, HelpCircle } from "lucide-react";
import { ChatHelpDialog } from "@/components/ai-assistant/chat-help-dialog";

export default function Header() {
  const { user, isLoading, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <LogoWithText />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-10">
            <Link href="/" className="text-gray-500 hover:text-gray-900 font-medium">Home</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 font-medium">How It Works</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 font-medium">Browse Resources</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 font-medium">Testimonials</Link>
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <ChatHelpDialog />
            
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth" className="whitespace-nowrap text-primary hover:text-primary-700 font-medium">
                  Sign in
                </Link>
                <Link href="/auth?tab=register" className="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-700">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#">How It Works</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#">Browse Resources</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#">Testimonials</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="w-full">
                    <ChatHelpDialog />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isLoading ? (
                  <DropdownMenuItem disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </DropdownMenuItem>
                ) : user ? (
                  <>
                    <DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth">Sign in</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth?tab=register">Sign up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
