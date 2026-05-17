# 静态站点部署记录

## 当前线上环境

- 站点地址：`http://111.228.23.55/`
- Nginx 根目录：`/var/www/interview-guide`
- 备份目录：`/var/backups/interview-guide`

## 标准发布流程

1. 本地验证
   - 运行 `npm test`
   - 运行 `npm run build`

2. 生成发布包
   - 将最新 `dist/` 打成 zip
   - zip 内部直接放 `index.html` 和 `assets/`，不要多套一层 `dist/`

3. 上传并覆盖
   - 上传 zip 到服务器，例如 `/root/deploy-dist-current.zip`
   - 先备份当前目录到 `/var/backups/interview-guide`
   - 清空 `/var/www/interview-guide`
   - 执行 `unzip -oq /root/deploy-dist-current.zip -d /var/www/interview-guide`

4. 重载 Nginx
   - 执行 `nginx -t`
   - 执行 `nginx -s reload`

5. 发布后校验
   - 本机执行 `curl -I http://111.228.23.55/`
   - 确认返回 `HTTP/1.1 200 OK`
   - 如有需要，再检查首页 HTML 是否引用了最新 `assets/*.js` 和 `assets/*.css`

## 本次验证过的关键点

- 不能依赖 Windows 到 Linux 的递归目录复制作为主发布方式，最稳的是 `dist` 打包后上传再解压。
- 线上目录为空时会直接返回 `403 Forbidden`，这种情况优先检查 `index.html` 是否成功解压到 `/var/www/interview-guide`。
- `nginx -t` 的输出通常走标准错误流，但只要退出码是 `0` 就代表校验通过，不要误判成失败。
