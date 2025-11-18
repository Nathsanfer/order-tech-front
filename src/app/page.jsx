"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação
    console.log("Login:", { email, senha });
    router.push("/home");
  };

  const handleCreateAccount = () => {
    // Navegação para criar conta
    console.log("Criar nova conta");
  };

  return (
    <div className={styles.container}>

      <div className={styles.containerLeft}>
        <Image
          src="/images/albertos.png"
          alt="OrderTech"
          width={300}
          height={300}
          className={styles.logo}
          priority
        />
      </div>

      <div className={styles.containerRight}>
        
        <form className={styles.form} action="">
          {/* Personagem do hambúrguer */}
        <div className={styles.characterContainer}>
          <Image
            src="/images/albertopng.png"
            alt="Personagem Alberto"
            width={200}
            height={160}
            className={styles.character}
            priority
          />
        </div>
        
        {/* Texto de boas-vindas */}
        <h1 className={styles.welcomeText}>Bem-Vindo de Volta!</h1>
        
        {/* Card do formulário */}
        <div className={styles.loginCard}>
          <h2 className={styles.loginTitle}>Login</h2>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="senha" className={styles.label}>
                Senha:
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.checkboxContainer}>
              <label className={styles.rememberMe}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>Lembre de mim</span>
              </label>
              <a href="#" className={styles.forgotPassword}>
                Esqueci minha senha
              </a>
            </div>
            
            <button type="submit" className={styles.loginButton}>
              Entrar
            </button>
          </form>
        </div>
        
        {/* Divisor */}
        <div className={styles.divider}>
          <span>OU</span>
        </div>
        
        {/* Botão Criar Conta */}
        <button onClick={handleCreateAccount} className={styles.createAccountButton}>
          Criar Conta
        </button>
        </form>

      </div>
    </div>
  );
}
