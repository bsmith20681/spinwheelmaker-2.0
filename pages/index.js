import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import saveForLater from "../public/images/save-for-later.png";
import shareWithEveryone from "../public/images/share-with-everyone.png";
import customizeWheel from "../public/images/customize-wheel.png";
import SpinWheelImage from "../public/images/spinwheel-home-2.png";
import RaffleIcon from "../public/images/raffle.png";
import MysteryIcon from "../public/images/mystery.png";
import RandomNumberIcon from "../public/images/number.png";
import GiveAwayIcon from "../public/images/giveaway.png";
import RandomNamePicker from "../public/images/name.png";
import { Disclosure } from "@headlessui/react";

export default function Home() {
  return (
    <Layout>
      <div className="container my-12 grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="text-center text-2xl font-bold">What to Eat for Lunch?</p>
          <Image className="max-w-lg" src={SpinWheelImage} alt="spin the wheel" />
        </div>
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
      </div>
      <div className="container">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Free Spin Wheel Generator</h1>
          <p className="text-sm text-gray-500">Randomly pick names by creating a spinner wheel</p>
        </div>
      </div>
      <div className="container my-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mt-6 mb-3 text-center text-2xl font-black text-neutral-800">Randomly pick names for any occasion</h2>
          <p className="mb-12 text-center text-xl font-normal text-gray-500">You can easily create any type of wheel you want for any occasion</p>
        </div>
        <div className="grid gap-8 md:grid-cols-5">
          <div className="rounded bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={RandomNamePicker} alt="person icon" />
            </div>
            <h3 className="my-3 text-center font-bold ">Random Name Picker</h3>
            <p className="my-3 text-center text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={RaffleIcon} alt="mystery icon" />
            </div>
            <h3 className="my-3 text-center font-bold">Raffle Wheel</h3>
            <p className="my-3 text-center text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={MysteryIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center font-bold">Mystery Wheel</h3>
            <p className="my-3 text-center text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={RandomNumberIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center font-bold">Random Number Wheel</h3>
            <p className="my-3 text-center text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={GiveAwayIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center font-bold">Giveaway Picker</h3>
            <p className="my-3 text-center text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
          </div>
        </div>
      </div>
      <div className="my-12 bg-sky-100 py-12">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="my-6 text-3xl font-black text-neutral-800">Customize your Wheel</h3>
              <p className="text-xl text-gray-500">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, </p>
            </div>
            <div>
              <Image src={customizeWheel} alt="screenshot" />
            </div>
          </div>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <Image src={saveForLater} alt="screenshot" />
            </div>
            <div>
              <h3 className="my-6 text-3xl font-black text-neutral-800">Save Your Wheel for Later</h3>
              <p className="text-xl text-gray-500">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, </p>
            </div>
          </div>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="my-6 text-3xl font-black text-neutral-800">Share it with everyone</h3>
              <p className="text-xl text-gray-500">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, </p>
            </div>
            <div>
              <Image src={shareWithEveryone} alt="screenshot" />
            </div>
          </div>
        </div>
      </div>
      <Disclosure>
        <Disclosure.Button className="py-2">Is team pricing available?</Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">Yes! You can purchase a license that you can share with your entire team.</Disclosure.Panel>
      </Disclosure>
    </Layout>
  );
}
