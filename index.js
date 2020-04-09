const Base = require("./base.js");
module.exports = class extends Base {
    constructor(config) {
        super(config)
        if (!config || !config.apiKey) throw new Error("invalid arguments");
        this.config = {
            apiKey: config.apiKey,
            timeout: config.timeout ? config.timeout : 60000,
            intervall: config.intervall ? config.intervall : 7000,
            returnError: config.returnError ? config.returnError : false,
            inUrl: "https://2captcha.com/in.php?",
            pollUrl: "https://2captcha.com/res.php?"
        };
    };
    async obtainHCaptcha(config) {
        let r, id, captcha, start;
        try {
            if (!config.sitekey ||
                !config.url) throw new Error("invalid arguments");
            id = await this.requestCaptcha({ type: "hcaptcha", sitekey: config.sitekey, url: config.url, proxy: config.proxy ? config.proxy : null });
            start = Date.now()
            while (!captcha) {
                if (start + this.config.timeout < Date.now()) throw new Error("timeout exceeded");
                r = await this.pollCaptcha({ id: id });
                if (r.status == "0") {
                    switch (r.request) {
                        case "ERROR_CAPTCHA_UNSOLVABLE":
                            throw new Error("captcha not solvable");
                        case "CAPCHA_NOT_READY":
                            await this.sleep(this.config.intervall);
                            break;
                        default:
                            throw new Error(r);
                            break;
                    };
                } else if (r.status == "1") captcha = r.request;
            };
            return { solution: captcha, timestamp: Date.now() };
        } catch (e) {
            if (this.config.returnError)
                throw e;
            else console.log(e.message);
        };
    };
    async obtainReCaptcha(config) {
        let r, id, captcha, start;
        try {
            if (!config.version instanceof String ||
                !config.sitekey || !config.sitekey instanceof String ||
                !config.url || !config.url instanceof String) throw new Error("invalid arguments");
            id = await this.requestCaptcha({ type: "userrecaptcha", version: config.version ? config.version : "v2", sitekey: config.sitekey, url: config.url, invisible: config.invisible ? config.invisible : null });
            start = Date.now();
            while (!captcha) {
                if (start + this.config.timeout < Date.now()) throw new Error("timeout exceeded");
                r = await this.pollCaptcha({ id: id });
                if (r.status == "0") {
                    switch (r.request) {
                        case "ERROR_CAPTCHA_UNSOLVABLE":
                            throw new Error("captcha not solvable");
                        case "CAPCHA_NOT_READY":
                            await this.sleep(this.config.intervall);
                            break;
                        default:
                            throw new Error(r);
                            break;
                    };
                } else if (r.status == "1") captcha = r.request;
            };
            return { solution: captcha, timestamp: Date.now() };
        } catch (e) {
            if (this.config.returnError)
                throw e;
            else console.log(e.message);
        };
    };
};