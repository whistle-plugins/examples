const key = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA3be0n8mH/xG/onwLitPvyCw7b56D0zCri4fClNOqZMmfTWfi
J3G9ayZX41yIKWqYfLkYbdRVedNxWomQ95zT7zIEr/WH8MqUt8zj9MK1vAdHhrwr
uJ3eWkoAhSeXSmufS7vWUhrGIBLB1Tc0VE7ehFUY7+xc60KATLXOy5oV+MTPLd5X
mjpaknEvx4vPvPaJRHhUxr/t9HI6NSC9fnNJLH4KDLT1CTBvnFp3yuyqDytCL8o9
8ooORxoi3DfmgzGrgeJAlUXEPpczKVOIuhxsksDBhqj7sLxpRvghv25x4Hgsz1zK
5Ym3dcAYP6ZBHqHSCL2DyXqj4Ar/qXyN8cbhQwIDAQABAoIBAENjtFdCyn6pFt2c
pWd3XnCxnQkinX/B0coxo99XbHmA3NYKpq8Ff6TDPUBiXhJ0j0+NdNLhEG/caB40
JOdV+AbCZbFTyBNUh5pMANdinRk+/ysBI6rT9QLtbjYKoA3jI0JCH/TJpYGXIeoc
AuBDLpf7Q36dEWsCRfvK4MV6moYHPqgJCZcm0Pht5g91NEatjg1GAGg91pu269NJ
bODJE0DNA75PcsJd9TtGtaHtH7A8BKP5JVt+51emDliG8/RYMJErT4usuvibNq7x
t3TW07mfl5DpRjNdOc035VteuY2e+OnFOmI3qnq1P9w+mTxkV5ETG5hX2wqu5O7J
8B+W9DkCgYEA/s9sSpEJdN+OyCn0SRuU2bpjI/wIMsXU5NSP4ieZkvRj3httgIKe
Qbf6byc1JIyNeauDcq+Mgnc35HDNxDWzSmJkKW/opU0iEpZSiQBXYzo02SRPFygQ
pypG95qEygP0qMNRi2Ne0yaVRpdMXWXl/OIGBykc7wN69Mt91zquSikCgYEA3sC6
Azb5+vIpW/lJG6q/CabHrfOkEEQqo0Mu/sTN0s2Qe+1vGhPcMOwOBy3ZswAwG7S/
5D5d6rpR4wlLUnyHddQ3Eao1Yab1yeGA6DMp2Doq2VxH34a+fnLNcaKLMk1bpjkc
9lMzRMT+0fj6GxmOwXalVOISNeLQ29CMHAz9VYsCgYEAkIirjmhSit68KMHTdRyW
BCJ7VdAB/nrE1b/UlZ2MuRSzCStZo4lzpydqgF4nAMJRBXDKMOVuuBpTs9pgfSlQ
t6Kz2eVGe20TJKPr0RZGe1xq2biEvEfXmlqawpv9MnGn94pC2OPWx8Kc7duoT1ob
aKP0c19YsCKzPeOnT8xTTHECgYAI9Z+FuZRcb5kSRfiW0EtWzAqECKS0ssk0P+OI
A8pzjCkfkvFBD0NwBE6cI0/6TyugMaj2OTv10QCyLRGGg9O+/YYpg7sZ7mk8cYGJ
1WT9eXl3vKp3ZygKVfvFclA++bWR/gIYNkh9n57QOz90D5caWPdVbrJk0HauILlB
95PI+QKBgQDE3nAacysEMngk/uBJQEVgYvbcA4J9xtaVfrDso1pkyh3ri0mRmEHR
9nrKe6mGKytW9taoWthLQnyK5Jdm/h3ZtY8I1juAyCI5/Nk78SKdJY0rmwr0tdGp
7P7QC/xoq3EU1ahcCDWiNFF1Tjt/qWSUy55HYZ2m/5tkpURcKtSAQg==
-----END RSA PRIVATE KEY-----
`;
const cert = `-----BEGIN CERTIFICATE-----
MIIDSDCCAjCgAwIBAgIUKCMgXMKQohFeK5DAkEv73waEYlAwDQYJKoZIhvcNAQEL
BQAwgYUxITAfBgNVBAMTGHdoaXN0bGUuMTcyMTM5MDE1NTQ5MjY1NDELMAkGA1UE
BhMCQ04xCzAJBgNVBAgTAlpKMQswCQYDVQQHEwJIWjEkMCIGA1UEChMbMTcyMTM5
MDE1NTQ5MjY1NC53cHJveHkub3JnMRMwEQYDVQQLEwp3cHJveHkub3JnMB4XDTI1
MDYyNjA4MDgwOVoXDTI2MDcxNjA4MDgwOVowGDEWMBQGA1UEAxMNKi5leGFtcGxl
LmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAN23tJ/Jh/8Rv6J8
C4rT78gsO2+eg9Mwq4uHwpTTqmTJn01n4idxvWsmV+NciClqmHy5GG3UVXnTcVqJ
kPec0+8yBK/1h/DKlLfM4/TCtbwHR4a8K7id3lpKAIUnl0prn0u71lIaxiASwdU3
NFRO3oRVGO/sXOtCgEy1zsuaFfjEzy3eV5o6WpJxL8eLz7z2iUR4VMa/7fRyOjUg
vX5zSSx+Cgy09Qkwb5xad8rsqg8rQi/KPfKKDkcaItw35oMxq4HiQJVFxD6XMylT
iLocbJLAwYao+7C8aUb4Ib9uceB4LM9cyuWJt3XAGD+mQR6h0gi9g8l6o+AK/6l8
jfHG4UMCAwEAAaMcMBowGAYDVR0RBBEwD4INKi5leGFtcGxlLmNvbTANBgkqhkiG
9w0BAQsFAAOCAQEAFQ7/T63AJRGWYMEuLW2waUc5YeFAoy2S0mtWAMpCOXSiNspL
bVjeei/magdpBJ1fb2ExmOs2IBp0qyeOBTLXavT4l2P2JWa9uH2EfNaAGoQ3VgbU
WTrgp947rBL/0kynB5bP0J5pGyX59sEZ2NvSva7MkWs9LIYE/rBsUtBQz9WNh6Mt
WAGiObySjMEdfSTezIwvcZzZoG4YskEoxbY809g5vDeG0WmzfO0lei4mMcQUM+dg
L+gkuzBOmsmqNQFYTD6ZlG26Lbm5cPT1cRdGTVuRbBoDx4Ffs27NT+T93hEGKpG8
wkNm3VFiPrd1wZ8jr3hXypNEuIBMp6o97eHnOw==
-----END CERTIFICATE-----
`;

// sniCallback 插件处理函数 - 根据请求 URL 动态决定 TLS 隧道处理方式
export default async (req: Whistle.PluginSNIRequest, options: Whistle.PluginOptions) => {
  const { fullUrl, originalReq } = req;
  // 获取 servername：req.originalReq.servername
  console.log(originalReq.servername);
  // 特殊域名返回 false，保持 TUNNEL 状态（不解除 TLS 加密）
  if (fullUrl === 'https://tunnel.example.com' || originalReq.sniValue === 'tunnel') {
    return false;
  }

  // 对特定域名使用自定义证书解密，返回一个包含 key 和 cert 的对象
  // 支持 .crt、.pem、.cer 等格式的证书
  if (fullUrl === 'https://custom.example.com') {
    return { key, cert };
  }
  // 默认使用 Whistle 内置证书解密 TLS 流量
  return true;
};
