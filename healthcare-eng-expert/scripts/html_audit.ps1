param(
    [Parameter(Mandatory = $true)]
    [string]$Root
)

$resolvedRoot = (Resolve-Path -LiteralPath $Root).Path
$htmlFiles = Get-ChildItem -Path $resolvedRoot -Recurse -File -Include *.html,*.htm

$results = foreach ($file in $htmlFiles) {
    $content = Get-Content -LiteralPath $file.FullName -Raw
    $directory = Split-Path -Parent $file.FullName

    $idMatches = [regex]::Matches($content, 'id\s*=\s*"([^"]+)"', 'IgnoreCase')
    $duplicateIds = $idMatches |
        ForEach-Object { $_.Groups[1].Value } |
        Group-Object |
        Where-Object { $_.Count -gt 1 } |
        Select-Object Name, Count

    $samePageAnchors = [regex]::Matches($content, 'href\s*=\s*"#([^"]+)"', 'IgnoreCase') |
        ForEach-Object { $_.Groups[1].Value }

    $missingAnchorTargets = foreach ($anchor in $samePageAnchors) {
        if ($idMatches.Groups[1].Value -notcontains $anchor) {
            $anchor
        }
    }

    $referenceMatches = [regex]::Matches(
        $content,
        '(?:href|src|action|formaction)\s*=\s*"([^"]+)"',
        'IgnoreCase'
    )

    $importMatches = [regex]::Matches(
        $content,
        '<(?:script[^>]+src|link[^>]+href)\s*=\s*"([^"]+)"',
        'IgnoreCase'
    )

    $duplicateImports = $importMatches |
        ForEach-Object { $_.Groups[1].Value } |
        Where-Object {
            $_ -and
            $_ -notmatch '^(https?:|mailto:|tel:|#|javascript:|data:)' 
        } |
        Group-Object |
        Where-Object { $_.Count -gt 1 } |
        Select-Object Name, Count

    $missingLocalReferences = foreach ($match in $referenceMatches) {
        $reference = $match.Groups[1].Value

        if (-not $reference) { continue }
        if ($reference -match '^(https?:|mailto:|tel:|#|javascript:|data:)') { continue }

        $pathOnly = $reference.Split('#')[0].Split('?')[0]
        $decodedPath = [System.Uri]::UnescapeDataString($pathOnly)
        if (-not $decodedPath) { continue }

        $resolvedPath = Join-Path $directory $decodedPath
        if (-not (Test-Path -LiteralPath $resolvedPath)) {
            [pscustomobject]@{
                reference = $reference
                resolvedPath = $resolvedPath
            }
        }
    }

    [pscustomobject]@{
        file = $file.FullName
        duplicateIds = @($duplicateIds)
        duplicateImports = @($duplicateImports)
        missingAnchorTargets = @($missingAnchorTargets | Sort-Object -Unique)
        missingLocalReferences = @($missingLocalReferences)
    }
}

$summary = [pscustomobject]@{
    root = $resolvedRoot
    auditedFiles = $htmlFiles.Count
    issues = @($results | Where-Object {
        $_.duplicateIds.Count -gt 0 -or
        $_.duplicateImports.Count -gt 0 -or
        $_.missingAnchorTargets.Count -gt 0 -or
        $_.missingLocalReferences.Count -gt 0
    })
}

$summary | ConvertTo-Json -Depth 6
