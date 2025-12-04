"use client";
import Image from "next/image";
import styles from "./cadastro.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomAlert from "../components/CustomAlert";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3200);
  };

  const validarEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validarSenha = (s) => s && s.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !validarEmail(email)) return showAlert("Informe um e‑mail válido", "error");
    if (!validarSenha(senha)) return showAlert("Senha mínima: 6 caracteres", "warning");

    setLoading(true);
    try {
      // Simulação de request
      await new Promise((r) => setTimeout(r, 900));
      showAlert("Conta criada com sucesso!", "success");
      setTimeout(() => router.push("/"), 1200);
    } catch {
      showAlert("Erro ao criar conta", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.ornamentTop} />

      <header className={styles.header}>
        <h1 className={styles.title}>Crie sua conta</h1>
        <p className={styles.subtitle}>Cadastre-se e deixe que a gente cuide da sua fome.</p>
      </header>

      <section className={styles.centerWrap}>
        <div className={styles.cardBeige}>
          <div className={styles.inner}>
            <div className={styles.left}>
              <div className={styles.smallTitle}>Faça parte do nosso banquete!</div>

              <div className={styles.formCard}>
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <label className={styles.field}>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      placeholder="seu.email@example.com"
                      disabled={loading}
                      aria-label="email"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    Senha:
                    <input
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      className={styles.input}
                      placeholder="Mínimo 6 caracteres"
                      disabled={loading}
                      aria-label="senha"
                      required
                    />
                  </label>

                  <button type="submit" className={styles.cta} disabled={loading}>
                    {loading ? "Criando conta..." : "Criar Conta"}
                  </button>
                </form>
              </div>
            </div>

            <aside className={styles.right}>
              <div className={styles.characterWrap}>
                <Image
                  src="/images/albertofeliz.png"
                  alt="Alberto"
                  width={420}
                  height={420}
                  className={styles.character}
                  priority
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className={styles.ornamentBottom} />

      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </main>
  );
}