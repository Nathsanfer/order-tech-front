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
  router.push("/cadastro");  // ← Adicione esta linha
};

  return (
    <div className={styles.container}>

      <div className={styles.containerLeft}>
      </div>

      <div className={styles.containerRight}>
        {/* Beige form wrapper: personagem, título, card, divider e botão em coluna */}
        <div className={styles.form}>
          {/* Personagem do hambúrguer */}
          <div className={styles.characterContainer}>
            <Image
              src="/images/albertopng.png"
              alt="Personagem Alberto"
              width={120}
              height={120}
              className={styles.character}
              priority
            />
          </div>

          {/* Texto de boas-vindas */}
          <h1 className={styles.welcomeText}>Bem-Vindo de Volta!</h1>

          {/* Card do formulário (azul) */}
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

          {/* Divisor e botão em coluna abaixo do card (mantidos dentro do fundo bege) */}
          <div className={styles.divider}>
            <span>OU</span>
          </div>

          <button onClick={handleCreateAccount} className={styles.createAccountButton}>
            Criar Conta
          </button>

          
        </div>

      </div>

      <div className={styles.containerRightMirror}>
      </div>

    </div>
  );
}