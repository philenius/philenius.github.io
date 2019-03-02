# README

## Notes

```bash
docker run -it --entrypoint /bin/bash -p 4000:4000 -v `pwd`:/blog ruby
cd /blog
gem install bundler jekyll
bundle install
bundle exec jekyll serve --host 0.0.0.0
JEKYLL_ENV=production bundle exec jekyll build
```
