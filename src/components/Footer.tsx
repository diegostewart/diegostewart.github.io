const Footer = () => (
  <footer className="border-t border-border mt-24">
    <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
      <span className="text-xs text-muted-foreground">
        © {new Date().getFullYear()}
      </span>
      <span className="text-xs text-muted-foreground">
        Built with precision
      </span>
    </div>
  </footer>
);

export default Footer;
