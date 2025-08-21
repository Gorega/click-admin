import Image from "next/image";
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
      </main>
    </div>
  );
}
