"use client";
import dynamic from "next/dynamic";
const Content = dynamic(() => import("./PageComponent"), { ssr: false });

const BintangPage = () => {
  return <Content />;
};

export default BintangPage;
