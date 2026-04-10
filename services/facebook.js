export async function postToFacebook(text, hashtags = []) {
  const message = `${text}\n\n${hashtags.join(' ')}`;

  const response = await fetch(
    `https://graph.facebook.com/v19.0/${process.env.FB_PAGE_ID}/feed`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        access_token: process.env.FB_ACCESS_TOKEN,
      }),
    }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return { id: data.id, url: `https://facebook.com/${data.id}` };
}
