export async function onRequestPost({ request }) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8"
  };
  try {
    const body = await request.json();
    if (!Array.isArray(body.usernames) || body.usernames.length !== 1 ||
        typeof body.usernames[0] !== "string" || body.usernames[0].length > 20) {
      return new Response(JSON.stringify({ error: "Invalid username" }), { status: 400, headers });
    }
    const upstream = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usernames: [body.usernames[0]],
        excludeBannedUsers: true
      })
    });
    return new Response(await upstream.text(), { status: upstream.status, headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Profile lookup failed" }), { status: 502, headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
