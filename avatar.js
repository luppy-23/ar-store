export async function onRequestGet({ request }) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8"
  };
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    if (!userId || !/^\d{1,20}$/.test(userId)) {
      return new Response(JSON.stringify({ error: "Invalid userId" }), { status: 400, headers });
    }
    const endpoint = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${encodeURIComponent(userId)}&size=150x150&format=Png&isCircular=false`;
    const upstream = await fetch(endpoint);
    return new Response(await upstream.text(), { status: upstream.status, headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Avatar lookup failed" }), { status: 502, headers });
  }
}
