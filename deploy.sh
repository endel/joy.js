cd _site
git init .
git remote add origin git@github.com:joy/joy.js.git
git add .
git commit -m "Update public website content."
git checkout -b gh-pages
git push origin gh-pages -f
