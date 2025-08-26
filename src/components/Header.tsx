import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/feed" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Dostiशिप
            </Link>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Gallery
            </Link>
            <Link to="/journal" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Journal
            </Link>
            <Link to="/friend-finder" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Friends
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:flex font-medium">
                Login
              </Button>
            </Link>
            <Link to="/profile" className="hidden sm:flex">
              <Button variant="ghost" className="font-medium">
                Profile
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;