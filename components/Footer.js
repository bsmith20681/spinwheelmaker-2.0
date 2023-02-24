import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-neutral-800">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-base text-gray-400">&copy; {year} spinwheelmaker.com. All rights reserved.</p>
        <nav className="flex flex-wrap items-end justify-center" aria-label="Footer">
          <div className="px-5">
            <Link href="/about">
              <a className="text-base text-gray-400 hover:text-gray-600">About</a>
            </Link>
          </div>
          <div className="px-5">
            <Link href="/privacy-policy">
              <a className="text-base text-gray-400 hover:text-gray-600">Privacy Policy</a>
            </Link>
          </div>
          <div className="px-5">
            <Link href="/terms-and-conditions">
              <a className="text-base text-gray-400 hover:text-gray-600">Terms and Conditions</a>
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
