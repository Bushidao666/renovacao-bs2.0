# Founder Members – Setup de Produção (Supabase + Edge Function)

Este guia descreve como publicar o endpoint da Edge Function como público (sem JWT) para uso via N8N e como preparar as variáveis/infra necessárias.

## Visão Geral
- Tabela: `public.founder_members` (relacionada a `public.leads` via e-mail)
- View: `public.founder_mugs_remaining` com `{ remaining, purchased, total }` (total fixo: 100)
- RPC: `public.upsert_founder_member(...)` (security definer, upsert atômico com limite de 100)
- Edge Function: `founder-members`
  - `GET`: retorna contador `{ remaining, purchased, total }`
  - `POST`: recebe `{ nome, email, telefone?, compra?, valor_compra?, purchase_metadata?, purchased_at? }`, cruza/cria `lead` e insere/atualiza em `founder_members`

## Tornar a Edge Function Pública (sem JWT)
Você tem duas formas equivalentes. Recomendo a (A) com arquivo de configuração.

### A) Config via arquivo (recomendado)
1. Arquivo criado no repositório: `supabase/config.toml`
   ```toml
   [functions.founder-members]
   verify_jwt = false
   ```
2. Deploy da função com a CLI (local ou CI):
   ```bash
   supabase functions deploy founder-members --project-ref hhagsydidweninjvbeae
   ```
   Observação: a CLI lerá o `config.toml` e desativará o `verify_jwt` para esta função.

### B) Flag via CLI
```bash
supabase functions deploy founder-members --project-ref hhagsydidweninjvbeae --no-verify-jwt
```

Após o deploy, a URL pública fica disponível em:
```
https://hhagsydidweninjvbeae.functions.supabase.co/founder-members
```

## Variáveis/Segredos (Supabase – Edge Functions)
Defina os segredos para a função no ambiente do Supabase (Dashboard ou CLI):
- `SUPABASE_URL` (geralmente já injetado automaticamente)
- `SUPABASE_ANON_KEY` (já injetado automaticamente)
- `SUPABASE_SERVICE_ROLE_KEY` (recomendado)
  - Usado pela função para realizar operações administrativas com segurança e flexibilidade. Embora a RPC com `security definer` permita escrever sem SRK, mantê-lo configurado simplifica futuras evoluções.

Via CLI:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=xxxxxxxxx --project-ref hhagsydidweninjvbeae
```

## Permissões do Banco
Já configurado:
- `founder_members` com RLS ativo
- View `founder_mugs_remaining` com `GRANT SELECT TO anon, authenticated`
- RPC `upsert_founder_member` com `GRANT EXECUTE TO anon, authenticated`

## Endpoints (para N8N)
- GET Contador
  - Método: `GET`
  - URL: `https://hhagsydidweninjvbeae.functions.supabase.co/founder-members`
  - Resposta 200:
    ```json
    { "remaining": 97, "purchased": 3, "total": 100 }
    ```

- POST Registrar compra
  - Método: `POST`
  - URL: `https://hhagsydidweninjvbeae.functions.supabase.co/founder-members`
  - Headers: `Content-Type: application/json`
  - Body (JSON):
    ```json
    {
      "nome": "Fulano da Silva",
      "email": "fulano@example.com",
      "telefone": "+55 11 99999-9999",
      "compra": "Renovação BS Society",
      "valor_compra": 497.00,
      "purchase_metadata": { "gateway": "stripe", "tx": "tx_123" },
      "purchased_at": "2025-08-12T12:00:00.000Z"
    }
    ```
  - Respostas:
    - 201: sucesso (`{ member_id, purchased, remaining, total }`)
    - 409: duplicado (e-mail já registrado) ou limite atingido (100)
    - 400: payload inválido
    - 500: erro interno

## Dicas para o N8N
- Use o nó HTTP Request
  - GET: sem body
  - POST: `Content-Type: application/json` + body JSON conforme acima
- Se desejar proteger ainda mais o endpoint público, você pode configurar uma `x-api-key` simples na função e exigir no header (opcional). Fale comigo que adiciono rapidamente.

## Front-end (LP)
- A LP já consome `/api/founder-members` (rota Next pública que faz proxy). Com a função pública, você também pode chamar direto a URL da função, se preferir.
- Variáveis (Next):
  - `NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL=https://hhagsydidweninjvbeae.functions.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...` (opcional para chamadas diretas da função; a rota `/api` não requer no cliente)

## Troubleshooting
- 401/403: confirme `verify_jwt = false` no deploy (config.toml/flag) e redeploy
- 409: limite 100 atingido ou e-mail já registrado
- 500: ver logs da função e conferir a RPC `upsert_founder_member`
- Permissão RPC: verifique `GRANT EXECUTE` para `anon`

## Comandos úteis (CLI)
```bash
# Login e link
supabase login
supabase link --project-ref hhagsydidweninjvbeae

# Secrets
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=xxxxxxxxx

# Deploy com config.toml (público)
supabase functions deploy founder-members

# Alternativa: sem JWT por flag
supabase functions deploy founder-members --no-verify-jwt

# Logs rápidos (local serve)
supabase functions serve founder-members --no-verify-jwt
```

---
Em caso de dúvidas ou se quiser adicionar `x-api-key`/rate-limit, posso ajustar a função em minutos.
