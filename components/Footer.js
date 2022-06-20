const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-400 hover:text-gray-600">
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-400 hover:text-gray-600">
              Privacy Policy
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-400 hover:text-gray-600">
              Terms and Conditions
            </a>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">&copy; {year} spinwheelmaker.com. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
