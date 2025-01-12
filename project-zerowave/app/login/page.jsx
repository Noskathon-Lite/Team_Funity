import Image from "next/image";
import styles from '../../styles/main2.css';
import Link from 'next/link';
export const metadata = {
  title: 'ZeroWave-Login',
  icons: {
    icon: '/img/logo.ico',
  },
};

export default function Login() {
  return (
    <>
    <div className="flex justify-center items-center " id="login">
      <img src="/img/zerowave-logo.png" alt="logo" id="usrimg" />
    
        <h2 className="text-xl font-[profeshhh] p-[43px]" id="title">zerowave-user</h2>
        <input type="password" placeholder="password (optional)" id="psd" autoComplete="new-password"/>
        <a href="/desktop">
          <img src="/img/arrow.svg" alt="" id="enter"/>
        </a>
    </div>
    <div>
      <img src="/img/pp.png" alt="usr-img" id="ii"/>
    </div>
    </>
  );
}
