const
    req = require("axios").default;
module.exports = class {
    async requestCaptcha(config) {
        let r = await this.request({
            url: `${this.config.inUrl}key=${this.config.apiKey}&method=${config.type+(config.version?config.version=="v3"?"&version=v3&action=verify&min_score=0.3":"":"")}&${config.type=="hcaptcha"?"sitekey="+config.sitekey:"googlekey="+config.sitekey}&pageurl=${config.url}&json=true&soft_id=2654${config.proxy?"proxytype=http&proxy="+config.proxy:""}${config.invisible?"&invisible=1":""}`
        });
        if (r.data.status == "1")
            return r.data.request;
        else if (r.data.status == "0") throw new Error(r.data.error_text);
        else throw new Error("unexpected error");

    };
    async pollCaptcha(config) {
        let r = await this.request({
            url: `${this.config.pollUrl}key=${this.config.apiKey}&action=get&id=${config.id}&json=true`
        });
        if (r.data.status == "1" || r.data.status == "0")
            return r.data;
        else throw new Error("unexpected error");
    };
    async request(config) {
        return await req({
            method: config.method ? config.method : "GET",
            url: config.url,
            headers: {
                "accept": "application/json"
            },
            timeout: this.config.timeout
        })
    };
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
}