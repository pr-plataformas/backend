# Verificacion Final del Backend
Write-Host "=== VERIFICACION FINAL DEL BACKEND NESTJS ===" -ForegroundColor Green

# Verificar contenedores
Write-Host "`n1. Verificando contenedores..." -ForegroundColor Yellow
docker ps --filter "name=clinic_hub"

# Verificar salud de la API
Write-Host "`n2. Verificando API Health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:9999/api/v1/health" -Method GET
    if ($response.StatusCode -eq 200) {
        Write-Host "API esta respondiendo correctamente" -ForegroundColor Green
        $response.Content
    }
} catch {
    Write-Host "API no esta respondiendo en puerto 9999" -ForegroundColor Red
}

# Verificar base de datos
Write-Host "`n3. Verificando Base de Datos..." -ForegroundColor Yellow
docker exec clinic_hub_db psql -U postgres -d clinic_hub_db -c "\dt"

# Verificar variables de entorno
Write-Host "`n4. Verificando configuracion..." -ForegroundColor Yellow
docker exec clinic_hub_api env | Select-String "POSTGRES_HOST", "NODE_ENV"

Write-Host "`n=== RESUMEN FINAL ===" -ForegroundColor Green
Write-Host "Backend URL: http://localhost:9999" -ForegroundColor Cyan
Write-Host "Swagger UI: http://localhost:9999/docs" -ForegroundColor Cyan
Write-Host "Health Check: http://localhost:9999/api/v1/health" -ForegroundColor Cyan

Write-Host "`nEl backend esta listo para el desarrollo del frontend!" -ForegroundColor Green
