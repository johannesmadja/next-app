SQLite est bien pris en charge par Prisma. La page d'installation met simplement PostgreSQL et MySQL en avant, mais il existe une page dédiée à SQLite dans la documentation (*Databases → SQLite*).

Avant de commencer, un point important : la version que `npm create prisma@latest` installe aujourd'hui est la **8.0.0-rc.28**, une version de test. La dernière version stable est la **7.10.1**. Je te conseille de rester sur la 7. Prisma 7 a beaucoup changé depuis ta formation, donc voici l'installation complète pour SQLite.

### 1. Installer les paquets
```bash
npm install -D prisma@7
npm install @prisma/client@7 @prisma/adapter-better-sqlite3 dotenv
```
- `@prisma/adapter-better-sqlite3` est le **pilote SQLite**. Depuis Prisma 7, on doit installer soi-même le pilote de sa base de données ; Prisma ne l'inclut plus.
- `dotenv` sert à lire le fichier `.env` dans `prisma.config.ts`.

### 2. Initialiser Prisma avec SQLite
```bash
npx prisma init --datasource-provider sqlite --output ../src/generated/prisma
```
Cette commande crée :
- `prisma/schema.prisma` ;
- `prisma.config.ts` : **nouveau dans Prisma 7**, c'est là que va désormais l'URL de la base ;
- une variable `DATABASE_URL="file:./dev.db"` dans `.env`. La base sera un simple fichier `dev.db`, sans serveur à installer.

Le `schema.prisma` généré ressemble à ceci. Le `datasource` n'a plus de `url` :
```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "sqlite"
}
```

### 3. Créer le client Prisma dans `src/lib/prisma.js`
```js
import "server-only";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis;

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```
Le passage par `globalThis` évite un problème en mode dev : sans lui, chaque rechargement à chaud de Next créerait un nouveau client Prisma, donc une nouvelle connexion à la base.

### 4. Créer ta base
Ajoute tes modèles dans `schema.prisma`, puis lance :
```bash
npx prisma migrate dev --name init
```
Cette commande crée `dev.db` et génère le client Prisma.

### Quelques pièges
- **Le `.env`** : la commande `init` ajoute `DATABASE_URL` à ton `.env` existant. N'oublie pas de l'ajouter aussi dans `.env.development.local`, le fichier utilisé par `npm run dev`. Sinon, en dev, `process.env.DATABASE_URL` sera vide.
- **Git** : ajoute `dev.db` et `src/generated/` à ton `.gitignore`.
- **`prisma.config.ts` est en TypeScript**, alors que ton projet est en JavaScript. C'est normal et ça ne pose pas de problème : la commande `prisma` le lit toute seule.

Tu veux que je fasse l'installation et que je vérifie qu'une première requête fonctionne ? Je n'ai pas encore lancé ces commandes ; j'ai seulement vérifié que les versions existent sur npm.


Après chaque modification de `schema.prisma`, tu lances **deux commandes** :

```bash
npx prisma migrate dev --name ce_que_tu_as_change
npx prisma generate
```

**1. `migrate dev`** applique la modification à ta base. La commande écrit le SQL dans `prisma/migrations/`, puis l'exécute sur `dev.db`. Après `--name`, mets un nom court qui décrit le changement, par exemple `add_title_to_movie_like`. Si Prisma te pose une question, lis-la et réponds `y`.

**2. `generate`** met à jour le code que ton application utilise pour accéder à la base, par exemple `prisma.movieLike.create(...)`. Si tu oublies cette commande, la base aura bien changé, mais ton code ne connaîtra pas encore la modification.

Tu peux vérifier le résultat avec `npm run studio`.

Ce que j'ai fait tout à l'heure avec `migrate diff` et `migrate deploy` ne te concerne pas : c'était seulement parce que mon terminal ne peut pas répondre aux questions de Prisma.
```

**Pour générer une secretKey 
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
