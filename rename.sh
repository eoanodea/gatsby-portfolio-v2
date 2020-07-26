for file in src/**/**/*.js
do
  mv "$file" "${file%.js}.ts"
done