# Fundamentos de Redes — Landing Page

Landing page educativa sobre puertos lógicos, protocolos y el modelo OSI, con un formulario de contacto. Front en React (Vite + TypeScript + Tailwind CSS) y backend separado en Node.js (Express + TypeScript).

## Estructura

```
front/   # React + Vite + TypeScript + Tailwind CSS + i18next
back/    # Node.js + Express + TypeScript + MySQL
docker-compose.yml   # MySQL local para desarrollo
```

## Requisitos

- Node.js 18+
- MySQL (local vía `docker-compose.yml`, o el servidor MySQL de la universidad en producción)

## Cómo se sirven las imágenes

Las imágenes **no están en el repositorio del front**. Cada sección (`logical-ports`, `protocols`, `osi-model`) tiene una fila en la tabla `images` con la ruta del archivo en el servidor FTP de la universidad. El front pide la imagen a `GET /api/images/:topic`, y el backend la trae desde el FTP (o desde una carpeta local en desarrollo) y la transmite al navegador.

Mientras no haya credenciales FTP reales, el backend usa `STORAGE_DRIVER=local` y lee de `back/storage/`. Cuando el profesor entregue el acceso FTP, solo hay que completar las variables `FTP_*` en `back/.env` y cambiar `STORAGE_DRIVER=ftp` — no se toca código.

## Levantar el proyecto en local

### 1. Base de datos

```bash
docker compose up -d
```

### 2. Backend

```bash
cd back
cp .env.example .env   # ajustar DB_PORT=3307 si usas el docker-compose de este repo
npm install
npm run migrate         # crea las tablas (idempotente, seguro de volver a correr)
npm run seed            # carga los datos iniciales de `images`
npm run dev             # http://localhost:4000
```

Coloca imágenes de prueba (`logical-ports.png`, `protocols.png`, `osi-model.png`) en `back/storage/` mientras `STORAGE_DRIVER=local`.

### 3. Frontend

```bash
cd front
cp .env.example .env
npm install
npm run dev             # http://localhost:5173
```

## Endpoints del backend

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Chequeo de salud |
| GET | `/api/images/:topic` | Imagen de una sección (`logical-ports`, `protocols`, `osi-model`) |
| POST | `/api/contact` | Guarda un mensaje de contacto |

## Despliegue en Windows Server 2019

El servidor de la universidad corre Windows Server 2019 (con DHCP, Active Directory y DNS ya configurados). En Windows, en vez de Nginx como reverse proxy, la forma más simple y confiable es que **un solo proceso Node sirva tanto el front compilado como el API**, evitando tener que configurar IIS con los módulos ARR/URL Rewrite.

### 1. Preparar el servidor

- Instalar [Node.js LTS](https://nodejs.org) (instalador `.msi`).
- Instalar MySQL Community Server para Windows (MySQL Installer), y confirmar que el servicio "MySQL80" quede iniciado automáticamente (Services / `services.msc`).
- Copiar el proyecto al servidor (por ejemplo con `git clone`, o vía una carpeta compartida/`scp` si tienen OpenSSH habilitado).

### 2. Compilar el frontend y "unirlo" al backend

```powershell
cd front
# En producción, dejar VITE_API_URL vacío para que el front use rutas relativas
# (/api/...) y funcione sin importar con qué IP o nombre DNS se acceda al server.
echo VITE_API_URL= > .env
npm install
npm run build
```

Copiar el contenido de `front/dist/` dentro de `back/public/` (esa carpeta la sirve Express automáticamente — ver `back/src/app.ts`):

```powershell
xcopy /E /I /Y front\dist back\public
```

### 3. Configurar y compilar el backend

```powershell
cd back
copy .env.example .env
```

Editar `back/.env` con los valores reales del servidor:
- `DB_HOST=localhost`, credenciales reales de MySQL.
- `STORAGE_DRIVER=ftp` + `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `FTP_BASE_DIR` (cuando el profesor entregue el acceso).
- `CORS_ORIGIN` ya no es crítico si front y back quedan en el mismo origen/puerto, pero déjalo con la URL/IP final del sitio.
- `PORT=4000` (o el puerto que decidan abrir en el firewall).

```powershell
npm install
npm run build
```

Crear las tablas y cargar los datos iniciales:

```powershell
npm run migrate
npm run seed
```

(Actualizar `remote_path` en `images` con los nombres reales de archivo en el FTP — puedes editar `back/src/db/seeds/001_images.sql` y volver a correr `npm run seed`, ya que es idempotente.)

### 4. Dejarlo corriendo como servicio (para que sobreviva reinicios)

PM2 funciona en Windows y es la forma más simple de mantener el proceso vivo:

```powershell
npm install -g pm2 pm2-windows-startup
pm2-startup install
cd back
pm2 start dist/server.js --name redes-app
pm2 save
```

Con esto, `redes-app` queda corriendo en segundo plano y se vuelve a levantar automáticamente si el servidor se reinicia.

### 5. Firewall y DNS (aprovechando lo que ya configuraron)

- **Firewall de Windows**: abrir el puerto donde escucha Node (ej. 4000, o cambiar `PORT=80` en `.env` para no tener que especificar puerto en la URL):
  ```powershell
  New-NetFirewallRule -DisplayName "Redes Landing HTTP" -Direction Inbound -Protocol TCP -LocalPort 4000 -Action Allow
  ```
- **DNS interno (Active Directory)**: ya que tienen su propio DNS, lo más limpio es crear un registro A (ej. `redes.tudominio.local`) apuntando a la IP del servidor, para que cualquiera en la red de la universidad entre por nombre en vez de por IP.
- **Acceso desde fuera de la universidad**: si además de la red interna quieren que la página sea visible desde internet, eso depende de la configuración de NAT/borde de la red universitaria (IP pública, port forwarding), que es una decisión de la infraestructura general, no de esta aplicación — conviene consultarlo con quien administre el firewall perimetral.

### 6. Verificar

Desde otro equipo de la red, abrir `http://redes.tudominio.local:4000` (o el puerto que hayan elegido) y confirmar que carga la landing, las imágenes y que el formulario de contacto guarda datos en MySQL.

## Migraciones de base de datos

El esquema se versiona con un runner de migraciones minimalista (sin ORM): cada archivo en `back/src/db/migrations/` es un cambio numerado (`001_...`, `002_...`), y `npm run migrate` los aplica en orden, registrando cuáles ya corrieron en una tabla `schema_migrations` para no repetirlos. Para agregar un cambio de esquema en el futuro, solo se crea un nuevo archivo `003_algo.sql` y se corre `npm run migrate` de nuevo — tanto en local como en el servidor de la universidad.

`back/src/db/seeds/` contiene datos iniciales (no cambios de esquema); `npm run seed` los aplica y es seguro de correr varias veces.

## Contenido de texto

El texto de las 3 secciones vive en `front/src/i18n/es.json` (no en la base de datos), ya que es contenido editorial fijo — la BD solo guarda lo genuinamente dinámico: metadata de imágenes y mensajes de contacto.
