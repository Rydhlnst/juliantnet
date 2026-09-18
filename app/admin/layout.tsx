import styles from "./admin-layout.module.css"

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <div className={styles.root}>{children}</div>
}
