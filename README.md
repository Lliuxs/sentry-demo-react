curl https://sentry.io/api/0/organizations/shopee-ads/releases/production@2022_04_13_3/deploys/ \
 -H 'Authorization: Bearer 7abcd4c9b1df4380a604a8d313478eec315d23fe2e16422fb4e058e36970d5e0' \
 -H 'Content-Type: application/json' \
 -d '{"environment":"production"}'


sentry-cli releases set-commits --auto production@2022_04_13_3