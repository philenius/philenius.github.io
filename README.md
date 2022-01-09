# GitHub Blog philenius.github.io

Made with [Jekyll](https://jekyllrb.com/).

## Build and run locally

```bash
docker run \
    -it --entrypoint /bin/bash \
    -p 4000:4000 \
    -v `pwd`:/srv/jekyll \
    jekyll/jekyll:4.2.1

jekyll build

jekyll serve --host 0.0.0.0

# for production
JEKYLL_ENV=production jekyll build
```
