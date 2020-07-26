for file in src/**/**/*.ts.tsx
do
  mv "$file" "${file%.ts.tsx}.tsx"
done