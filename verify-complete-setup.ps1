#!/usr/bin/env pwsh

Write-Host "=== Verificación Completa del Backend ===" -ForegroundColor Green
Write-Host ""

# Verificar si el servidor está corriendo
Write-Host "1. Verificando si el servidor está corriendo..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:9999/api/v1/health/status" -Method GET -TimeoutSec 5
    $status = $response.Content | ConvertFrom-Json
    Write-Host "   ✓ Servidor corriendo en puerto 9999" -ForegroundColor Green
    Write-Host "   ✓ Ambiente: $($status.environment)" -ForegroundColor Green
    Write-Host "   ✓ Base de datos: $($status.database)" -ForegroundColor Green
    Write-Host "   ✓ Firebase configurado: $($status.firebase.configured)" -ForegroundColor $(if($status.firebase.configured) {"Green"} else {"Red"})
    if ($status.firebase.projectId -ne "not configured") {
        Write-Host "   ✓ Firebase Project ID: $($status.firebase.projectId)" -ForegroundColor Green
    }
    $serverRunning = $true
    $firebaseConfigured = $status.firebase.configured
} catch {
    Write-Host "   ✗ Error: Servidor no está corriendo o no responde" -ForegroundColor Red
    Write-Host "   Ejecuta: npm run start:dev" -ForegroundColor Yellow
    $serverRunning = $false
    $firebaseConfigured = $false
}

Write-Host ""

if ($serverRunning) {
    # Verificar CORS
    Write-Host "2. Verificando CORS..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:9999/api/v1/health/cors-test" -Method GET -TimeoutSec 5
        Write-Host "   ✓ CORS configurado correctamente" -ForegroundColor Green
    } catch {
        Write-Host "   ✗ Error en CORS: $($_.Exception.Message)" -ForegroundColor Red
    }

    Write-Host ""
}

# Verificar variables de entorno críticas
Write-Host "3. Verificando variables de entorno..." -ForegroundColor Yellow
$env_file = ".env.local"
if (Test-Path $env_file) {
    $env_content = Get-Content $env_file
    $required_vars = @("APP_PORT", "POSTGRES_DB", "POSTGRES_USER", "POSTGRES_PASSWORD", "ACCESS_JWT_SECRET", "REFRESH_JWT_SECRET")
    $firebase_vars = @("FIREBASE_PROJECT_ID", "FIREBASE_PRIVATE_KEY", "FIREBASE_CLIENT_EMAIL")
    
    foreach ($var in $required_vars) {
        if ($env_content -like "*$var=*" -and -not ($env_content -like "*$var=your-*")) {
            Write-Host "   ✓ $var configurado" -ForegroundColor Green
        } else {
            Write-Host "   ✗ $var no configurado o usando valor por defecto" -ForegroundColor Red
        }
    }
    
    Write-Host "   Firebase Variables:" -ForegroundColor Cyan
    foreach ($var in $firebase_vars) {
        if ($env_content -like "*$var=*" -and -not ($env_content -like "*$var=your-*")) {
            Write-Host "   ✓ $var configurado" -ForegroundColor Green
        } else {
            Write-Host "   ✗ $var no configurado - REQUERIDO para autenticación" -ForegroundColor Red
        }
    }
} else {
    Write-Host "   ✗ Archivo .env.local no encontrado" -ForegroundColor Red
}

Write-Host ""

# Verificar base de datos
Write-Host "4. Verificando conexión a base de datos..." -ForegroundColor Yellow
try {
    docker exec clinic_hub_db psql -U postgres -d clinic_hub_db -c "\dt" | Out-Null
    Write-Host "   ✓ Conexión a PostgreSQL exitosa" -ForegroundColor Green
    
    # Verificar tabla users
    $tables_output = docker exec clinic_hub_db psql -U postgres -d clinic_hub_db -c "\d users" 2>$null
    if ($tables_output -like "*Table*users*") {
        Write-Host "   ✓ Tabla 'users' existe" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Tabla 'users' no existe" -ForegroundColor Red
    }
} catch {
    Write-Host "   ✗ Error conectando a la base de datos" -ForegroundColor Red
}

Write-Host ""

# Resumen y próximos pasos
Write-Host "=== RESUMEN Y PRÓXIMOS PASOS ===" -ForegroundColor Green
Write-Host ""

if ($firebaseConfigured) {
    Write-Host "✓ Backend funcionando correctamente" -ForegroundColor Green
    Write-Host "✓ Firebase configurado" -ForegroundColor Green
    Write-Host ""
    Write-Host "PRÓXIMOS PASOS:" -ForegroundColor Cyan
    Write-Host "1. El frontend debería poder autenticarse sin problemas" -ForegroundColor White
    Write-Host "2. Usar emails institucionales UCN (@ucn.cl, @alumnos.ucn.cl, @ce.ucn.cl)" -ForegroundColor White
    Write-Host "3. Endpoints disponibles:" -ForegroundColor White
    Write-Host "   - POST /api/v1/auth/login (con token Firebase)" -ForegroundColor Gray
    Write-Host "   - GET /api/v1/health/status" -ForegroundColor Gray
    Write-Host "   - GET /api/v1/health" -ForegroundColor Gray
} else {
    Write-Host "⚠ Backend funciona pero Firebase no está configurado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "CONFIGURACIÓN PENDIENTE:" -ForegroundColor Red
    Write-Host "1. Configurar variables de Firebase en .env.local" -ForegroundColor White
    Write-Host "2. Ver instrucciones en: setup-firebase.md" -ForegroundColor White
    Write-Host "3. Reiniciar servidor después de configurar" -ForegroundColor White
}

Write-Host ""
Write-Host "Para más detalles, revisa: setup-firebase.md" -ForegroundColor Cyan
