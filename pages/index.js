import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import saveForLater from "../public/images/save-for-later.png";
import Inputs from "../public/images/inputs.png";
import shareWithEveryone from "../public/images/share-with-everyone.png";
import customizeWheel from "../public/images/customize-wheel.png";
import SpinWheelImage from "../public/images/spinwheel-home-2.png";
import RaffleIcon from "../public/images/raffle.png";
import MysteryIcon from "../public/images/mystery.png";
import RandomNumberIcon from "../public/images/number.png";
import GiveAwayIcon from "../public/images/giveaway.png";
import RandomNamePicker from "../public/images/name.png";

import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

import { Disclosure, Transition } from "@headlessui/react";

export default function Home() {
  return (
    <Layout>
      <div className="container relative mt-12 mb-3 grid grid-cols-1 items-center justify-items-center gap-2 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="text-center text-2xl font-bold">What to Eat for Lunch?</p>
          <Image src={SpinWheelImage} alt="spin the wheel" />
        </div>
        <img className="absolute z-10 md:top-1/2 md:left-1/2" src="../images/try-it-out.png" />
        <div className="flex items-center">
          <div className="relative">
            <Image src={Inputs} alt="inputs for spin wheel" />
            <Link href="/create">
              <a className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-blue-600 py-2 px-8 font-semibold text-white transition hover:bg-blue-700">Edit Wheel </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mb-32 grid grid-cols-1 justify-items-center gap-2 md:grid-cols-2">
        <span></span>
        <div className="order-last text-center">
          <h1 className="text-2xl font-bold text-neutral-800">Free Spin Wheel Generator</h1>
          <p className="text-sm text-gray-500">Randomly pick names by creating a spinner wheel</p>
        </div>
      </div>
      <div className="container my-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mt-6 mb-3 text-center text-2xl font-bold text-neutral-800">Randomly pick names for any occasion</h2>
          <p className="mb-12 text-center text-xl font-normal text-gray-500">You can easily create any type of wheel you want for any occasion</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={RandomNamePicker} alt="person icon" />
            </div>
            <h3 className="my-3 text-center font-bold ">Random Name Picker</h3>
            <p className="my-3 text-center text-sm">Add a list of names and let the spin wheel randomly decide for you!</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={RaffleIcon} alt="mystery icon" />
            </div>
            <h3 className="my-3 text-center font-bold">Raffle Wheel</h3>
            <p className="my-3 text-center text-sm">Easily add a list of contestants and your spin wheel will do the rest!</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={MysteryIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center font-bold">Mystery Wheel</h3>
            <p className="my-3 text-center text-sm">Allow your spin wheel to make the decision for you.</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={RandomNumberIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center font-bold">Random Number Wheel</h3>
            <p className="my-3 text-center text-sm">Pick a number between one and ... however many you want!</p>
          </div>
          <div className="rounded border-2 bg-gray-100 py-8 px-6">
            <div className="flex justify-center">
              <Image src={GiveAwayIcon} alt="person icon" />
            </div>
            <h3 className="my-3 text-center font-bold">Giveaway Picker</h3>
            <p className="my-3 text-center text-sm">Ready to pick the winner for you giveaway? Load your list of names and your spin wheel will pick for you.</p>
          </div>
        </div>
      </div>
      <div className="my-12 bg-sky-100 py-12">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="my-6 text-3xl font-bold text-neutral-800">Customize your Wheel</h3>
              <p className="text-xl text-gray-500">Easily customize your spin wheel by giving it a name, changing the order, and loading items in bulk! We make is as easy as possible to get you up and running in no time.</p>
            </div>
            <div>
              <Image src={customizeWheel} alt="screenshot" />
            </div>
          </div>
          <div className="grid items-center gap-10  md:grid-cols-2">
            <div className="order-last md:order-first">
              <Image src={saveForLater} alt="screenshot" />
            </div>
            <div>
              <h3 className="my-6 text-3xl font-bold text-neutral-800">Save Your Wheel for Later</h3>
              <p className="text-xl text-gray-500">Need to use your spin wheel for later? No worries. Save it for later when you create an account to use it at anytime again in the future for free.</p>
            </div>
          </div>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="my-6 text-3xl font-bold text-neutral-800">Share it with everyone</h3>
              <p className="text-xl text-gray-500">If you have the perfect spin wheel ready, you can share it with all of your friends for them to see.</p>
            </div>
            <div>
              <Image src={shareWithEveryone} alt="screenshot" />
            </div>
          </div>
        </div>
      </div>
      <div className="container my-12">
        <h2 className="mt-6 mb-3 text-center text-2xl font-bold text-neutral-800">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-5xl">
          <Disclosure>
            {({ open }) => (
              <div className={open ? "my-6 rounded-md border-2 border-blue-300 bg-blue-100 px-7 py-2" : "my-6 rounded-md border-2 border-gray-300 bg-gray-100 px-7 py-2"}>
                <Disclosure.Button className={open ? "flex w-full justify-between font-medium text-blue-500" : "flex w-full justify-between font-medium "}>
                  Why use our Spin wheel maker?
                  {open ? <MinusCircleIcon className={open ? "w-6" : "w-6"} /> : <PlusCircleIcon className={open ? "w-6" : "w-6"} />}
                </Disclosure.Button>
                <Transition
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="mt-4 text-gray-500">Yes! You can purchase a license that you can share with your entire team.</Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <div className={open ? "my-6 rounded-md border-2 border-blue-300 bg-blue-100 px-7 py-2" : "my-6 rounded-md border-2 border-gray-300 bg-gray-100 px-7 py-2"}>
                <Disclosure.Button className={open ? "flex w-full justify-between font-medium text-blue-500" : "flex w-full justify-between font-medium "}>
                  How Do I use SpinWheelMaker.com?
                  {open ? <MinusCircleIcon className={open ? "w-6" : "w-6"} /> : <PlusCircleIcon className={open ? "w-6" : "w-6"} />}
                </Disclosure.Button>
                <Transition
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="mt-4 text-gray-500">Yes! You can purchase a license that you can share with your entire team.</Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <div className={open ? "my-6 rounded-md border-2 border-blue-300 bg-blue-100 px-7 py-2" : "my-6 rounded-md border-2 border-gray-300 bg-gray-100 px-7 py-2"}>
                <Disclosure.Button className={open ? "flex w-full justify-between font-medium text-blue-500" : "flex w-full justify-between font-medium "}>
                  Can the spin wheel be rigged?
                  {open ? <MinusCircleIcon className={open ? "w-6" : "w-6"} /> : <PlusCircleIcon className={open ? "w-6" : "w-6"} />}
                </Disclosure.Button>
                <Transition
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="mt-4 text-gray-500">Yes! You can purchase a license that you can share with your entire team.</Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
        </div>
      </div>
    </Layout>
  );
}
