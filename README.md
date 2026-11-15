# COLOR RUSH — AKOPHH

Site de apoio e preparação da publicação Android.

## Ativar GitHub Pages

No repositório, abrir **Settings → Pages → Build and deployment** e escolher **Deploy from a branch**, **main** e **/(root)**. Guardar as alterações.

O endereço esperado, depois de publicado, é:
https://catofer24-hub.github.io/color-rush/

Contacto público para suporte, privacidade e pedidos de eliminação: **catofer24@gmail.com**.

## Antes do lançamento

- Finalizar a política de privacidade: contacto, dados recolhidos, prestadores, fundamento jurídico e prazos de conservação efetivamente implementados.
- Canal externo para pedidos de eliminação divulgado: `catofer24@gmail.com`. **Confirmar receção e gestão efetiva dos pedidos**; sem ligação de email comprovada, nunca eliminar uma conta apenas com base no nome de jogador.
- Configurar o envio de emails no Supabase Auth e autorizar o endereço de redirecionamento `https://catofer24-hub.github.io/color-rush/reset-password.html`.
- Substituir a chave pública Supabase placeholder em `reset-password.js` por uma chave pública válida. **Nunca publicar a service_role key**.
- Testar recuperação completa com uma conta descartável e verificar que o jogo aceita a palavra-passe alterada.
- Verificar consentimento publicitário/Google UMP, Data Safety, segurança e eliminação efetiva antes de submeter à Google Play.

**Estado:** site de pré-publicação. As páginas não constituem uma declaração de conformidade concluída.
