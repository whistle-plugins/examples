/* eslint-disable @typescript-eslint/triple-slash-reference, @typescript-eslint/naming-convention */

/// <reference path="base.d.ts" />

declare module 'koa-onerror';

declare namespace Whistle {
  type Body = string | false;

  interface LRUOptions<K = any, V = any> {
    max?: number;
    maxAge?: number;
    length?(value: V, key?: K): number;
    dispose?(key: K, value: V): void;
    stale?: boolean;
    noDisposeOnSet?: boolean;
  }

  interface LRUEntry<K, V> {
    k: K;
    v: V;
    e: number;
  }

  interface LRUCache<K = any, V = any> {
    new (options?: LRUOptions<K, V>): this;
    readonly length: number;
    readonly itemCount: number;
    allowStale: boolean;
    lengthCalculator(value: V): number;
    max: number;
    maxAge: number;
    set(key: K, value: V, maxAge?: number): boolean;
    get(key: K): V;
    peek(key: K): V;
    has(key: K): boolean;
    del(key: K): void;
    reset(): void;
    prune(): void;
    forEach<T = this>(callbackFn: (this: T, value: V, key: K, cache: this) => void, thisArg?: T): void;
    rforEach<T = this>(callbackFn: (this: T, value: V, key: K, cache: this) => void, thisArg?: T): void;
    keys(): K[];
    values(): V[];
    dump(): Array<LRUEntry<K, V>>;
    load(cacheEntries: ReadonlyArray<LRUEntry<K, V>>): void;
  }

  interface Frame {
    reqId: string;
    frameId: string;
    base64?: string;
    bin?: '' | Buffer;
    text?: string;
    mask?: boolean;
    compressed?: boolean;
    length?: number;
    opcode?: number;
    isClient?: boolean;
    err?: string;
    closed?: true;
    code?: string | number;
    [propName: string]: any;
  }

  interface Session {
    id: string;
    url: string;
    useH2?: boolean;
    isHttps?: boolean;
    startTime: number;
    dnsTime?: number;
    requestTime: number;
    responseTime: number;
    endTime?: number;
    req: {
      method?: string;
      httpVersion?: string;
      ip?: string;
      port?: string | number;
      rawHeaderNames?: object;
      headers: object;
      size?: number;
      body?: Body;
      base64?: Body;
      rawHeaders?: object;
      [propName: string]: any;
    };
    res: {
      ip?: string;
      port?: string | number;
      rawHeaderNames?: object;
      statusCode?: number | string;
      statusMessage?: string;
      headers?: object;
      size?: number;
      body?: Body;
      base64?: Body;
      rawHeaders?: object;
      [propName: string]: any;
    };
    rules: object;
    rulesHeaders?: object;
    frames?: Frame[];
    [propName: string]: any;
  }

  interface File {
    index: number;
    name: string;
    data: string;
    selected: boolean;
  }

  interface Storage {
    new (dir: string, filters?: object, disabled?: boolean): this;
    count(): number;
    existsFile(file: string): false | File;
    getFileList(origin: boolean): File[];
    writeFile(file: string, data: string): boolean;
    updateFile(file: string, data: string): boolean;
    readFile(file: string): string;
    removeFile(file: string): boolean;
    renameFile(file: string, newFile: string): boolean;
    moveTo(fromName: string, toName: string): boolean;
    setProperty(name: string, value: string): void;
    hasProperty(file: string): boolean;
    setProperties(obj: object): boolean;
    getProperty(name: string): any;
    removeProperty(name: string): void;
  }

  interface SharedStorage {
    getAll: () => Promise<any>;
    setItem: (key: any, value?: any) => Promise<any>;
    getItem: (key: string) => any;
    removeItem: (key: string) => any;
  }

