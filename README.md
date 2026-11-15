# COLOR RUSH — AKOPHH

Site de apoio e preparação da publicação Android.

## Ativar GitHub Pages

No repositório, abrir **Settings → Pages → Build and deployment** e escolher **Deploy from a branch**, **main** e **/(root)**. Guardar as alterações.

O endereço esperado, depois de publicado, é:
https://catofer24-hub.github.io/color-rush/

Contacto público para suporte, privacidade e pedidos de eliminação: **catofer24@gmail.com**.

## Antes do lançamento

- **Concluído:** contacto público e prazo técnico de 90 dias para eventos e intenções AdMob: tarefa diária `color_rush_privacy_purge_90d`, confirmada ativa no Supabase. A política de privacidade continua **provisória**, pois faltam bases jurídicas, consentimento publicitário e detalhes de fornecedores.
- Canal externo para pedidos de eliminação divulgado: `catofer24@gmail.com`. **Confirmar receção e gestão efetiva dos pedidos**; sem ligação de email comprovada, nunca eliminar uma conta apenas com base no nome de jogador.
- **Pendente no painel Supabase:** configurar serviço SMTP externo e autorizar `https://catofer24-hub.github.io/color-rush/reset-password.html` em **Authentication → URL Configuration → Redirect URLs**. O jogo 8.8 passa explicitamente esta URL no pedido de recuperação.
- **Concluído no GitHub:** `reset-password.js` contém apenas uma chave pública publishable e usa a API de Auth para verificar ligações de recuperação e alterar a palavra-passe. **Nunca publicar a service_role key**. Testes com emails verdadeiros ainda pendentes.
- Testar recuperação completa com uma conta descartável e verificar que o jogo aceita a palavra-passe alterada.
- **Concluído no código 8.8:** pedido de consentimento via Google UMP, bloqueio de anúncios sem `canRequestAds` e botão de opções de privacidade. **Pendente:** publicar a mensagem EEA em AdMob, testar num Android, confirmar Data Safety e eliminação efetiva. O modo de teste de anúncios continua intencionalmente ativo.

**Estado:** site de pré-publicação. As páginas não constituem uma declaração de conformidade concluída.
