import Link from 'next/link';
import styles from './page.module.css';

const mockSites = [
  { id: 1, name: 'Finance Media', domain: 'finance.asoventure.jp', category: '金融・投資', articles: 247, rank: 9.7, status: 'active', todayGenerated: 3 },
  { id: 2, name: 'Health Media', domain: 'health.asoventure.jp', category: '健康・美容', articles: 183, rank: 12.3, status: 'active', todayGenerated: 2 },
  { id: 3, name: 'Life Media', domain: 'life.asoventure.jp', category: 'ライフスタイル', articles: 156, rank: 15.1, status: 'active', todayGenerated: 2 },
  { id: 4, name: 'Job Media', domain: 'job.asoventure.jp', category: '就活・転職', articles: 201, rank: 11.4, status: 'active', todayGenerated: 1 },
  { id: 5, name: 'Music1963', domain: 'music1963.asoventure.jp', category: '昭和・音楽', articles: 312, rank: 8.2, status: 'active', todayGenerated: 4 },
];

const mockArticles = [
  { title: 'eMAXIS Slim 全世界株式 vs S&P500 完全比較', site: 'Finance Media', date: '2026-04-22', status: 'published', rank: 7 },
  { title: '固定費削減で年50万節約する方法', site: 'Finance Media', date: '2026-04-22', status: 'published', rank: 12 },
  { title: 'NMB48の代表曲ランキング【完全版】', site: 'Music1963', date: '2026-04-22', status: 'published', rank: 5 },
  { title: '薬機法に準拠したサプリの選び方', site: 'Health Media', date: '2026-04-21', status: 'published', rank: 18 },
  { title: '転職面接で使える自己PR例文30選', site: 'Job Media', date: '2026-04-21', status: 'published', rank: 9 },
  { title: '断捨離で人生が変わる7つの理由', site: 'Life Media', date: '2026-04-21', status: 'published', rank: 22 },
];

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Overview</h1>
          <p className={styles.subtitle}>2026年4月22日（火）· すべてのサイトが正常稼働中</p>
        </div>
        <Link href="/dashboard/generate" className="btn-primary">
          ⚡ 記事を今すぐ生成
        </Link>
      </div>

      {/* ── KPI CARDS ── */}
      <div className={styles.kpiGrid}>
        {[
          { icon: '📝', label: '今月の生成記事数', val: '87', unit: '本', sub: '目標: 150本 (58%)', trend: '+12 今週' },
          { icon: '🌐', label: '稼働サイト数', val: '5', unit: '件', sub: 'すべて正常稼働中', trend: '全サイト✓' },
          { icon: '📈', label: '平均検索順位', val: '11.3', unit: '位', sub: '先月比 +2.4位改善', trend: '↑ 改善中' },
          { icon: '💰', label: '今月の推定収益', val: '¥48,200', unit: '', sub: 'AdSense + アフィリエイト', trend: '+¥8,400 先月比' },
        ].map((kpi, i) => (
          <div key={i} className={`glass-card ${styles.kpiCard}`}>
            <div className={styles.kpiIcon}>{kpi.icon}</div>
            <div className={styles.kpiInfo}>
              <div className={styles.kpiLabel}>{kpi.label}</div>
              <div className={styles.kpiVal}>{kpi.val}<span className={styles.kpiUnit}>{kpi.unit}</span></div>
              <div className={styles.kpiSub}>{kpi.sub}</div>
            </div>
            <div className={styles.kpiTrend}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      <div className={styles.twoCol}>
        {/* ── SITES ── */}
        <div className={`glass-card ${styles.panel}`}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>サイト一覧</h2>
            <span className={styles.panelBadge}>{mockSites.length} サイト</span>
          </div>
          <div className={styles.siteList}>
            {mockSites.map((site) => (
              <div key={site.id} className={styles.siteRow}>
                <div className={styles.siteIcon}>
                  {site.name.charAt(0)}
                </div>
                <div className={styles.siteInfo}>
                  <div className={styles.siteName}>{site.name}</div>
                  <div className={styles.siteDomain}>{site.domain}</div>
                </div>
                <div className={styles.siteMeta}>
                  <span className={styles.siteArticles}>{site.articles}本</span>
                  <span className={styles.siteRank}>📈 {site.rank}位</span>
                </div>
                <div className={styles.siteStatus}>
                  <span className={styles.statusDot} />
                  <span className={styles.todayBadge}>今日+{site.todayGenerated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RECENT ARTICLES ── */}
        <div className={`glass-card ${styles.panel}`}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>最近の生成記事</h2>
            <span className={styles.panelBadge}>直近6件</span>
          </div>
          <div className={styles.articleList}>
            {mockArticles.map((article, i) => (
              <div key={i} className={styles.articleRow}>
                <div className={styles.articleDot} />
                <div className={styles.articleInfo}>
                  <div className={styles.articleTitle}>{article.title}</div>
                  <div className={styles.articleMeta}>
                    <span>{article.site}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                    <span>·</span>
                    <span className={styles.articleRank}>順位 {article.rank}位</span>
                  </div>
                </div>
                <span className={styles.publishedBadge}>公開中</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTIVITY FEED ── */}
      <div className={`glass-card ${styles.activityPanel}`}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>本日の自動実行ログ</h2>
          <span className={styles.liveIndicator}><span className={styles.liveDot} />LIVE</span>
        </div>
        <div className={styles.activityList}>
          {[
            { time: '09:02', icon: '✅', msg: 'Finance Media: 「eMAXIS Slim 全世界株式 vs S&P500」生成・公開完了', type: 'success' },
            { time: '09:01', icon: '🚀', msg: 'Vercel Deploy Hook 送信 → デプロイ開始', type: 'info' },
            { time: '08:30', icon: '✅', msg: 'Music1963: 「NMB48代表曲ランキング」生成・公開完了', type: 'success' },
            { time: '08:00', icon: '⚡', msg: 'Cron ジョブ起動 (JST 08:00)', type: 'info' },
            { time: '07:30', icon: '📊', msg: 'GSCレポート生成 → Discord通知送信完了', type: 'success' },
          ].map((log, i) => (
            <div key={i} className={`${styles.activityRow} ${styles[log.type]}`}>
              <span className={styles.activityTime}>{log.time}</span>
              <span className={styles.activityIcon}>{log.icon}</span>
              <span className={styles.activityMsg}>{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
