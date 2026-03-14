import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/blog", label: "Blog" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-tight text-foreground hover:text-accent transition-colors duration-150">
          Data Engineer
        </Link>
        <nav className="flex items-center gap-6">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm transition-colors duration-150 ${
                location.pathname === path
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
