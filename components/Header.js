import Link from "next/link";

const Header = () => {
  return (
    <div className="container">
      <div className="flex justify-between py-3">
        <div>
          <Link href="/">Logo</Link>
        </div>
        <div>
          <Link href="#">
            <a className="mx-3">Sign In</a>
          </Link>
          <Link href="#">
            <a className="mx-3 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
