# Configuración de Firebase para Autenticación

## Problema Actual
El backend está devolviendo error 401 porque las variables de entorno de Firebase no están configuradas.

## Pasos para configurar Firebase:

### 1. Crear o acceder al proyecto Firebase
- Ve a [Firebase Console](https://console.firebase.google.com/)
- Crea un nuevo proyecto o accede al proyecto existente

### 2. Configurar Authentication
- En el panel de Firebase, ve a "Authentication"
- Ve a "Sign-in method"
- Habilita "Google" como proveedor de autenticación
- Configura el dominio autorizado (por ejemplo: localhost para desarrollo)

### 3. Generar Service Account Key
- Ve a "Project Settings" (icono de engranaje)
- Ve a "Service accounts"
- Selecciona "Firebase Admin SDK"
- Haz clic en "Generate new private key"
- Descarga el archivo JSON

### 4. Configurar variables de entorno
Del archivo JSON descargado, extrae los siguientes valores y actualiza el archivo `.env.local`:

```bash
# Reemplaza estos valores con los de tu archivo JSON de Firebase
FIREBASE_PROJECT_ID=tu-project-id-aqui
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ntu-private-key-aqui\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-project.iam.gserviceaccount.com
```

**Importante:** 
- El `FIREBASE_PRIVATE_KEY` debe mantener los `\n` para los saltos de línea
- No compartas estas credenciales en repositorios públicos

### 5. Configurar dominio de email institucional
El sistema actualmente solo acepta emails con dominios UCN:
- `@ucn.cl`
- `@alumnos.ucn.cl` 
- `@ce.ucn.cl`

Si necesitas modificar esta validación, edita el archivo:
`src/common/constants/ucn-email.regex.ts`

### 6. Reiniciar el servidor
Después de configurar las variables:
```powershell
npm run start:dev
```

## Verificación
Una vez configurado, los logs del servidor deberían mostrar:
- "Firebase Admin SDK initialized successfully"
- Los endpoints de auth deberían funcionar correctamente
- El frontend debería poder autenticarse sin errores 401
