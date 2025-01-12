import Image from "next/image";
import styles from '../styles/main.css';

export const metadata = {
  title: 'ZeroWave ',
  icons: {
    icon: '/img/logo.ico', 
  },
};

export default function Home() {
  return (
    <div>
       <h1 className="text-center">Hello</h1>
    </div>
  );
}
