![Logo of the project](https://whitespectrecom.s3.amazonaws.com/sites/590a11fecf63d900145cf136/theme/images/w-s-logo.svg?1493993325)

# Whitespectre Exercise
> Carousel exercised requested by Whitespectre.


## Installing / Getting started

Feel free to use the code editor of your choice. It has `prettier-eslint` setup; Visual Studio and Atom have a nice plugin to format and enforce eslint on file save, you can configure them in the next section.

### For Visual Studio Code

Make sure you have `prettier-vscode` plugin installed
```shell
ext install prettier-vscode
```
Also following settings in your workspace settings:
```json
{
     "editor.formatOnSave": true,
     "prettier.eslintIntegration": true
}
```

### For Atom

Make sure you have `prettier-atom` plugin installed
```shell
apm install prettier-atom
```
-Automatically format on save (requires enabling in `Packages → Prettier → Toggle Format on Save`)
-Check the `ESLint Integration` checkbox


### Built With
- Backbone
- JQuery
- ES6
- Prettier
- ESLint

### Setting up Dev

Run the code below:

```shell
git clone git@github.com:sorioinc/backbone.git
cd backbone/
npm install
```

### Building

To build/bundle the app use `npm run build:prod`, if you want to run the development web server, run `npm run build`.

## Style guide

The style is driven by ESLint, and it's based upon Airbnb's configuration. Plus, it makes use of Prettier as a formatter. It is enforced with `git commit hooks`.
