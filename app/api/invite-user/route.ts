import { InviteUserEmail } from '@/emails/invite-user';
import { NextResponse } from 'next/server';

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  // Do not start the server without the key in production; in dev it's optional
  console.warn('RESEND_API_KEY is not set. Invitation emails will fail.');
}

const resend = new Resend(resendApiKey || '');

export async function POST(request: Request) {
  try {
    const { to, username, projectName, invitedByUsername, projectId, role } =
      await request.json();

    const origin = request.headers.get('origin') || '';

    const { data, error } = await resend.emails.send({
      from: 'ProjeX <noreply@mrshadrack.com>',
      to,
      subject: `Invitación para unirse al proyecto ${projectName}`,
      react: InviteUserEmail({
        username,
        projectName,
        invitedByUsername,
        inviteLink: `${origin}/invites/${projectId}?role=${role}`,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
