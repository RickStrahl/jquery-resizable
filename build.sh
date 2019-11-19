if ! test ./dist; then
    mkdir ./dist    
fi

cp ./src/*.js ./dist

uglifyjs ./src/jquery-resizable.js -o dist/jquery-resizable.min.js --source-map
uglifyjs ./src/jquery-resizableTableColumns.js -o dist/jquery-resizableTableColumns.min.js --source-map