  interface PluginOptions {
    name: string;
    version: string;
    debugMode?: boolean;
    CUSTOM_CERT_HEADER: string;
    ENABLE_CAPTURE_HEADER: string;
    RULE_VALUE_HEADER: string;
    RULE_PROTO_HEADER: string;
    SNI_VALUE_HEADER: string;
    RULE_URL_HEADER: string;
    MAX_AGE_HEADER: string;
    ETAG_HEADER: string;
    FULL_URL_HEADER: string;
    REAL_URL_HEADER: string;
    RELATIVE_URL_HEADER: string;
    REQ_ID_HEADER: string;
    PIPE_VALUE_HEADER: string;
    CUSTOM_PARSER_HEADER: string;
    STATUS_CODE_HEADER: string;
    PLUGIN_REQUEST_HEADER: string;
    LOCAL_HOST_HEADER: string;
    HOST_VALUE_HEADER: string;
    PROXY_VALUE_HEADER: string;
    PAC_VALUE_HEADER: string;
    METHOD_HEADER: string;
    CLIENT_IP_HEADER: string;
    CLIENT_PORT_HEAD: string;
    UI_REQUEST_HEADER: string;
    GLOBAL_VALUE_HEAD: string;
    SERVER_NAME_HEAD: string;
    COMMON_NAME_HEAD: string;
    CERT_CACHE_INFO: string;
    HOST_IP_HEADER: string;
    REQ_FROM_HEADER: string;
    config: {
      name: string;
      version: string;
      localUIHost: string;
      port: number;
      sockets: number;
      timeout: number;
      baseDir: string;
      uiport: number;
      clientId: string;
      uiHostList: string[];
      pluginHosts: object;
      host: string;
      [propName: string]: any;
    };
    parseUrl(url: string): WhistleBase.UrlQuery;
    wsParser: {
      getExtensions(res: any, isServer?: boolean): any;
      getSender(socket: any, toServer?: boolean): any;
      getReceiver(res: any, fromServer?: boolean, maxPayload?: number): any;
    };
    wrapWsReader(socket?: any, maxPayload?: number): any;
    wrapWsWriter(socket?: any): any;
    shortName: string;
    Storage: Storage;
    localStorage: Storage;
    storage: Storage;
    sharedStorage: SharedStorage;
    baseUrl: string;
    LRU: LRUCache;
    getValue(key: string, cb: (value: string) => void): void;
    getCert(domain: string, cb: (cert: any) => void): void;
    getRootCA(cb: (cert: any) => void): void;
    getHttpsStatus(cb: (status: any) => void): void;
    getRuntimeInfo(cb: (info: any) => void): void;
    updateRules(): void;
    compose(options: any, cb: (err: any, data?: any) => void): void;
    getRules(cb: (rules: any, outputArray?: boolean) => void): void;
    getValues(cb: (values: any, outputArray?: boolean) => void): void;
    getPlugins(cb: (plugins: any) => void): void;
    getCustomCertsInfo(cb: (certs: any) => void): void;
    isActive(cb: (active: boolean) => void): void;
    ctx: any;
    connect(opts: any, cb?: Function): any;
    request(opts: any, cb?: Function): any;
    generateSaz(sessions: Session[]): Buffer;
    extractSaz(saz: Buffer, cb: (sessions: Session[]) => void): void;
    getTempFilePath(ruleValue: string): string | undefined;
    [propName: string]: any;
  }

  type GetSession = (cb: (session: Session | '') => void) => void;
  type GetFrame = (cb: (Frames: Frame[] | '') => void) => void;
  type SetRules = (rules: string) => boolean;
  interface PluginDecoder {
    getBuffer: (cb: (err: any, buf?: Buffer | null) => void) => void;
    getText: (cb: (err: any, text?: string) => void, encoding?: string) => void;
    getJson: (cb: (err: any, json?: any) => void, encoding?: string) => void;
  }

  type PluginReqCtx = PluginDecoder & PluginRequest;
  type PluginResCtx = PluginDecoder & WhistleBase.Request;
  type PluginNextResult = {
    rules?: string | null | undefined;
    body?: any;
  };
  type PluginReqHandler = (buffer: Buffer | null,  next: (result?: PluginNextResult) => void, ctx?: PluginReqCtx) => void;
  type PluginResHandler = (buffer: Buffer | null,  next: (result?: PluginNextResult) => void, ctx?: PluginResCtx) => void;
  type PassThroughReq = PluginReqHandler | { [key: string]: any } | string | null | undefined;
  type PassThroughRes = PluginResHandler | { [key: string]: any } | null | undefined;
  type PassThrough = (uri?: PassThroughReq, trailers?: PassThroughRes) => void;

