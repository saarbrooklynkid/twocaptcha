# @saarbrooklynkid/twocaptcha

@saarbrooklynkid/twocaptcha is a node two captcha api wrapper.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install @saarbrooklynkid/twocaptcha.

```bash
npm i @saarbrooklynkid/twocaptcha
```

## Example

```js
const twoCaptcha=require("@saarbrooklynkid/twocaptcha");
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