// 计算机网络面试题
import { InterviewPoint } from './command-types';

export const NETWORK_POINTS: InterviewPoint[] = [
  {
   id: 'net-1',
   question: 'TCP 三次握手和四次挥手的过程？',
    answer: '握手：1. 客户端发 SYN。2. 服务端回 SYN+ACK。3. 客户端回 ACK。挥手：1. 主动方发 FIN。2. 被动方回 ACK。3. 被动方发 FIN。4. 主动方回 ACK。',
    analogy: '握手：喂，听得到吗？（SYN）听得到，你呢？（SYN+ACK）我也听到了。（ACK）。挥手：我不说了。（FIN）好，等我把最后一句说完。（ACK）我也说完了。（FIN）行，挂了。（ACK）',
    importance: 'high'
  },
  {
   id: 'net-2',
   question: 'HTTP 和 HTTPS 的区别？',
    answer: 'HTTPS = HTTP + SSL/TLS。HTTPS 使用对称加密传输数据，非对称加密交换密钥，并使用 CA 证书验证身份。端口 HTTP 是 80，HTTPS 是 443。',
    analogy: 'HTTP 是明信片，谁都能看；HTTPS 是把信装进保险箱（加密），并由公证处（CA）贴上封条。',
    importance: 'high'
  },
  {
   id: 'net-3',
   question: 'TCP 和 UDP 的区别？',
    answer: 'TCP 面向连接、可靠、基于字节流、有流量控制和拥塞控制。UDP 无连接、不可靠、基于报文、速度快。',
    analogy: 'TCP 就像打电话，必须接通才能说，说错了还能重说；UDP 就像广播，只管喊，听没听到不管。',
    importance: 'high'
  },
  {
   id: 'net-4',
   question: '从输入 URL 到页面展示发生了什么？',
    answer: '1. DNS 解析。2. 建立 TCP 连接。3. 发送 HTTP 请求。4. 服务端处理并返回。5. 浏览器解析渲染。6. 连接关闭。',
    analogy: '就像去饭店吃饭：查地图找地址（DNS）-> 进店坐下（TCP）-> 点菜（Request）-> 厨师做菜（Server）-> 端上来开吃（Render）-> 结账走人（Close）。',
    importance: 'high'
  },
  {
   id: 'net-5',
   question: 'HTTP 常见的状态码有哪些？',
    answer: '1xx：信息。2xx：成功（200 OK）。3xx：重定向（301 永久，302 临时，304 缓存）。4xx：客户端错误（400 请求错误，401 未授权，403 禁止，404 未找到）。5xx：服务器错误（500 服务器错误，502 网关错误，503 服务不可用）。',
    analogy: '2xx 像【外卖送达】；3xx 像"您拨打的电话已转接到另一个号码"；4xx 像【你点了一道不存在的菜】；5xx 像【厨房炸了】。',
    importance: 'high'
  },
  {
   id: 'net-6',
   question: 'HTTP/1.1、HTTP/2、HTTP/3 的区别？',
    answer: 'HTTP/1.1：文本传输，队头阻塞。HTTP/2：二进制传输，多路复用，头部压缩，服务器推送。HTTP/3：基于 UDP（QUIC 协议），解决 TCP 队头阻塞，握手更快。',
    analogy: 'HTTP/1.1 像【单车道公路】，一辆车堵了后面都过不去；HTTP/2 像【多车道高速】，可以并行；HTTP/3 像【直升机】，根本不走地面（UDP），想飞哪飞哪。',
    importance: 'high'
  },
  {
   id: 'net-7',
   question: 'WebSocket 和 HTTP 的区别？应用场景？',
    answer: 'HTTP 是短连接、单向（客户端请求 - 服务端响应）。WebSocket 是长连接、双向通信（全双工）。适用于实时聊天、在线游戏、股票行情推送等场景。',
    analogy: 'HTTP 像【打电话】：你打一次他接一次，说完就挂；WebSocket 像【对讲机】：按住就能说，一直在线。',
    importance: 'high'
  },
  {
   id: 'net-8',
   question: 'DNS 解析的过程是怎样的？',
    answer: '1. 浏览器缓存。2. 系统缓存（hosts 文件）。3. 本地 DNS 服务器（LDNS）。4. 根域名服务器。5. 顶级域名服务器（TLD）。6. 权威域名服务器。查询方式有递归查询和迭代查询。',
    analogy: 'DNS 解析像【查户口】：你先翻自己手机通讯录（浏览器缓存）-> 问家人（系统缓存）-> 问小区物业（LDNS）-> 问派出所（根）-> 问市局（TLD）-> 最后找到具体地址（权威）。',
    importance: 'medium'
  },
  {
   id: 'net-9',
   question: '什么是 CDN（内容分发网络）？原理是什么？',
    answer: 'CDN 是将内容分发到全球各地的边缘节点，用户就近访问。原理是通过 CNAME 将域名解析到 CDN 的负载均衡器，根据用户 IP 选择最优节点。',
    analogy: 'CDN 像【连锁超市】：总部（源站）生产商品，各地仓库（边缘节点）备货。你下单后从最近的仓库发货，不用等总部快递。',
    importance: 'medium'
  },
  {
   id: 'net-10',
   question: 'GET 和 POST 的区别？',
    answer: '1. 语义：GET 用于获取，POST 用于提交。2. 参数位置：GET 在 URL，POST 在 body。3. 长度限制：GET 有限制（约 2KB），POST 理论上无限制。4. 安全性：POST 相对安全。5. 幂等性：GET 幂等，POST 不幂等。',
    analogy: 'GET 像【明信片】：内容写在正面，谁都能看到，而且只能写这么多；POST 像【信封】：内容装在里面，可以很厚。',
    importance: 'high'
  },
  {
   id: 'net-11',
   question: '什么是跨域？如何解决？',
    answer: '跨域是指协议、域名、端口号有一个不同。解决方案：1. CORS（后端设置 Access-Control-Allow-Origin）。2. JSONP（只支持 GET）。3. Nginx 反向代理。4. WebSocket。5. postMessage。',
    analogy: '跨域像【串门】：你家（域名 A）的人不能直接进邻居家（域名 B）拿东西。CORS 是邻居开门说"进来吧"；JSONP 是隔着窗户递东西；反向代理是找个中间人传话。',
   importance: 'high'
  }
  ,
  {
   id: 'network-8',
   question: 'Cookie 和 Session 有什么区别和联系？',
    answer: 'Cookie 存在客户端浏览器，Session 主要存在服务端。Cookie 常用来保存会话标识，浏览器后续请求会把它带上，服务端再根据这个标识找到对应 Session 数据。Cookie 体积小、可持久化，但容易被篡改，需要配合 HttpOnly、Secure 等属性；Session 安全性更高，但会占用服务端资源。',
    analogy: 'Cookie 像用户手里的取号单，Session 像服务台内部保存的办事记录，二者配合才能对上同一个人。',
    importance: 'medium'
  }
];