  interface WriteHead {
    (code: string | number, msg?: string, headers?: any): void;
    (code: string | number, headers?: any): void;
  }

  interface RequestFn {
    (uri: any, cb?: (res: any) => void, opts?: any): any;
    (uri: any, opts?: any, cb?: (res: any) => void): any;
  }

  class PluginRequest extends WhistleBase.Request {
    clientIp: string;
    fullUrl: string;
    isHttps: boolean;
    fromTunnel: boolean;
    fromComposer: boolean;
    isHttpsServer?: boolean;
    getReqSession: GetSession;
    getSession: GetSession;
    getFrames: GetFrame;
    Storage: Storage;
    localStorage: Storage;
    sharedStorage: SharedStorage;
    sessionStorage: {
      set(key: string, value: any): any;
      get(key: string): any;
      remove(key: string): any;
    };
    originalReq: {
      id: string;
      clientIp: string;
      isH2: boolean;
      existsCustomCert: boolean;
      isUIRequest: boolean;
      enableCapture: boolean;
      isFromPlugin: boolean;
      ruleValue: string;
      ruleUrl: string;
      pipeValue: string;
      sniValue: string;
      hostValue: string;
      fullUrl: string;
      url: string;
      isHttps: boolean;
      remoteAddress: string;
      remotePort: number;
      fromTunnel: boolean;
      fromComposer: boolean;
      servername: string;
      certCacheName: string;
      certCacheTime: number;
      isSNI: boolean;
      commonName: string;
      realUrl: string;
      relativeUrl: string;
      extraUrl: string;
      method: string;
      clientPort: string;
      globalValue: string;
      proxyValue: string;
      pacValue: string;
      pluginVars: string[];
      globalPluginVars: string[];
      headers: any;
      isRexExp?: boolean;
      pattern?: string;
      customParser?: boolean | '';
    };
    originalRes: {
      serverIp: string;
      statusCode: string;
    };
  }

  type PluginResponse = WhistleBase.Response;
  type PluginSocket = WhistleBase.Socks;
  type PluginServer = WhistleBase.HttpServer;
  class PluginServerRequest extends PluginRequest {
    setReqRules: SetRules;
    setResRules: SetRules;
    writeHead: WriteHead;
    request: RequestFn;
    connect: RequestFn;
    passThrough: PassThrough;
  }

  class PluginServerResponse extends WhistleBase.Response {
    setReqRules: SetRules;
    setResRules: SetRules;
    disableTrailers?: boolean;
  }

  class PluginServerSocket extends WhistleBase.Socks {
    setReqRules: SetRules;
    setResRules: SetRules;
    disableTrailers?: boolean;
  }
  class PluginUIRequest extends WhistleBase.Request {
    clientIp: string;
    Storage: Storage;
    localStorage: Storage;
    sharedStorage: SharedStorage;
  }

  type PluginUIResponse = WhistleBase.Response;

  class PluginAuthRequest extends PluginRequest {
    isUIRequest: boolean;
    setHtml(html: string): void;
    setUrl(url: string): void;
    setFile(url: string): void;
    setHeader(key: string, value: string): void;
    set(key: string, value: string): void;
    setRedirect(url: string): void;
    setLogin(login: boolean): void;
  }

  class PluginSNIRequest extends PluginRequest {
    isSNI: boolean;
  }

  type PluginSNIResult = boolean | {
    key: string;
    cert: string;
    mtime?: number;
  };

  type Result<T> = T | Promise<T>;

  type PluginAuthHook = (req: PluginAuthRequest, options?: PluginOptions) => Result<boolean>;
  type PluginSNIHook = (req: PluginSNIRequest, options?: PluginOptions) => Result<PluginSNIResult>;
  type PluginHook = (server: PluginServer, options?: PluginOptions) => Result<void>;
  type PluginUIHook = (server: PluginServer, options?: PluginOptions) => Result<void>;
}
