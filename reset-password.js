// COLOR RUSH — Supabase password recovery via direct Auth REST API.
// Public publishable key only. Never use service_role or a secret key in browser code.
const BASE='https://rffuphwifxhngizzgdol.supabase.co';
const PUBLIC_KEY='sb_publishable_G48ZjciOAgzrHFJhK-7hqQ_nnjmVyg8';
const msg=document.getElementById('msg');
const button=document.getElementById('save');
const report=text=>{msg.textContent=text};
let accessToken='';
const request=async(path,body,token='')=>{
 const resp=await fetch(BASE+'/auth/v1/'+path,{method:'POST',headers:{'apikey':PUBLIC_KEY,'Content-Type':'application/json',...(token?{'Authorization':'Bearer '+token}:{})},body:JSON.stringify(body),cache:'no-store',referrerPolicy:'no-referrer'});
 const result=await resp.json().catch(()=>({}));
 if(!resp.ok)throw Error(result.error_description||result.msg||result.message||result.error||'HTTP '+resp.status);
 return result;
};
const clearSensitiveUrl=()=>history.replaceState(null,'',location.pathname);
async function verifyRecovery(){
 const frag=new URLSearchParams(location.hash.substring(1));
 const query=new URLSearchParams(location.search);
 // Supported implicit recovery URL: #access_token=...&refresh_token=...&type=recovery
 if(frag.get('type')==='recovery'&&frag.get('access_token')){
  accessToken=frag.get('access_token');
  clearSensitiveUrl();
 }else if(query.get('type')==='recovery'&&query.get('token_hash')){
  // Alternative email templates that link directly with token_hash.
  const data=await request('verify',{type:'recovery',token_hash:query.get('token_hash')});
  accessToken=data.access_token||'';
  clearSensitiveUrl();
 }else{
  clearSensitiveUrl();
  report('Ligação inválida, expirada ou incompatível. Pede uma nova recuperação no jogo. / Invalid or expired link; request another one in the game.');
  return;
 }
 if(!accessToken)throw Error('Não foi possível obter uma sessão válida.');
 const r=await fetch(BASE+'/auth/v1/user',{headers:{'apikey':PUBLIC_KEY,'Authorization':'Bearer '+accessToken},cache:'no-store',referrerPolicy:'no-referrer'});
 if(!r.ok)throw Error('A sessão expirou. Pede um novo email.');
 button.disabled=false;
 report('Ligação validada. Escolhe uma nova palavra-passe. / Verified. Choose a new password.');
}
try{await verifyRecovery();}catch(e){accessToken='';button.disabled=true;clearSensitiveUrl();report(e.message)}
button.addEventListener('click',async()=>{
 if(!accessToken)return;
 const password=document.getElementById('pw').value;
 const confirmation=document.getElementById('confirm').value;
 if(password.length<8||password!==confirmation){report('A palavra-passe deve ter pelo menos 8 caracteres e coincidir nos dois campos.');return;}
 button.disabled=true;
 try{
  const resp=await fetch(BASE+'/auth/v1/user',{method:'PUT',headers:{'apikey':PUBLIC_KEY,'Authorization':'Bearer '+accessToken,'Content-Type':'application/json'},body:JSON.stringify({password}),cache:'no-store',referrerPolicy:'no-referrer'});
  const result=await resp.json().catch(()=>({}));
  if(!resp.ok)throw Error(result.error_description||result.msg||result.message||'Erro na atualização.');
  // Revoke the web recovery session after use; the player can log in from the game.
  await fetch(BASE+'/auth/v1/logout',{method:'POST',headers:{'apikey':PUBLIC_KEY,'Authorization':'Bearer '+accessToken},referrerPolicy:'no-referrer'}).catch(()=>{});
  accessToken='';document.getElementById('pw').value='';document.getElementById('confirm').value='';
  report('Palavra-passe atualizada. Volta ao COLOR RUSH e inicia sessão. / Password updated. Sign in to COLOR RUSH.');
 }catch(e){button.disabled=false;report(e.message)}
});
