import Link from "next/link";

const Header = () => {
  return (
    <div>
      <div className="container my-3">
        <div className="flex justify-between py-3">
          <div>
            <Link href="/">Logo</Link>
          </div>
          <div>
            <Link href="#">
              <a className="mx-5 rounded-md border-2 bg-white py-3 px-6 text-center text-lg font-bold text-gray-600 transition hover:bg-gray-300">Sign In</a>
            </Link>
            <Link href="#">
              <a className="rounded-md bg-blue-600 py-3 px-6 text-center text-lg font-bold text-white transition hover:bg-blue-700">Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
    </div>
  );
};

export default Header;
