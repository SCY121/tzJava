# 部署与重部署说明

## 项目类型

- 本项目是基于 `Vite` 的前端静态站点。
- 生产构建产物目录为 `dist/`。
- 服务器可使用 `nginx` 托管静态资源。

## 部署信息

- 线上访问地址：使用实际部署环境中的域名或 IP。
- 站点部署目录：使用实际服务器上的静态资源目录。
- nginx 配置文件：使用实际服务器上的 nginx 站点配置路径。

## 本地修改后重新部署流程

1. 在本地修改代码。
2. 在项目根目录执行检查与构建：

```bash
npm install
npm run lint
npm run build
```

3. 确认 `dist/` 已生成最新静态文件。
4. 将 `dist/` 内容上传到服务器部署目录。

推荐做法：

- 先将 `dist/` 打包为 zip 再上传。
- 服务器端先清空旧文件，再解压新包覆盖。

参考命令思路：

```bash
# 本地
Compress-Archive -Path dist\* -DestinationPath deploy-dist.zip -Force
```

```bash
# 服务器
mkdir -p /path/to/site
rm -rf /path/to/site/*
cd /path/to/site
unzip -oq /path/to/deploy-dist.zip
```

5. 重新加载 nginx：

```bash
nginx -t
nginx -s reload
```

如果 `nginx -s reload` 因 pid 问题失败，可使用：

```bash
pkill nginx || true
nginx
```

6. 部署完成后验证：

```bash
curl -I http://127.0.0.1/
curl -I http://your-domain-or-ip/
```

## nginx 配置参考

```nginx
server {
    listen 80;
    server_name your-domain-or-ip;

    root /path/to/site;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }
}
```

## 注意事项

- 不要把服务器密码、私钥、令牌等敏感信息写入仓库。
- 服务器登录凭据应通过安全渠道单独保存。
- 该项目是前端单页应用，刷新子路由依赖 nginx 中的 `try_files ... /index.html` 回退配置，不能删。
