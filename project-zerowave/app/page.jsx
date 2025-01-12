'use client';
import Image from "next/image";
import styles from '../styles/main.css';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // This will navigate to the login page
      router.push("/login");
    }, 3000); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <div className="flex justify-center items-center space-x-4">
        <img
          src="/img/funity-big(t).png"
          id="img"
          alt="Funity Logo"
        />
        <img
          src="/img/zerowave-logo.png"
          id="loader"
          alt="ZeroWave Logo"
          className="loader"
        />
      </div>
    </>
  );
}

