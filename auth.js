const COOKIE = "ar_owner_session";
const enc = new TextEncoder();
function b64(bytes){return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
async function sign(payload, secret){
 const key=await crypto.subtle.importKey("raw",enc.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 return b64(await crypto.subtle.sign("HMAC",key,enc.encode(payload)));
}
export async function makeSession(secret){
 const payload=String(Date.now()+8*60*60*1000);
 return payload+"."+await sign(payload,secret);
}
export async function isOwner(request,secret){
 const raw=(request.headers.get("Cookie")||"").split(";").map(x=>x.trim()).find(x=>x.startsWith(COOKIE+"="))?.slice(COOKIE.length+1);
 if(!raw)return false;
 const [payload,sig]=raw.split(".");
 if(!payload||!sig||Number(payload)<Date.now())return false;
 return (await sign(payload,secret))===sig;
}
export function sessionCookie(value){
 return `${COOKIE}=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`;
}
export function clearCookie(){return `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;}
