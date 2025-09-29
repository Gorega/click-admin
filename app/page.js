import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="Click logo"
          width={300}
          height={300}
          priority
        />
        
        <div className="mt-8 flex flex-col items-center space-y-4">
          
          <div style={{textAlign:"center"}}>
            <Link
              href="/agent/login"
            >
              Agent Portal
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
