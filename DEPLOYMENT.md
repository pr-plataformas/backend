# Guía de Despliegue - Backend NestJS

## ✅ Estado del Proyecto

El proyecto backend está **FUNCIONANDO CORRECTAMENTE** y listo para el desarrollo del frontend.

### Servicios Levantados:
- ✅ **PostgreSQL**: Corriendo en puerto 5432
- ✅ **API NestJS**: Corriendo en puerto 9999 
- ✅ **Swagger UI**: Disponible en http://localhost:9999/docs
- ✅ **Base de Datos**: `clinic_hub_db` con todas las tablas creadas

### Entidades Disponibles:
- `users` - Gestión de usuarios
- `videos` - Contenido de video
- `manuals` - Manuales con secciones, subsecciones y bloques
- `categories` - Categorización de contenido
- `video_comments` - Comentarios en videos
- `video_interactions` - Interacciones con videos (like/dislike)
- `video_reports` - Reportes de videos
- `video_bookmarks` - Marcadores de videos

## 🚀 Comandos de Inicio Rápido

### Levantar el entorno completo:
```bash
docker-compose up -d
```

### Verificar el estado:
```bash
# Ver contenedores corriendo
docker ps

# Ver logs de la aplicación
docker logs clinic_hub_api

# Verificar salud de la API
curl http://localhost:9999/api/v1/health
```

### Detener el entorno:
```bash
docker-compose down
```

## 🛠️ Configuración

### Variables de Entorno (.env.dev):
```bash
# App
APP_PORT=9999
NODE_ENV=development

# Database
POSTGRES_HOST=clinic_hub_db
POSTGRES_PORT=5432
POSTGRES_DB=clinic_hub_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=anashei

# JWT
ACCESS_JWT_SECRET=qnVZHuGCRoNMJLO7rHoPAI6qh3qgoWRVKXYhosVQxXg=
REFRESH_JWT_SECRET=JffJJJixOEEuP/W4kSNMmQMDFJ7nd1ao9AQhu1uGYf5E=
ACCESS_EXPIRES_IN=60s
REFRESH_EXPIRES_IN=5d

# AWS (configurado para desarrollo)
AWS_REGION="us-east-2"
AWS_ACCESS_KEY_ID="AKIATR4WMZAYOT525JU2"
AWS_SECRET_ACCESS_KEY="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"
AWS_S3_BUCKET_NAME="videotecaenfermeria"

# Firebase (configurado)
FIREBASE_PROJECT_ID=videoteca-enfermeria-dff21
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@videoteca-enfermeria-dff21.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="[Clave privada configurada]"
```

## 📡 Endpoints Principales

### Base URL: `http://localhost:9999/api/v1`

#### Autenticación:
- `POST /auth/login` - Login con credenciales
- `POST /auth/login-google` - Login con Google
- `POST /auth/refresh` - Renovar token

#### Usuarios:
- `GET /users/me` - Perfil del usuario actual
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `PATCH /users/:id` - Actualizar usuario

#### Videos:
- `GET /videos` - Listar videos
- `POST /videos/upload` - Subir video
- `GET /videos/:id` - Obtener video específico
- `GET /videos/:id/stream` - Stream de video

#### Manuales:
- `GET /manuals` - Listar manuales
- `POST /manuals` - Crear manual
- `POST /manuals/full` - Crear manual completo

#### Categorías:
- `GET /categories` - Listar categorías
- `POST /categories` - Crear categoría

#### Comentarios de Video:
- `GET /video-comments` - Listar comentarios
- `POST /video-comments` - Crear comentario

#### Interacciones de Video:
- `GET /video-interactions` - Listar interacciones
- `POST /video-interactions` - Crear interacción

#### Health Check:
- `GET /health` - Estado de la aplicación

### Documentación Swagger:
Accede a http://localhost:9999/docs para la documentación interactiva completa.

## 🗄️ Base de Datos

### Acceso Directo a PostgreSQL:
```bash
docker exec -it clinic_hub_db psql -U postgres -d clinic_hub_db
```

### Comandos Útiles:
```sql
-- Listar tablas
\dt

-- Ver estructura de una tabla
\d users

-- Consultar datos
SELECT * FROM users LIMIT 5;
```

### pgAdmin (Opcional):
- URL: http://localhost:5050
- Email: root@localhost
- Password: root

## 🔧 Solución de Problemas

### Si la aplicación no se conecta a la base de datos:
1. Verificar que Docker esté corriendo
2. Reiniciar los contenedores:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### Si hay problemas con las tablas:
1. Las tablas se crean automáticamente con `synchronize: true` en desarrollo
2. Para resetear la base de datos:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

### Para ver logs detallados:
```bash
# Logs de la aplicación
docker logs clinic_hub_api -f

# Logs de la base de datos
docker logs clinic_hub_db -f
```

## 🎯 Próximos Pasos para el Frontend

El backend está **COMPLETAMENTE FUNCIONAL** y listo para:

1. **Conexión desde el frontend** en http://localhost:9999
2. **Autenticación JWT** implementada
3. **Todas las entidades** disponibles via API REST
4. **Swagger** para documentación en tiempo real
5. **CORS habilitado** para desarrollo
6. **Validación de datos** con class-validator
7. **Paginación y filtros** disponibles

### Configuración recomendada para el frontend:
```javascript
// axios o fetch configuration
const API_BASE_URL = 'http://localhost:9999/api/v1';

// Headers para autenticación
const authHeaders = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};
```

¡El backend está completamente operativo y listo para el desarrollo del frontend! 🚀
