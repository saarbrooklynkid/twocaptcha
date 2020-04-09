# @saarbrooklynkid/two-captcha

@saarbrooklynkid/two-captcha is a node two captcha api wrapper.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install @saarbrooklynkid/two-captcha.

```bash
npm i @saarbrooklynkid/two-captcha
```

## Example

```js
const twoCaptcha=require("@saarbrooklynkid/two-captcha");
const twoCaptchaClient = new twoCaptcha({apiKey:APIKEY}); // optional: returnError BOOLEAN, timeout INT, intervall INT

async function hCap(){
	var captcha = await twoCaptchaClient.obtainHCaptcha({url:URL,sitekey:SITEKEY})
};
async function reCap(){
	var captcha = await twoCaptchaClient.obtainReCaptcha({url:URL,sitekey:SITEKEY}) // optional: Version STRING, proxy STRING, invisible BOOLEAN
};
```

## License
[ISC](https://choosealicense.com/licenses/isc/)