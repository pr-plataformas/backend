# Script para levantar el proyecto completo

Write-Host "🚀 Iniciando proyecto Backend Videoteca Enfermería..." -ForegroundColor Green
Write-Host ""

# Verificar si Docker está corriendo
try {
    docker version | Out-Null
    Write-Host "✅ Docker está disponible" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está corriendo. Por favor inicia Docker Desktop" -ForegroundColor Red
    Read-Host "Presiona Enter para continuar cuando Docker esté listo"
}

# Instalar dependencias si no existen
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

# Levantar base de datos
Write-Host "🐘 Iniciando PostgreSQL y PgAdmin..." -ForegroundColor Yellow
docker-compose up -d

# Esperar un poco para que la DB esté lista
Write-Host "⏳ Esperando que PostgreSQL esté listo..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar conexión a la base de datos
Write-Host "🔍 Verificando conexión a la base de datos..." -ForegroundColor Yellow

# Ejecutar migraciones si existen
Write-Host "🗃️ Ejecutando migraciones..." -ForegroundColor Yellow
try {
    npm run migration:run
    Write-Host "✅ Migraciones ejecutadas correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ No hay migraciones o error al ejecutarlas" -ForegroundColor Yellow
}

# Iniciar la aplicación
Write-Host "🎯 Iniciando aplicación en modo desarrollo..." -ForegroundColor Green
Write-Host ""
Write-Host "📋 URLs útiles:" -ForegroundColor Cyan
Write-Host "   🌐 API: http://localhost:9999" -ForegroundColor White
Write-Host "   📚 Swagger: http://localhost:9999/api/docs" -ForegroundColor White
Write-Host "   🐘 PgAdmin: http://localhost:5050 (root@localhost / root)" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Yellow
Write-Host ""

npm run start:dev
