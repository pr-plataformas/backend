# Script de verificación del proyecto

Write-Host "🔍 Verificando configuración del proyecto..." -ForegroundColor Green
Write-Host ""

$issues = @()
$warnings = @()

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    $issues += "❌ Node.js no está instalado"
}

# Verificar npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm: v$npmVersion" -ForegroundColor Green
} catch {
    $issues += "❌ npm no está disponible"
}

# Verificar Docker
try {
    docker version | Out-Null
    Write-Host "✅ Docker está disponible" -ForegroundColor Green
} catch {
    $issues += "❌ Docker no está corriendo"
}

# Verificar archivos de configuración
$configFiles = @(".env.dev", "package.json", "docker-compose.yaml")
foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file existe" -ForegroundColor Green
    } else {
        $issues += "❌ $file no encontrado"
    }
}

# Verificar node_modules
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
} else {
    $warnings += "⚠️ Dependencias no instaladas (ejecuta: npm install)"
}

# Verificar variables de entorno críticas
if (Test-Path ".env.dev") {
    $envContent = Get-Content ".env.dev" -Raw
    
    $requiredVars = @("POSTGRES_DB", "POSTGRES_USER", "POSTGRES_PASSWORD", "ACCESS_JWT_SECRET")
    
    foreach ($var in $requiredVars) {
        if ($envContent -match "$var=") {
            Write-Host "✅ Variable $var configurada" -ForegroundColor Green
        } else {
            $issues += "❌ Variable $var no configurada en .env.dev"
        }
    }
    
    # Verificar variables opcionales
    $optionalVars = @("FIREBASE_PROJECT_ID", "AWS_ACCESS_KEY_ID")
    foreach ($var in $optionalVars) {
        if ($envContent -match "$var=" -and $envContent -notmatch "$var=your-") {
            Write-Host "✅ Variable $var configurada" -ForegroundColor Green
        } else {
            $warnings += "⚠️ Variable $var no configurada o tiene valor por defecto"
        }
    }
}

Write-Host ""
Write-Host "📋 RESUMEN:" -ForegroundColor Cyan

if ($issues.Count -eq 0) {
    Write-Host "🎉 ¡Todo está configurado correctamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Pasos sugeridos:" -ForegroundColor Yellow
    Write-Host "1. Ejecuta: .\start-dev.ps1" -ForegroundColor White
    Write-Host "2. Visita: http://localhost:9999/api/docs" -ForegroundColor White
} else {
    Write-Host "❌ Problemas encontrados:" -ForegroundColor Red
    foreach ($issue in $issues) {
        Write-Host "   $issue" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠️ Advertencias:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "   $warning" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "🔧 Para configurar servicios externos:" -ForegroundColor Cyan
Write-Host "   • Firebase: https://console.firebase.google.com/" -ForegroundColor White
Write-Host "   • AWS S3: https://console.aws.amazon.com/s3/" -ForegroundColor White

Write-Host ""
Read-Host "Presiona Enter para continuar"
