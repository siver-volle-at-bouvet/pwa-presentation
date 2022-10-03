

## Converting assets to datauris:

```
echo -n "data:image/png;base64,$(cat icon.png | base64 | tr -d '\r\n')" > icon.datauri
echo -n "data:application/manifest+json;base64,$(cat manifest.webmanifest | base64 | tr -d '\r\n')" > manifest.datauri
```