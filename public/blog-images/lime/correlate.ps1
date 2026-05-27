
# =========================================================
# FULL 4624 ↔ 4688 LOGON + PROCESS CORRELATION
# OFFLINE EVTX DFIR ANALYSIS
# =========================================================

$LogPath = "C:\Users\cryfo\OneDrive\Documents\Desktop\logs"
$SecurityLog = Join-Path $LogPath "Security.evtx"

$StartDate = Get-Date "2026-05-11 00:00:00"
$EndDate   = Get-Date "2026-05-20 23:59:59"

Write-Host "`n[+] Loading Security.evtx..." -ForegroundColor Cyan

# =========================================================
# STEP 1 — EXTRACT 4624 LOGON EVENTS
# =========================================================

Write-Host "[+] Parsing 4624 logon events..." -ForegroundColor Yellow

$LogonEvents = Get-WinEvent -Path $SecurityLog | Where-Object {
    $_.Id -eq 4624 -and
    $_.TimeCreated -ge $StartDate -and
    $_.TimeCreated -le $EndDate
}

$Parsed4624 = foreach ($event in $LogonEvents) {

    $xml = [xml]$event.ToXml()

    $data = @{}
    foreach ($d in $xml.Event.EventData.Data) {
        $data[$d.Name] = $d.'#text'
    }

    [PSCustomObject]@{
        TimeCreated = $event.TimeCreated
        LogonID     = $data.TargetLogonId
        User        = $data.TargetUserName
        Domain      = $data.TargetDomainName
        LogonType   = $data.LogonType
        IPAddress   = $data.IpAddress
    }
}

# =========================================================
# STEP 2 — EXTRACT 4688 PROCESS CREATION EVENTS
# =========================================================

Write-Host "[+] Parsing 4688 process creation events..." -ForegroundColor Yellow

$ProcessEvents = Get-WinEvent -Path $SecurityLog | Where-Object {
    $_.Id -eq 4688 -and
    $_.TimeCreated -ge $StartDate -and
    $_.TimeCreated -le $EndDate
}

$Parsed4688 = foreach ($event in $ProcessEvents) {

    $xml = [xml]$event.ToXml()

    $data = @{}
    foreach ($d in $xml.Event.EventData.Data) {
        $data[$d.Name] = $d.'#text'
    }

    [PSCustomObject]@{
        TimeCreated    = $event.TimeCreated

        # CORRELATION FIELD
        LogonID        = $data.SubjectLogonId

        User           = $data.SubjectUserName
        Domain         = $data.SubjectDomainName

        # PROCESS INFO
        NewProcessName = $data.NewProcessName
        CommandLine    = $data.CommandLine
        ParentProcess  = $data.CreatorProcessName
        PID            = $data.NewProcessId
        ParentPID      = $data.ProcessId
    }
}

# =========================================================
# STEP 3 — BUILD LOGON INDEX (4624)
# =========================================================

Write-Host "[+] Building logon session index..." -ForegroundColor Cyan

$LogonIndex = @{}

foreach ($l in $Parsed4624) {

    if ($l.LogonID -and -not $LogonIndex.ContainsKey($l.LogonID)) {

        $LogonIndex[$l.LogonID] = $l
    }
}

# =========================================================
# STEP 4 — CORRELATE SESSIONS
# =========================================================

Write-Host "[+] Correlating processes to logon sessions..." -ForegroundColor Cyan

$Results = foreach ($p in $Parsed4688) {

    if ($p.LogonID -and $LogonIndex.ContainsKey($p.LogonID)) {

        $l = $LogonIndex[$p.LogonID]

        [PSCustomObject]@{

            # LOGON INFO
            LogonTime   = $l.TimeCreated
            LogonID     = $l.LogonID
            User        = "$($l.Domain)\$($l.User)"
            LogonType   = $l.LogonType
            SourceIP    = $l.IPAddress

            # PROCESS INFO
            ProcessTime = $p.TimeCreated
            Process     = $p.NewProcessName
            CommandLine = $p.CommandLine
            Parent      = $p.ParentProcess
            PID         = $p.PID
        }
    }
}

# =========================================================
# STEP 5 — SORT TIMELINE
# =========================================================

$Results = $Results | Sort-Object ProcessTime

# =========================================================
# STEP 6 — OUTPUT RESULTS
# =========================================================

Write-Host "`n================ ATTACK TIMELINE ================" -ForegroundColor Red

$Results |
Format-Table `
    LogonID,
    User,
    LogonType,
    SourceIP,
    ProcessTime,
    Process,
    CommandLine,
    Parent `
    -AutoSize -Wrap

# =========================================================
# STEP 7 — EXPORT CSV
# =========================================================

$OutFile = Join-Path $LogPath "CORRELATED_4624_4688_FIXED.csv"

$Results |
Export-Csv -NoTypeInformation -Encoding UTF8 $OutFile

Write-Host "`n[+] Exported to:" -ForegroundColor Green
Write-Host $OutFile

# =========================================================
# STEP 8 — SUSPICIOUS PROCESS FILTER
# =========================================================

Write-Host "`n================ SUSPICIOUS EXECUTION ================" -ForegroundColor Magenta

$Suspicious = $Results | Where-Object {
    $_.Process -match "powershell|cmd|wmic|rundll32|mshta|certutil|bitsadmin|wscript|cscript|psexec|mimikatz|wmiprvse"
}

$Suspicious |
Format-Table `
    LogonID,
    User,
    SourceIP,
    Process,
    CommandLine,
    Parent `
    -AutoSize -Wrap