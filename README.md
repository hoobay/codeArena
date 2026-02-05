# codeArena

Projet scolaire – annee 2

Authentification simple avec Supabase  
Login / Register / Logout

## Stack

- JavaScript
- React (Vite)
- Express
- Supabase (Auth + PostgreSQL)

## Docs utilisees

- Supabase Auth  
  https://supabase.com/docs/guides/auth
  https://www.npmjs.com/package/@supabase/supabase-js?activeTab=readme

- Supabase JS Client  
  https://supabase.com/docs/reference/javascript/introduction

- Supabase RLS 
  https://supabase.com/docs/guides/database/postgres/row-level-security

- React Router  
  https://reactrouter.com/en/main

- Express  
  https://expressjs.com/

- GitHub
  https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github

- Status error codes
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

- Vite guide
  https://vite.dev/guide/

## Lancer le projet

Attention: Backend et frontend ont chacun leur fichier `.env`. 

Exemple de .env dans frontend:
VITE_SUPABASE_URL=https://votre_url.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase

Exemple de .env dans backend: 
PORT=3000
SUPABASE_URL=https://votre_url.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service
SUPABASE_JWT_SECRET=votre_token_jwt_supabase

Pour lancer: 
cd .\backend\
npm start

cd .\frontend\
npm run dev

## DB SUPABASE
table users:

CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

trigger (IMPORTANT):

begin
  insert into public.users (id, email, username)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'username', 'anonymous')
  );

  insert into public.scores (user_id, total_points)
  values (new.id, 0);

  return new;
end;
