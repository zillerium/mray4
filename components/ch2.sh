#!/bin/bash

# Define the search and replacement strings
searchStr="DisplayTreasuryUsdcChart"
newStr="DisplayTreasuryUsdcChart"

# Find all files containing the search string and replace the string
grep -rl "$searchStr" . | while read -r file; do
  # Use sed with | as the delimiter to avoid issues with /
  sed -i "s|$searchStr|$newStr|g" "$file"
  echo "Updated $file"
done

echo "Replacement complete."

