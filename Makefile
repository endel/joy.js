default: dev

dev:
	# compile with browserify
	./node_modules/browserify/bin/cmd.js ./lib/api.js -o ./dist/joy.js -x Joy

watch:
	./node_modules/watchify/bin/cmd.js ./lib/api.js -o ./dist/joy.js -x Joy -v

prod:
	# compile with browserify
	make dev
	# minify/uglify
	./node_modules/uglify-js/bin/uglifyjs ./dist/joy.js -o ./dist/joy.min.js
