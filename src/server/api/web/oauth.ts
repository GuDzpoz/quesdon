import * as Router from "koa-router"
import fetch from "node-fetch"
import rndstr from "rndstr"
import { BASE_URL, ADMIN } from "../../config"
import { MastodonApp, User } from "../../db/index"
import * as crypto from 'crypto';

const router = new Router()

router.post("/get_url", async (ctx) => {
    const hostName = ctx.request.body.fields.instance
        .replace(/.*@/, "").toLowerCase()
    if (hostName.includes("/")) return ctx.reject(400, "not use slash in hostname")
    const isMisskey = ctx.request.body.fields.misskey
    const redirectUri = BASE_URL + "/api/web/oauth/redirect"
    var url = ""
    if (hostName === "twitter.com") {
        return ctx.throw("twitter service is finished.", 404)
    }
    var secret = null;
    var app = await MastodonApp.findOne({hostName, appBaseUrl: BASE_URL, redirectUri})
    if (!app) {
        if(isMisskey) {
            const createApp = await fetch("https://" + hostName + "/api/app/create", {
                method: "POST",
                body: JSON.stringify({
                    name: "Quesdon(toot.app)",
                    description: "",
                    permission: [
                        "account-read",
                        "account-write",
                        "account/read",
                        "account/write",
                        "following-read",
                        "note-read",
                        "note-write",
                    ],
                    callbackUrl:redirectUri
                }),
                headers: {"Content-Type": "application/json"},
            }).then((r) => r.json())
            secret = createApp.secret
            const res = await fetch("https://" + hostName + "/api/auth/session/generate", {
                method: "POST",
                body: JSON.stringify({
                    appSecret: secret
                }),
                headers: {"Content-Type": "application/json"},
            }).then((r) => r.json())
            var login=res.url;
            var token=res.token;
            app = new MastodonApp()
            app.clientId = res.token
            app.clientSecret = secret
            app.hostName = hostName
            app.appBaseUrl = BASE_URL
            app.redirectUri = redirectUri
            await app.save()
        }else{
            const res = await fetch("https://" + hostName + "/api/v1/apps", {
                method: "POST",
                body: JSON.stringify({
                    client_name: "Quesdon(toot.app)",
                    redirect_uris: redirectUri,
                    scopes: "read write",
                    website: BASE_URL,
                }),
                headers: {"Content-Type": "application/json"},
            }).then((r) => r.json())
            app = new MastodonApp()
            app.clientId = res.client_id
            app.clientSecret = res.client_secret
            app.hostName = hostName
            app.appBaseUrl = BASE_URL
            app.redirectUri = redirectUri
            await app.save()
        }
    }else{
        if(isMisskey) {
            app=null;
            const createApp = await fetch("https://" + hostName + "/api/app/create", {
                method: "POST",
                body: JSON.stringify({
                    name: "Quesdon(toot.app)",
                    description: "",
                    permission: [
                        "account-read",
                        "account-write",
                        "account/read",
                        "account/write",
                        "following-read",
                        "note-read",
                        "note-write",
                        "read:account",
				        "write:account",
                        "read:following",
                        "write:notes"
                    ],
                    callbackUrl:redirectUri
                }),
                headers: {"Content-Type": "application/json"},
            }).then((r) => r.json())
            secret = createApp.secret
            const res = await fetch("https://" + hostName + "/api/auth/session/generate", {
                method: "POST",
                body: JSON.stringify({
                    appSecret: secret
                }),
                headers: {"Content-Type": "application/json"},
            }).then((r) => r.json())
            var login=res.url;
            var token=res.token;
            app = new MastodonApp()
            app.clientId = res.token
            app.clientSecret = secret
            app.hostName = hostName
            app.appBaseUrl = BASE_URL
            app.redirectUri = redirectUri
            await app.save()
        }
    }
    ctx.session!.loginState = rndstr() + "_" + app.id
    if(!isMisskey){
        const params: {[key: string]: string} = {
            client_id: app.clientId,
            scope: "read+write",
            redirect_uri: redirectUri,
            response_type: "code",
            state: ctx.session!.loginState,
        }
        url = `https://${app.hostName}/oauth/authorize?${Object.entries(params).map((v) => v.join("=")).join("&")}`
    }else{
        url=login+"?token="+token
    }
    ctx.body = {
        url,
    }
})

router.get("/redirect", async (ctx) => {
    var profile: {
        id: string
        name: string
        screenName: string
        avatarUrl: string
        accessToken: string
        hostName: string
        url: string
        acct: string,
    }
    if (ctx.session!.loginState === "twitter") {
        return ctx.throw("twitter service is finished", 404)
    }
    const app = await MastodonApp.findById(ctx.session!.loginState.split("_")[1])
    if (app == null) {
        ctx.redirect("/login?error=app_notfound")
        return
    }
    if(ctx.query.token){
        const res = await fetch("https://" + app.hostName + "/api/auth/session/userkey", {
            method: "POST",
            body: JSON.stringify({
                appSecret:app.clientSecret,
                token:app.clientId
            }),
            headers: {"Content-Type": "application/json"},
        }).then((r) => r.json())
        const myProfile=res.user;
        const sha256 = crypto.createHash('sha256');
		sha256.update(res.accessToken + app.clientSecret);
		const hash = sha256.digest('hex');
        profile = {
            id: myProfile.id,
            name: myProfile.name || myProfile.username,
            screenName: myProfile.username,
            hostName: app.hostName,
            avatarUrl: myProfile.avatarUrl,
            accessToken: "misskey_"+hash,
            url: "https://"+app.hostName+"/@"+myProfile.username,
            acct: myProfile.username + "@" + app.hostName,
        }
        if (!profile) return
    }else{
        if (ctx.query.state !== ctx.session!.loginState) {
            ctx.redirect("/login?error=invalid_state")
            return
        }
        const res = await fetch("https://" + app.hostName + "/oauth/token", {
            method: "POST",
            body: JSON.stringify({
                grant_type: "authorization_code",
                redirect_uri: app.redirectUri,
                client_id: app.clientId,
                client_secret: app.clientSecret,
                code: ctx.query.code,
                state: ctx.query.state,
            }),
            headers: {"Content-Type": "application/json"},
        }).then((r) => r.json())
        const myProfile = await fetch("https://" + app.hostName + "/api/v1/accounts/verify_credentials",  {
            headers: {Authorization: "Bearer " + res.access_token},
        }).then((r) => r.json())
        profile = {
            id: myProfile.id,
            name: myProfile.display_name || myProfile.username,
            screenName: myProfile.username,
            hostName: app.hostName,
            avatarUrl: myProfile.avatar_static,
            accessToken: res.access_token,
            url: myProfile.url,
            acct: myProfile.username + "@" + app.hostName,
        }
    }
    if (!profile) return
    const acct = profile.acct
    var user = await User.findOne({acctLower: acct.toLowerCase()})
    if (user == null) {
        user = new User()
        user.isDeleted = false
    }else if(user.isDeleted){
        ctx.redirect("/login?error=banned")
    }
    user.acct = acct
    user.acctLower = acct.toLowerCase()
    user.name = profile.name
    user.avatarUrl = profile.avatarUrl
    user.accessToken = "we-never-save-your-access-token"
    user.hostName = profile.hostName
    user.url = profile.url
    user.upstreamId = profile.id
    if(user.acctLower==ADMIN){ user.isAdmin = true }
    await user.save()
    ctx.session!.user = user.id
    ctx.session!.token = profile.accessToken
    ctx.redirect("/my")
})

export default router
