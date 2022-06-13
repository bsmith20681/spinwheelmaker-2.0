import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import SpinWheelImage from "../public/images/wheel_02.png";
import PersonIcon from "../public/images/person-icon.png";
import RaffleIcon from "../public/images/raffle-wheel.png";
import MysteryIcon from "../public/images/mystery-wheel.png";
import RandomNumberIcon from "../public/images/random-number-wheel.png";
import GiveAwayIcon from "../public/images/giveaway-picker.png";

export default function Home() {
  return (
    <Layout>
      <div className="container my-12 grid grid-cols-1 gap-2 md:grid-cols-2">
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
      <div className="container my-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="my-6 text-center text-5xl font-black">Randomly pick names for any occasion</h2>
          <p className="my-6 text-center text-2xl font-normal text-gray-800">You can easily create any type of wheel you want for any occasion</p>
        </div>
        <div class="grid gap-8 md:grid-cols-3">
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={PersonIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center text-2xl font-bold">Random Name Picker</h3>
            <div className="h-1 border-b-2 border-gray-300"></div>
            <p className="my-3 text-center text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={RaffleIcon} alt="mystery icon" />
            </div>
            <h3 className="my-3 text-center text-2xl font-bold">Raffle Wheel</h3>
            <div className="h-1 border-b-2 border-gray-300"></div>
            <p className="my-3 text-center text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={MysteryIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center text-2xl font-bold">Mystery Wheel</h3>
            <div className="h-1 border-b-2 border-gray-300"></div>
            <p className="my-3 text-center text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={RandomNumberIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center text-2xl font-bold">Random Number Wheel</h3>
            <div className="h-1 border-b-2 border-gray-300"></div>
            <p className="my-3 text-center text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={GiveAwayIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center text-2xl font-bold">Giveaway Picker</h3>
            <div className="h-1 border-b-2 border-gray-300"></div>
            <p className="my-3 text-center text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={GiveAwayIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center text-2xl font-bold">Giveaway Picker</h3>
            <div className="h-1 border-b-2 border-gray-300"></div>
            <p className="my-3 text-center text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
