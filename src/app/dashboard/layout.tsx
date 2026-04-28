'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

const navItems = [
  { href: '/dashboard', icon: '📊', label: 'Overview' },
  { href: '/dashboard/sites', icon: '🌐', label: 'サイト一覧' },
  { href: '/dashboard/articles', icon: '📝', label: '記事管理' },
  { href: '/dashboard/generate', icon: '⚡', label: '記事生成' },
  { href: '/dashboard/analytics', icon: '📈', label: 'アナリティクス' },
  { href: '/dashboard/settings', icon: '⚙️', label: '設定' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className={styles.shell}>
      {/* ── SIDEBAR ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}>
            <span>⚡</span>
            <span>MediaForge <span style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>AI</span></span>
          </Link>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.plan}>
            <div className={styles.planBadge}>Growth プラン</div>
            <div className={styles.planUsage}>
              <span>記事生成: 87 / 150本</span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{width: '58%'}} />
              </div>
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.avatar}>佐</div>
            <div>
              <div className={styles.userName}>佐藤 卓也</div>
              <div className={styles.userEmail}>takuya@fi.co.jp</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
