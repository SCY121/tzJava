# 添砖Java

Java 后端面试复盘站点，基于 Vite 构建，生产产物位于 `dist/`。

## 本地开发

```bash
npm install
npm run lint
npm test
npm run build
```

## 同步与部署约定

后续每次修改代码后，按同一顺序同步：

1. 本地完成修改并运行 `npm run lint`、`npm test`、`npm run build`。
2. 提交代码并推送到 GitHub 远程 `github/master`。
3. 使用最新 `dist/` 构建产物部署到云服务器静态站点目录。
4. 服务器执行 `nginx -t` 和 `nginx -s reload`。
5. 用本机和公网地址分别做 `curl -I` 校验。

仓库内不保存服务器密码、私钥、令牌或真实部署凭据。
