# fis3-postprocessor-vconsole
a plugin of fis3 to insert the vconsole tools

## Install
``` bash
npm i fis3-postprocessor-vconsole
```

## Usage
add to your `fis-conf.js`
```
fis.media('dev')
    .match('/*.html', {
        postprocessor: [fis.plugin('vconsole', {
            noElements: true, // not use vconsole-elements plugin, default: false
            noResources: true // not use vconsole-resources plugin, default: false
        })]
    })
```
