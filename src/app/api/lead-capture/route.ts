/**
 * /api/lead-capture — MediaForge AI お問い合わせリードキャプチャ
 * フォーム送信 → Discord通知 + GASスプレッドシート記録
 */
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

interface LeadData {
  name: string;
  email: string;
  company?: string;
  message?: string;
  plan?: string;
  source?: string;
}

async function notifyDiscord(lead: LeadData) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;
  const embed = {
    title: '🎯 MediaForge AI 新規リード',
    color: 0x5b4fcf,
    fields: [
      { name: '👤 氏名', value: lead.name, inline: true },
      { name: '📧 メール', value: lead.email, inline: true },
      { name: '🏢 会社', value: lead.company || '未記入', inline: true },
      { name: '📋 希望プラン', value: lead.plan || '未選択', inline: true },
      { name: '📝 メッセージ', value: (lead.message || '').slice(0, 500) || '未記入' },
    ],
    footer: { text: 'MediaForge AI Lead Capture | ' + new Date(Date.now() + 9*3600000).toLocaleString('ja-JP') },
    timestamp: new Date().toISOString(),
  };
  await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'MediaForge Leads', embeds: [embed] }) }).catch(() => {});
}

async function saveToSheet(lead: LeadData) {
  const gasUrl = process.env.GAS_LEAD_SHEET_URL;
  if (!gasUrl) return;
  await fetch(gasUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...lead, timestamp: new Date(Date.now() + 9*3600000).toISOString() }),
  }).catch(() => {});
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as LeadData;
    const { name, email } = body;
    if (!name || !email || !email.includes('@')) {
      return NextResponse.json({ error: 'name and valid email are required' }, { status: 400 });
    }
    // Parallel: Discord + Sheet
    await Promise.allSettled([notifyDiscord(body), saveToSheet(body)]);
    return NextResponse.json({ ok: true, message: 'お問い合わせありがとうございます。担当者よりご連絡いたします。' });
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'MediaForge AI Lead Capture API', version: '1.0' });
}
