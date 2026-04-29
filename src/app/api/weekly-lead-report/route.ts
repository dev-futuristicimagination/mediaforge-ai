/**
 * /api/weekly-lead-report
 * 毎週月曜 9:00 JST — 先週のリード数をDiscordに報告
 */
import { NextResponse } from 'next/server';
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== 'Bearer '+process.env.CRON_SECRET)
    return NextResponse.json({error:'Unauthorized'},{status:401});
  const gasUrl = process.env.GAS_LEAD_SHEET_URL;
  if (!gasUrl) return NextResponse.json({skipped:true,reason:'no GAS_LEAD_SHEET_URL'});
  // Request summary from GAS
  try {
    const r = await fetch(gasUrl+'?action=weekly-summary');
    const d = await r.json() as {count?:number;leads?:{name:string;email:string}[]};
    const discordUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordUrl) {
      const count = d.count||0;
      const msg = count > 0
        ? `📊 **MediaForge AI 週次リードレポート**\n先週の新規リード: **${count}件**\n\n${(d.leads||[]).slice(0,5).map(l=>l.name+' '+l.email).join('\n')}`
        : '📊 **MediaForge AI 週次リードレポート**\n先週の新規リード: 0件';
      await fetch(discordUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:msg})}).catch(()=>{});
    }
    return NextResponse.json({ok:true,count:d.count||0});
  } catch {
    return NextResponse.json({skipped:true,reason:'GAS fetch failed'});
  }
}
