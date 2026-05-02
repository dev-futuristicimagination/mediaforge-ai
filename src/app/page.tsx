import Link from 'next/link';
import styles from './page.module.css';

const CONTACT_FORM = 'https://forms.gle/Vw1PBQefXRLvTw459';

// ネットワーク実績データ（月次自動更新）
async function getNetworkStats() {
  try {
    const r = await fetch('https://raw.githubusercontent.com/dev-futuristicimagination/mediaforge-ai/master/public/network-stats.json', { next:{ revalidate:86400 } });
    if (r.ok) return r.json() as Promise<{totalArticlesThisMonth:number;activeSites:number;avgQAScore:number;successRate:number}>;
  } catch {}
  return { totalArticlesThisMonth:0, activeSites:10, avgQAScore:92, successRate:97 };
}

export default async function LandingPage() {
  const stats = await getNetworkStats();
  return (
    <div className={styles.wrapper}>
      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>MediaForge <span className="gradient-text">AI</span></span>
          </div>
          <div className={styles.navLinks}>
            <a href="#pain">課題</a>
            <a href="#features">機能</a>
            <a href="#works">実績</a>
            <a href="#pricing">料金</a>
          </div>
          <div className={styles.navCta}>
            <a href="#features" className="btn-ghost" style={{fontSize:'14px',padding:'9px 18px'}}>サービス内容</a>
            <a href={CONTACT_FORM} className="btn-primary" style={{fontSize:'14px',padding:'9px 18px'}} target="_blank" rel="noopener noreferrer">無料相談 →</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroContent}>
          <div className="badge" style={{marginBottom:'24px'}}>
            <span>🔥</span> 競合は今日も記事を積んでいる
          </div>
          <h1 className={styles.heroTitle}>
            コンテンツ不足が、<br />
            <span className="gradient-text">機会損失を生んでいる。</span>
          </h1>
          <p className={styles.heroSub}>
            自社で{stats.activeSites}サイト・9言語・年間6,570記事を<strong>¥0のライター費用</strong>で運営する<br />
            同じシステムを、あなたの会社に構築します。
          </p>
          <div className={styles.heroCta}>
            <a href={CONTACT_FORM} className="btn-primary" style={{fontSize:'16px',padding:'16px 36px'}} target="_blank" rel="noopener noreferrer">
              30分無料相談を予約する →
            </a>
            <a href="#works" className="btn-ghost" style={{fontSize:'16px',padding:'16px 36px'}}>
              実績を見る
            </a>
          </div>
          <p className={styles.heroNote}>費用・見積もり無料 · NDA対応可 · 最短2週間で稼働開始</p>
        </div>

        {/* ダッシュボードプレビュー */}
        <div className={styles.heroPreview}>
          <div className={styles.previewWindow}>
            <div className={styles.previewBar}>
              <span style={{background:'#ef4444'}} />
              <span style={{background:'#f59e0b'}} />
              <span style={{background:'#10b981'}} />
            </div>
            <div className={styles.previewContent}>
              <div className={styles.previewSidebar}>
                {['📊 Overview','🌐 サイト一覧','📝 記事管理','⚙️ 設定'].map((item, i) => (
                  <div key={i} className={`${styles.previewSideItem} ${i===0 ? styles.active : ''}`}>{item}</div>
                ))}
              </div>
              <div className={styles.previewMain}>
                <div className={styles.previewStats}>
                  {[
                    {label:'今月の生成記事', val:'546', icon:'📝'},
                    {label:'総サイト数', val:'18', icon:'🌐'},
                    {label:'対応言語数', val:'9言語', icon:'🌏'},
                  ].map((s, i) => (
                    <div key={i} className={styles.previewStatCard}>
                      <span style={{fontSize:'20px'}}>{s.icon}</span>
                      <div>
                        <div style={{fontSize:'20px',fontWeight:700,color:'var(--primary)'}}>{s.val}</div>
                        <div style={{fontSize:'11px',color:'var(--text-muted)'}}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:'12px',color:'var(--text-muted)',marginBottom:'8px',fontWeight:600}}>最近の生成記事</div>
                {['eMAXIS Slim 全世界株式 vs S&P500 完全比較','固定費削減で年50万節約する方法','新NISA 2026年最新版ガイド'].map((title, i) => (
                  <div key={i} className={styles.previewArticleRow}>
                    <span className={styles.previewDot} />
                    <span style={{fontSize:'11px',color:'var(--text-secondary)',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{title}</span>
                    <span className={styles.previewBadge}>公開中</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className={styles.proof}>
        <div className={styles.proofInner}>
          {[
            {val:'18+', label:'稼働サイト数'},
            {val:'6,570', label:'年間自動生成記事数'},
            {val:'9言語', label:'多言語対応'},
            {val:'¥0', label:'ライター費用'},
            {val:'24h', label:'365日自動稼働'},
          ].map((s, i) => (
            <div key={i} className={styles.proofItem}>
              <div className={styles.proofVal}>{s.val}</div>
              <div className={styles.proofLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section id="pain" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div className="badge">こんな課題、ありませんか？</div>
            <h2 className={styles.sectionTitle}>コンテンツ担当者だけが疲弊している</h2>
            <p className={styles.sectionSub}>多くのメディア企業・EC企業が直面している「コンテンツの壁」</p>
          </div>
          <div className={styles.painGrid}>
            {[
              {icon:'😩', title:'記事を書くリソースがない', desc:'ライター採用・管理・品質チェック…コンテンツ1本作るのに3日かかる。競合はその間に10本公開している。'},
              {icon:'💸', title:'外注コストが青天井', desc:'ライター単価500〜2,000円/文字。SEO記事1本で3〜5万円。月50本で150万円。利益が出ない構造になっている。'},
              {icon:'🌍', title:'多言語展開が手つかず', desc:'海外向けコンテンツを作りたいが、翻訳コストと品質管理の壁が高すぎて手が出ない。'},
              {icon:'📉', title:'検索順位が上がらない', desc:'記事数が少ないからGoogleに評価されない。評価されないから記事を増やす予算も取れない。負のスパイラル。'},
            ].map((p, i) => (
              <div key={i} className={`glass-card ${styles.painCard}`}>
                <div className={styles.painIcon}>{p.icon}</div>
                <h3 className={styles.painTitle}>{p.title}</h3>
                <p className={styles.painDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'48px',padding:'32px',background:'linear-gradient(135deg,rgba(91,79,207,0.06),rgba(124,58,237,0.04))',borderRadius:'16px',border:'1px solid rgba(91,79,207,0.15)'}}>
            <p style={{fontSize:'20px',fontWeight:700,marginBottom:'8px',color:'var(--text-primary)'}}>その課題、MediaForge AIが全部解決します。</p>
            <p style={{color:'var(--text-secondary)',fontSize:'15px'}}>月額固定費のみ。ライター・翻訳・SEO担当者は不要になります。</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div className="badge">機能</div>
            <h2 className={styles.sectionTitle}>メディア運営に必要なすべてが揃う</h2>
            <p className={styles.sectionSub}>記事生成から収益化まで、ワンプラットフォームで完結</p>
          </div>
          <div className={styles.featuresGrid}>
            {[
              {icon:'🤖', title:'AI記事自動生成', desc:'Gemini 2.5を使用。カテゴリ・トーン・SEOキーワードを設定するだけで高品質な記事を自動生成。薬機法・著作権への配慮も組み込み済み。'},
              {icon:'🔍', title:'SEO完全自動化', desc:'メタデータ・OGP・sitemap.xml・Google Ping送信まで自動。生成後すぐにインデックスされる設計。'},
              {icon:'🚀', title:'Vercel自動デプロイ', desc:'記事生成のたびに自動でデプロイ。URLが即日開通。SSG + ISRで高速表示を実現。'},
              {icon:'💰', title:'アフィリエイト自動挿入', desc:'A8.net・Amazon・楽天アフィリエイトタグを記事内容に応じて自動挿入。収益化まで全自動。'},
              {icon:'📊', title:'GSC・GA4連携', desc:'Google Search ConsoleとGA4のデータを毎週Discord・Slackへ自動レポート。データドリブンなSEO改善。'},
              {icon:'🔄', title:'記事自動リライト', desc:'検索順位11〜30位の記事をAIが自動検出し、リライト提案・実行まで自動化。'},
            ].map((f, i) => (
              <div key={i} className={`glass-card ${styles.featureCard}`}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="howitworks" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div className="badge">使い方</div>
            <h2 className={styles.sectionTitle}>たった3ステップで稼働開始</h2>
          </div>
          <div className={styles.stepsGrid}>
            {[
              {step:'01', icon:'⚙️', title:'サイトを設定する', desc:'メディアテーマ・カテゴリ・ターゲット読者・アフィリエイト設定を入力。5分で完了。'},
              {step:'02', icon:'🤖', title:'AIが記事を生成する', desc:'毎日または週次スケジュールで自動生成。SEO最適化・フロントマター・画像サムネイルまで自動。'},
              {step:'03', icon:'🌐', title:'自動公開・収益化', desc:'GitHubへコミット → Vercelへデプロイ → Google Ping送信まで全自動。あとは順位が上がるのを待つだけ。'},
            ].map((s, i) => (
              <div key={i} className={`glass-card ${styles.stepCard}`}>
                <div className={styles.stepNumber}>{s.step}</div>
                <div className={styles.stepIcon}>{s.icon}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
                {i < 2 && <div className={styles.stepArrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL WORKS ── */}
      <section id="works">
          {/* 動的実績バッジ */}
          <div style={{display:'flex',gap:'24px',flexWrap:'wrap',justifyContent:'center',marginBottom:'40px'}}>
            <div style={{background:'rgba(91,79,207,0.1)',border:'1px solid rgba(91,79,207,0.3)',borderRadius:'12px',padding:'16px 24px',textAlign:'center'}}>
              <div style={{fontSize:'32px',fontWeight:800,color:'#5b4fcf'}}>{stats.totalArticlesThisMonth}<span style={{fontSize:'16px'}}> 件</span></div>
              <div style={{fontSize:'12px',color:'#888',marginTop:'4px'}}>今月の自動生成記事</div>
            </div>
            <div style={{background:'rgba(91,79,207,0.1)',border:'1px solid rgba(91,79,207,0.3)',borderRadius:'12px',padding:'16px 24px',textAlign:'center'}}>
              <div style={{fontSize:'32px',fontWeight:800,color:'#5b4fcf'}}>{stats.avgQAScore}<span style={{fontSize:'16px'}}>/100</span></div>
              <div style={{fontSize:'12px',color:'#888',marginTop:'4px'}}>平均品質スコア</div>
            </div>
            <div style={{background:'rgba(91,79,207,0.1)',border:'1px solid rgba(91,79,207,0.3)',borderRadius:'12px',padding:'16px 24px',textAlign:'center'}}>
              <div style={{fontSize:'32px',fontWeight:800,color:'#5b4fcf'}}>{stats.successRate}<span style={{fontSize:'16px'}}>%</span></div>
              <div style={{fontSize:'12px',color:'#888',marginTop:'4px'}}>生成成功率</div>
            </div>
          </div><div style={{display:"none"}} className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div className="badge">実際に動いているサイト</div>
            <h2 className={styles.sectionTitle}>自社で18サイト、今日も自動生成中</h2>
            <p className={styles.sectionSub}>「できる」ではなく「やっている」。すべて弊社が実際に運営しているメディアです。</p>
          </div>
          <div className={styles.worksGrid}>
            {[
              {icon:'💼', name:'Asoventure Job', url:'job.asoventure.jp', lang:'日本語', articles:'毎日3本', desc:'就職・転職情報メディア。Gemini AIが業界別キャリア記事を毎日自動生成。'},
              {icon:'📚', name:'Asoventure Education', url:'education.asoventure.jp', lang:'日本語', articles:'毎日4本', desc:'学習・資格・教育コンテンツを完全自動生成。受験・資格試験の解説記事など。'},
              {icon:'🎵', name:'music1963', url:'music1963.com', lang:'日本語', articles:'毎日2本', desc:'昭和・平成ノスタルジア音楽メディア。シニア層向けコンテンツをAIで生成。'},
              {icon:'🗾', name:'Japan Guide', url:'japan.asoventure.jp', lang:'9言語', articles:'毎日18本', desc:'日本旅行ガイドを9言語で自動生成・公開。英語・韓国語・中国語など多言語展開。'},
              {icon:'💰', name:'副業マネー', url:'fukugyo-money.com', lang:'日本語', articles:'毎日2本', desc:'副業・フリーランス向け金融メディア。アフィリエイト収益化まで完全自動。'},
              {icon:'🏥', name:'Asoventure Health', url:'health.asoventure.jp', lang:'日本語', articles:'毎日2本', desc:'健康・医療情報メディア。薬機法への配慮を組み込んだAI生成で安心運用。'},
            ].map((w, i) => (
              <a key={i} href={`https://${w.url}`} target="_blank" rel="noopener noreferrer" className={`glass-card ${styles.workCard}`}>
                <div className={styles.workCardIcon}>{w.icon}</div>
                <div className={styles.workCardName}>{w.name}</div>
                <div className={styles.workCardUrl}>{w.url}</div>
                <p className={styles.workCardDesc}>{w.desc}</p>
                <div className={styles.workCardTags}>
                  <span className={styles.workTag}>🌐 {w.lang}</span>
                  <span className={styles.workTag}>📝 {w.articles}</span>
                </div>
              </a>
            ))}
          </div>
          <p style={{textAlign:'center',marginTop:'24px',color:'var(--text-muted)',fontSize:'14px'}}>
            ＊上記はすべてFuturistic Imagination LLCが自社運営するメディアです。同じ仕組みを貴社に構築します。
          </p>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div className="badge">料金プラン</div>
            <h2 className={styles.sectionTitle}>ライター1名分の費用で、月150本以上</h2>
            <p className={styles.sectionSub}>月額固定料金のみ。初期費用・従量課金なし。まずは無料相談から。</p>
          </div>
          <div className={styles.pricingGrid}>
            {[
              {
                name:'Starter', price:'¥50,000', period:'/月',
                desc:'小規模メディア・個人事業主向け',
                features:['記事生成 50本/月','1サイト','SEO自動化','アフィリエイト挿入','Discord通知レポート'],
                cta:'無料相談する', highlighted: false,
                href: CONTACT_FORM,
              },
              {
                name:'Growth', price:'¥150,000', period:'/月',
                desc:'メディア企業・EC企業向け（最人気）',
                features:['記事生成 200本/月','5サイト・多言語対応','全機能 + GSC連携','自動リライト','専任サポート'],
                cta:'無料相談する', highlighted: true,
                href: CONTACT_FORM,
              },
              {
                name:'Enterprise', price:'要相談', period:'',
                desc:'メディア会社・代理店・大企業向け',
                features:['記事生成 無制限','サイト数 無制限','全機能＋カスタム開発','専用Slack連携','SLA・NDA対応'],
                cta:'お問い合わせ', highlighted: false,
                href: CONTACT_FORM,
              },
            ].map((plan, i) => (
              <div key={i} className={`glass-card ${styles.pricingCard} ${plan.highlighted ? styles.pricingHighlighted : ''}`}>
                {plan.highlighted && <div className={styles.popularBadge}>最人気</div>}
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planPrice}>
                  {plan.price}<span className={styles.planPeriod}>{plan.period}</span>
                </div>
                <p className={styles.planDesc}>{plan.desc}</p>
                <ul className={styles.planFeatures}>
                  {plan.features.map((f, j) => (
                    <li key={j}><span className={styles.checkIcon}>✓</span>{f}</li>
                  ))}
                </ul>
                <a href={plan.href} className={plan.highlighted ? 'btn-primary' : 'btn-ghost'} style={{width:'100%',justifyContent:'center',display:'flex'}} target="_blank" rel="noopener noreferrer">
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div className="badge">無料相談</div>
            <h2 className={styles.sectionTitle}>まず30分、話を聞かせてください</h2>
            <p className={styles.sectionSub}>貴社のメディア状況をヒアリングし、最適な自動化プランをご提案します。費用は一切かかりません。</p>
          </div>
          <div className={styles.contactGrid}>
            {/* ── インラインリードキャプチャフォーム（#10 lead-capture API接続 2026-05-03）── */}
          <div className={`glass-card ${styles.contactCard}`} style={{gridColumn:'1/-1'}}>
            <div className={styles.contactIcon}>📨</div>
            <h3 className={styles.contactTitle}>フォームで問い合わせ（担当者が直接返信）</h3>
            <p className={styles.contactDesc}>送信後すぐに弊社Discordに通知が届き、24時間以内に返信します。</p>
            <form
              id="lead-capture-form"
              style={{marginTop:'20px', display:'flex', flexDirection:'column', gap:'12px'}}
              onSubmit={undefined}
              action="/api/lead-capture"
              method="POST"
            >
              <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
                <input id="lead-name" name="name" type="text" required placeholder="お名前 *" style={{flex:1, minWidth:'160px', padding:'10px 14px', borderRadius:'8px', border:'1px solid rgba(91,79,207,0.3)', background:'rgba(255,255,255,0.05)', color:'var(--text-primary)', fontSize:'14px'}} />
                <input id="lead-email" name="email" type="email" required placeholder="メールアドレス *" style={{flex:1, minWidth:'160px', padding:'10px 14px', borderRadius:'8px', border:'1px solid rgba(91,79,207,0.3)', background:'rgba(255,255,255,0.05)', color:'var(--text-primary)', fontSize:'14px'}} />
              </div>
              <input id="lead-company" name="company" type="text" placeholder="会社名（任意）" style={{padding:'10px 14px', borderRadius:'8px', border:'1px solid rgba(91,79,207,0.3)', background:'rgba(255,255,255,0.05)', color:'var(--text-primary)', fontSize:'14px'}} />
              <select id="lead-plan" name="plan" style={{padding:'10px 14px', borderRadius:'8px', border:'1px solid rgba(91,79,207,0.3)', background:'rgba(20,20,40,0.9)', color:'var(--text-primary)', fontSize:'14px'}}>
                <option value="">希望プラン（任意）</option>
                <option value="Starter">Starter — ¥50,000/月</option>
                <option value="Growth">Growth — ¥150,000/月（最人気）</option>
                <option value="Enterprise">Enterprise — 要相談</option>
              </select>
              <textarea id="lead-message" name="message" rows={3} placeholder="ご相談内容（任意）" style={{padding:'10px 14px', borderRadius:'8px', border:'1px solid rgba(91,79,207,0.3)', background:'rgba(255,255,255,0.05)', color:'var(--text-primary)', fontSize:'14px', resize:'vertical'}} />
              <button id="lead-submit" type="submit" className="btn-primary" style={{fontSize:'15px', padding:'13px 28px', cursor:'pointer', border:'none'}}>
                送信する →
              </button>
            </form>
          </div>

            <div className={`glass-card ${styles.contactCard}`}>
              <div className={styles.contactIcon}>✉️</div>
              <h3 className={styles.contactTitle}>メールで問い合わせ</h3>
              <p className={styles.contactDesc}>詳細な要件・見積もり依頼・NDA対応など、まずはメールでお気軽にどうぞ。通常24時間以内に返信します。</p>
              <a href="mailto:ta-sato@futuristicimagination.co.jp?subject=MediaForge AI 相談&body=【会社名】%0A【担当者名】%0A【ご相談内容】%0A" className="btn-ghost" style={{marginTop:'20px',fontSize:'15px',padding:'14px 32px'}}>
                メールを送る
              </a>
            </div>
            <div className={`glass-card ${styles.contactCard}`}>
              <div className={styles.contactIcon}>🌐</div>
              <h3 className={styles.contactTitle}>会社サイトを見る</h3>
              <p className={styles.contactDesc}>Futuristic Imagination LLCの実績・サービス詳細・会社概要はこちらからご確認いただけます。</p>
              <a href="https://www.futuristicimagination.co.jp" className="btn-ghost" style={{marginTop:'20px',fontSize:'15px',padding:'14px 32px'}} target="_blank" rel="noopener noreferrer">
                FI公式サイトへ →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaOrb} />
        <div className={styles.finalCtaContent}>
          <h2 className={styles.finalCtaTitle}>競合が気づく前に、始めよう</h2>
          <p className={styles.finalCtaSub}>毎日18サイト・100記事を自動生成する同じシステムを、あなたの会社に構築します。</p>
          <a href={CONTACT_FORM} className="btn-primary" style={{fontSize:'16px',padding:'16px 40px',marginTop:'8px'}} target="_blank" rel="noopener noreferrer">
            30分無料相談を予約する →
          </a>
          <p style={{marginTop:'16px',color:'var(--text-muted)',fontSize:'14px'}}>費用・見積もり無料 · 秘密保持対応 · 最短2週間で稼働</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span>⚡</span>
            <span>MediaForge <span className="gradient-text">AI</span></span>
          </div>
          <p style={{color:'var(--text-muted)',fontSize:'13px'}}>
            © 2026 Futuristic Imagination LLC. All rights reserved.
          </p>
          <div className={styles.footerLinks}>
            <a href="#">利用規約</a>
            <a href="#">プライバシーポリシー</a>
            <a href={CONTACT_FORM} target="_blank" rel="noopener noreferrer">お問い合わせ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
