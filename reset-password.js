import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';
const base='https://rffuphwifxhngizzgdol.supabase.co';
// Chave pública (anon), não uma service_role key. Configurar a chave real antes de ativar.
const publicAnonKey='REPLACE_WITH_SUPABASE_PUBLISHABLE_OR_ANON_KEY';
const msg=document.getElementById('msg'),button=document.getElementById('save');
const report=(s)=>{msg.textContent=s};
if(publicAnonKey.startsWith('REPLACE_')){report('Página ainda em configuração. Não é possível alterar a palavra-passe.');}
else {
const supabase=createClient(base,publicAnonKey,{auth:{detectSessionInUrl:true,persistSession:false,autoRefreshToken:false}});
const fragment=new URLSearchParams(location.hash.slice(1));
const query=new URLSearchParams(location.search);
if(fragment.get('type')==='recovery'&&fragment.get('access_token')&&fragment.get('refresh_token')){
 const {error}=await supabase.auth.setSession({access_token:fragment.get('access_token'),refresh_token:fragment.get('refresh_token')});
 if(error)report('Ligação inválida ou expirada. Pede um novo email de recuperação.');
 else {history.replaceState(null,'',location.pathname);button.disabled=false;report('Ligação validada. Introduz uma nova palavra-passe.');}
}else if(query.get('token_hash')&&query.get('type')==='recovery'){
 const {error}=await supabase.auth.verifyOtp({token_hash:query.get('token_hash'),type:'recovery'});
 if(error)report('Ligação inválida ou expirada.');
 else {history.replaceState(null,'',location.pathname);button.disabled=false;report('Ligação validada. Introduz uma nova palavra-passe.');}
}else report('Esta página requer uma ligação de recuperação válida.');
button.addEventListener('click',async()=>{const p=document.getElementById('pw').value,c=document.getElementById('confirm').value;if(p.length<8||p!==c){report('Confirma a palavra-passe (mínimo 8 caracteres).');return;}button.disabled=true;const {error}=await supabase.auth.updateUser({password:p});if(error){report('Não foi possível alterar a palavra-passe: '+error.message);button.disabled=false;return;}await supabase.auth.signOut();report('Palavra-passe atualizada. Já podes iniciar sessão no COLOR RUSH.');});
}