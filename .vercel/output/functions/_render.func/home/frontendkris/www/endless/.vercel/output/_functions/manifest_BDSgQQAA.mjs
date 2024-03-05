import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_CJ_r5Rej.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/studio-route.DFEO0l7G.css"},{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/admin/[...params]","pattern":"^\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/frontendkris/www/endless/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}],["/home/frontendkris/www/endless/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/@sanity/astro/dist/studio/studio-route.astro":"chunks/pages/studio-route_UztjsTsr.mjs","/src/pages/index.astro":"chunks/prerender_DcPLKyMm.mjs","\u0000@astrojs-manifest":"manifest_BDSgQQAA.mjs","/home/frontendkris/www/endless/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_Hb05nn4I.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_D9IRowos.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"chunks/studio-route_CvAp9Tky.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_zQqOUggL.mjs","/home/frontendkris/www/endless/node_modules/@sanity/vision/lib/_chunks/resources-CCBWT7ph.js":"_astro/resources-CCBWT7ph.DQHRSD7l.js","/home/frontendkris/www/endless/node_modules/sanity/lib/_chunks/index-CvUNfby3.js":"_astro/index-CvUNfby3.CxTHVQ4N.js","/home/frontendkris/www/endless/node_modules/sanity/lib/_chunks/resources-BxKucOVx.js":"_astro/resources-BxKucOVx.KXfLTkXL.js","@astrojs/react/client.js":"_astro/client.DjYhlKxB.js","/home/frontendkris/www/endless/node_modules/sanity/lib/_chunks/resources-B_y3iqGc.js":"_astro/resources-B_y3iqGc.CmqBGjQm.js","/home/frontendkris/www/endless/node_modules/sanity/lib/_chunks/index-Dkzo_-Bz.js":"_astro/index-Dkzo_-Bz.CS8iTJ4y.js","/home/frontendkris/www/endless/node_modules/@sanity/client/dist/_chunks/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.BwNvqdAQ.js","/home/frontendkris/www/endless/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.CRusYd_M.js","/home/frontendkris/www/endless/node_modules/sanity/lib/_chunks/index-BV_8ds5h.js":"_astro/index-BV_8ds5h.CD8MlHQ5.js","@/components/organisms/VideoCarousel.tsx":"_astro/VideoCarousel.B72-567W.js","/home/frontendkris/www/endless/node_modules/@sanity/vision/lib/_chunks/SanityVision-R1OQ_Aqq.js":"_astro/SanityVision-R1OQ_Aqq.CKj2H6GP.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/lalezar-arabic-400-normal.C1u539R_.woff2","/_astro/lalezar-vietnamese-400-normal.DI_ExVn6.woff2","/_astro/lalezar-latin-ext-400-normal.CvUFnWG6.woff2","/_astro/lalezar-latin-400-normal.9Q9KJ0ga.woff2","/_astro/lexend-latin-ext-wght-normal.Cyu54xig.woff2","/_astro/lexend-latin-wght-normal.Dw3kZGt8.woff2","/_astro/lexend-vietnamese-wght-normal.DaOGSS5s.woff2","/_astro/lalezar-vietnamese-400-normal.YDoDpK9y.woff","/_astro/lalezar-latin-ext-400-normal.DGG60bow.woff","/_astro/lalezar-latin-400-normal.CWnWz253.woff","/_astro/lalezar-arabic-400-normal.CTRXnTJD.woff","/_astro/logo.BeP03LsF.png","/_astro/index.SFSLaVFg.css","/_astro/studio-route.DFEO0l7G.css","/favicon.svg","/_astro/SanityVision-R1OQ_Aqq.CKj2H6GP.js","/_astro/VideoCarousel.B72-567W.js","/_astro/browser.CDrcFz0Z.js","/_astro/client.B3CCqPsx.js","/_astro/client.DjYhlKxB.js","/_astro/index-BV_8ds5h.CD8MlHQ5.js","/_astro/index-CvUNfby3.CxTHVQ4N.js","/_astro/index-Dkzo_-Bz.CS8iTJ4y.js","/_astro/index.BUqBwj0Y.css","/_astro/index.DQ2WTIsS.js","/_astro/jsx-runtime.CzgMDNMm.js","/_astro/resources-B_y3iqGc.CmqBGjQm.js","/_astro/resources-BxKucOVx.KXfLTkXL.js","/_astro/resources-CCBWT7ph.DQHRSD7l.js","/_astro/stegaEncodeSourceMap.BwNvqdAQ.js","/_astro/studio-component.3LyLIWOn.js","/_astro/studio-component.CRusYd_M.js","/index.html"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
