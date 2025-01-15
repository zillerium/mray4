#!/bin/bash

# Define the search and replacement strings
searchStr="/Treasury/"
newStr="/Treasury/"

# Find all files containing the search string and replace the string
grep -rl "$searchStr" . | while read -r file; do
  # Use sed to replace the whole word in the file
  sed -i "s/\b$searchStr\b/$newStr/g" "$file"
  echo "Updated $file"
done

echo "Replacement complete."

