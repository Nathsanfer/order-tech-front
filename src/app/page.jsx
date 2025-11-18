"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação
    console.log("Login:", { email, senha });
    router.push("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <Image
            src="/albertos.png"
            alt="Alberto's Restaurant"
            width={200}
            height={200}
            className={styles.logo}
            priority
          />
          <h1 className={styles.brandTitle}>Alberto&apos;s</h1>
          <p className={styles.brandSubtitle}>Sabor Autêntico Italiano</p>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.loginCard}>
          <h2 className={styles.loginTitle}>Bem-vindo de volta!</h2>
          <p className={styles.loginSubtitle}>Faça login para continuar</p>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="senha" className={styles.label}>
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className={styles.rememberForgot}>
              <label className={styles.rememberMe}>
                <input type="checkbox" />
                <span>Lembrar-me</span>
              </label>
              <a href="#" className={styles.forgotPassword}>
                Esqueceu a senha?
              </a>
            </div>
            
            <button type="submit" src="/home" className={styles.loginButton}>
              Entrar
            </button>
          </form>
          
          <div className={styles.divider}>
            <span>ou</span>
          </div>
          
          <button className={styles.registerButton}>
            Criar nova conta
          </button>
        </div>
      </div>
    </div>
  );
}
