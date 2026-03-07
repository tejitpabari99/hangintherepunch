/**
 * Vercel serverless function — email signup.
 * Adds the contact to a Resend audience and sends a welcome email.
 * Requires RESEND_API_KEY env var (and optionally RESEND_AUDIENCE_ID).
 */
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    // Add contact to Resend audience
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID || undefined,
      unsubscribed: false,
    });

    // Send welcome email
    await resend.emails.send({
      from: 'Punch Updates <updates@hangintherepunch.com>',
      to: email,
      subject: "You're part of Punch's family now 🐒",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
          <h1 style="font-size: 24px; color: #3D2B1F;">Hang in there! 🐒</h1>
          <p style="color: #3D2B1F; line-height: 1.6;">
            You just joined Punch's corner. We'll send you updates whenever something 
            big happens in Punch's journey — new friends, milestones, and moments that matter.
          </p>
          <p style="color: #8B7355; font-size: 14px; line-height: 1.5;">
            No spam. Just a little monkey making his way in the world.
          </p>
          <hr style="border: none; border-top: 1px solid #E8D4B8; margin: 24px 0;" />
          <p style="color: #8B7355; font-size: 12px;">
            <a href="https://hangintherepunch.com" style="color: #D4A052;">hangintherepunch.com</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Failed to sign up' });
  }
}
