# Requires Firebase CLI installed (`npm install -g firebase-tools`)
param(
  [string]$ProjectId = "wyn-remnants-$(Get-Random)"
)

Write-Host "Creating Firebase project: $ProjectId"
firebase projects:create $ProjectId --display-name "WYN Remnants" --non-interactive

Write-Host "Initializing Firebase in repo root"
Set-Location "$PSScriptRoot\.."
firebase use $ProjectId
firebase apps:create web wynRemnantsWeb --display-name "WYN Remnants Web" --non-interactive

# Capture config JSON
$webConfig = firebase apps:sdkconfig web --json | ConvertFrom-Json
$apiKey = $webConfig.sdkConfig.apiKey
$authDomain = $webConfig.sdkConfig.authDomain
$projectId = $webConfig.sdkConfig.projectId

# Write to .env files
$envContent = @"
FIREBASE_API_KEY=$apiKey
FIREBASE_AUTH_DOMAIN=$authDomain
FIREBASE_PROJECT_ID=$projectId
"@
Add-Content -Path ".env" -Value $envContent
Add-Content -Path "server\.env" -Value $envContent
Add-Content -Path "mobile\.env" -Value $envContent

Write-Host "Enabling Google authentication provider"
firebase auth:providers:set google --project $ProjectId --enable

Write-Host "Firebase setup completed."
