# README

## Notes

```bash
docker run -it --entrypoint /bin/bash -p 4000:4000 -v `pwd`:/blog ruby
docker run \
    -it --entrypoint /bin/bash \
    -p 4000:4000 \
    -v `pwd`:/srv/jekyll \
    jekyll/jekyll:3.8
jekyll build
jekyll serve --host 0.0.0.0
# for production
JEKYLL_ENV=production jekyll build
```
