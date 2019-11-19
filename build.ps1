if ( -not (Test-Path ./dist) )
{
    mkdir ./dist    
}
remove-item ./dist/*.*

copy-item ./src/*.js ./dist -force
copy-item ./src/*.d.ts ./dist -force

uglifyjs ./src/jquery-resizable.js -o dist/jquery-resizable.min.js --source-map
uglifyjs ./src/jquery-resizableTableColumns.js -o dist/jquery-resizableTableColumns.min.js --source-map