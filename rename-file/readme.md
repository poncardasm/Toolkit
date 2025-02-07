## What the Script Does

1. **Determines the Working Directory:**
   It uses `$PSScriptRoot` to set the folder path, meaning it will operate in the same directory as the script.

2. **Selects Files to Process:**
   It retrieves all files in that folder but explicitly excludes:

   - Files with the `.ps1` extension (to avoid renaming other PowerShell scripts,including itself).
   - The script file itself (by comparing names).

3. **Renames Files:**
   For each file, the script checks if the base name (without extension) already has a dash after the first word (using the regex `"^\S+-\s"`). If it does not, it splits the name by spaces and then renames the file by inserting a dash after the first word.

4. **Output:**
   It keeps a log of the changes and displays the list of renamed files at the end.

5. **User Pause:**
   Finally, it pauses for user input, allowing you to review the output before the console window closes.
