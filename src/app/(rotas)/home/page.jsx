"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/cardapio');
  };

  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <Image
          src="/images/albertos.png"
          alt="OrderTech"
          width={300}
          height={300}
          className={styles.logo}
          priority
        />
      </div>
      
      <div className={styles.content}>
        <Image
          src="/icons/icons-colecao.png"
          alt="OrderTech"
          width={500}
          height={48}
          className={styles.icon}
          priority
        />
        <h1 className={styles.title}>Order Tech</h1>
        <h2 className={styles.subtitle}>Faça seus pedidos por aqui!</h2>
        <button className={styles.button} onClick={handleStartClick}>Toque para Iniciar</button>
        <Image
          src="/icons/icons-colecao.png"
          alt="OrderTech"
          width={500}
          height={48}
          className={styles.iconcollection}
          priority
        />
      </div>
    </div>
  );
}