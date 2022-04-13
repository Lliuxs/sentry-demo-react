curl https://sentry.io/api/0/organizations/shopee-ads/releases/production@2022_04_13_4/deploys/ \
 -H 'Authorization: Bearer 7abcd4c9b1df4380a604a8d313478eec315d23fe2e16422fb4e058e36970d5e0' \
 -H 'Content-Type: application/json' \
 -d '{"environment":"production"}'


// auto 标志自动确定存储库名称
sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --auto $(REACT_APP_RELEASE_VERSION)
sentry-cli releases -o shopee-ads -p react-demo set-commits --auto  production@2022_04_13_4


create_release:
sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(REACT_APP_RELEASE_VERSION)

upload_sourcemaps:
    sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files $(REACT_APP_RELEASE_VERSION) \
        upload-sourcemaps --url-prefix "~/static/js" --validate build/static/js

 sentry-cli releases -o shopee-ads -p react-demo files production@2022_04_13_4 \
        upload-sourcemaps --url-prefix "~/static/js" --validate build/static/js