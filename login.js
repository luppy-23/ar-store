import {makeSession,sessionCookie} from "../../_utils/auth.js";
function json(d,s=200,h={}){return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...h}})}
export async function onRequestPost({request,env}){
 try{
  const {password}=await request.json();
  if(!env.OWNER_PASSWORD||!env.OWNER_SESSION_SECRET)return json({error:"Owner secret belum dikonfigurasi di Cloudflare."},503);
  if(typeof password!=="string"||password!==env.OWNER_PASSWORD)return json({error:"Password owner salah."},401);
  const token=await makeSession(env.OWNER_SESSION_SECRET);
  return json({ok:true},200,{ "Set-Cookie":sessionCookie(token) });
 }catch{return json({error:"Login gagal."},400)}
}
