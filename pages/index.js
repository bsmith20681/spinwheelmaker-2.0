import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import SpinWheelImage from "../public/images/wheel_02.png";

export default function Home() {
  return (
    <Layout>
      <div className="container grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="flex items-center">
          <div>
            <h1 className="text-center text-5xl font-black md:my-10 md:text-7xl">Free Spin the Wheel Generator</h1>
            <p className="my-6 text-center text-lg font-light md:my-10">Randomly pick names by creating a spinner wheel</p>
            <div className="flex md:my-6">
              <Link href="/create">
                <a className="mx-auto rounded-md bg-blue-600 py-3 px-6 text-center text-lg font-bold text-white transition hover:bg-blue-700">Create your Spin Wheels</a>
              </Link>
            </div>
            <div className="my-6 flex">
              <Link href="#">
                <a className="mx-auto rounded-md border-2 bg-white py-3 px-6 text-center text-lg font-bold text-gray-600 transition hover:bg-gray-300">See Other Spin Wheels</a>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Image src={SpinWheelImage} alt="spin the wheel" />
        </div>
      </div>
      <div className="container my-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="my-6 text-center text-5xl font-black">Randomly pick names for any occasion</h2>
          <p className="my-6 text-center text-2xl font-normal text-gray-800">You can easily create any type of wheel you want for any occasion</p>
        </div>
      </div>
    </Layout>
  );
}
