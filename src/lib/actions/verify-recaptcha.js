'use server';

export async function verifyRecaptcha(token) {
  if (!token) {
    return { success: false, message: 'No reCAPTCHA token provided.' };
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY is missing. Passing verification by default.');
    // If keys aren't configured yet, we don't want to block submissions during development/setup
    return { success: true };
  }

  try {
    const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await res.json();

    // Score is 0.0 to 1.0. Typically, > 0.5 is considered a good interaction.
    if (data.success && data.score > 0.5) {
      return { success: true, score: data.score };
    } else {
      return { success: false, message: 'reCAPTCHA verification failed. Bot behavior detected.' };
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return { success: false, message: 'Internal server error during verification.' };
  }
}
