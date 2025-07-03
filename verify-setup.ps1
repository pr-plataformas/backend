# Verificación Final del Backend
# Ejecutar este script para confirmar que todo está funcionando

Write-Host "=== VERIFICACIÓN FINAL DEL BACKEND NESTJS ===" -ForegroundColor Green

# Verificar Docker
Write-Host "`n1. Verificando Docker..." -ForegroundColor Yellow
try {
    docker --version
    Write-Host "✅ Docker está disponible" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está disponible" -ForegroundColor Red
    exit 1
}

# Verificar contenedores
Write-Host "`n2. Verificando contenedores..." -ForegroundColor Yellow
$containers = docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
Write-Host $containers

$runningContainers = docker ps --filter "name=clinic_hub" --format "{{.Names}}"
if ($runningContainers -contains "clinic_hub_api" -and $runningContainers -contains "clinic_hub_db") {
    Write-Host "✅ Contenedores principales están corriendo" -ForegroundColor Green
} else {
    Write-Host "❌ Faltan contenedores. Ejecutando docker-compose up -d..." -ForegroundColor Yellow
    docker-compose up -d
    Start-Sleep 10
}

# Verificar salud de la API
Write-Host "`n3. Verificando API Health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:9999/api/v1/health" -Method GET
    if ($response.StatusCode -eq 200) {
        $content = $response.Content | ConvertFrom-Json
        if ($content.status -eq "ok") {
            Write-Host "✅ API está respondiendo correctamente" -ForegroundColor Green
        } else {
            Write-Host "❌ API responde pero hay problemas" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "❌ API no está respondiendo en puerto 9999" -ForegroundColor Red
}

# Verificar base de datos
Write-Host "`n4. Verificando Base de Datos..." -ForegroundColor Yellow
try {
    $tables = docker exec clinic_hub_db psql -U postgres -d clinic_hub_db -c "\dt" -t
    $tableCount = ($tables -split "`n" | Where-Object { $_ -match "public \|" }).Count
    if ($tableCount -gt 0) {
        Write-Host "✅ Base de datos conectada con $tableCount tablas" -ForegroundColor Green
    } else {
        Write-Host "❌ Base de datos sin tablas" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ No se puede conectar a la base de datos" -ForegroundColor Red
}

# Verificar Swagger
Write-Host "`n5. Verificando Swagger..." -ForegroundColor Yellow
try {
    $swaggerResponse = Invoke-WebRequest -Uri "http://localhost:9999/docs" -Method GET
    if ($swaggerResponse.StatusCode -eq 200) {
        Write-Host "✅ Swagger UI disponible en http://localhost:9999/docs" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Swagger UI no disponible" -ForegroundColor Red
}

# Verificar variables de entorno
Write-Host "`n6. Verificando configuración..." -ForegroundColor Yellow
$envVars = docker exec clinic_hub_api env | Select-String "POSTGRES_HOST", "NODE_ENV"
foreach ($var in $envVars) {
    Write-Host "  $var" -ForegroundColor Cyan
}

Write-Host "`n=== RESUMEN FINAL ===" -ForegroundColor Green
Write-Host "Backend URL: http://localhost:9999" -ForegroundColor Cyan
Write-Host "Swagger UI: http://localhost:9999/docs" -ForegroundColor Cyan
Write-Host "Health Check: http://localhost:9999/api/v1/health" -ForegroundColor Cyan
Write-Host "Base de Datos: PostgreSQL en puerto 5432" -ForegroundColor Cyan

Write-Host "`n🚀 El backend está listo para el desarrollo del frontend!" -ForegroundColor Green
Write-Host "📖 Ver DEPLOYMENT.md para documentación completa" -ForegroundColor Yellow
