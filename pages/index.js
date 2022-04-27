import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container">
        <h1 className="text-3xl font-bold underline">test</h1>
        <Link href="/create">Create Spin Wheel</Link>
      </div>
    </Layout>
  );
}
