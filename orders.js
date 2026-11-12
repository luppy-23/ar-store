import {isOwner} from "../../_utils/auth.js";
function json(d,s=200){return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}})}
export async function onRequestGet({request,env}){
 if(!await isOwner(request,env.OWNER_SESSION_SECRET||""))return json({error:"Silakan login sebagai owner."},401);
 const {results}=await env.DB.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT 200").all();
 return json({orders:results});
}
export async function onRequestPatch({request,env}){
 if(!await isOwner(request,env.OWNER_SESSION_SECRET||""))return json({error:"Silakan login sebagai owner."},401);
 const b=await request.json(), id=String(b.id||"").trim(), status=String(b.status||"");
 const allowed=["Menunggu Pembayaran","Pembayaran Diterima","Diproses","Selesai","Dibatalkan"];
 if(!id||!allowed.includes(status))return json({error:"Data status tidak valid."},400);
 const result=await env.DB.prepare("UPDATE orders SET status=? WHERE id=?").bind(status,id).run();
 if(!result.meta.changes)return json({error:"Transaksi tidak ditemukan."},404);
 return json({ok:true,id,status});
}
