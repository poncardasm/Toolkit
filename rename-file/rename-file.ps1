# Automatically set the folder path to the location of the script
$folderPath = $PSScriptRoot

# Initialize an array to store renamed files
$renamedFiles = @()

# Get all files in the folder, excluding the script itself
Get-ChildItem -Path $folderPath -File | Where-Object {
    # Exclude the script itself by checking the file extension and name
    $_.Extension -ne ".ps1" -and $_.Name -ne $MyInvocation.MyCommand.Name
} | ForEach-Object {
    # Extract the file name and extension
    $fileName = $_.BaseName
    $fileExtension = $_.Extension

    # Check if the first word already has a dash "-"
    if ($fileName -notmatch "^\S+-\s") {
        # Split the file name into words
        $words = $fileName -split " "

        # Add a dash "-" after the first word
        if ($words.Count -gt 1) {
            $newFileName = "$($words[0])- $($words[1..($words.Count - 1)] -join ' ')$fileExtension"
        } else {
            $newFileName = "$fileName$fileExtension" # If there's only one word, keep it unchanged
        }

        # Rename the file
        Rename-Item -Path $_.FullName -NewName $newFileName

        # Add the renamed file to the list
        $renamedFiles += "$fileName$fileExtension -> $newFileName"
    }
}

# Display the list of renamed files
if ($renamedFiles.Count -gt 0) {
    Write-Host "`nThe following files were renamed:`n" -ForegroundColor Green
    $renamedFiles | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
} else {
    Write-Host "`nNo files were renamed." -ForegroundColor Cyan
}

# Pause the CLI to allow the user to review the output
Write-Host ""
Read-Host "Press 'Enter' to close the program"
