// Vercel serverless function — POST /api/signup
// Will connect to Resend when API key is provided

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // TODO: Connect to Resend API
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.contacts.create({
    //   email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    // });

    console.log('📧 New signup:', email);

    return res.status(200).json({ success: true, message: 'Welcome to Punch\'s family!' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
