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
   question: 'HTTP 和 HTTPS 的区别？HTTPS 的加密过程是什么？',
    answer: `### HTTP 和 HTTPS 的区别
- HTTP 是明文传输，请求和响应内容可能被窃听、篡改、伪造
- HTTPS = HTTP + SSL/TLS，在 HTTP 外面加了一层安全通道
- HTTPS 通过证书校验服务端身份，通过加密保护传输内容
- 默认端口不同：HTTP 通常是 80，HTTPS 通常是 443

### HTTPS 的加密过程
#### 阶段 1：客户端发起请求
1. 客户端向服务器发起 HTTPS 请求，并发送：
   - 支持的 SSL/TLS 版本
   - 支持的加密算法列表
   - 客户端随机数 \`Client Random\`

#### 阶段 2：服务器响应
1. 服务器返回：
   - 选择的 SSL/TLS 版本
   - 选择的加密算法
   - 服务器随机数 \`Server Random\`
   - 服务器数字证书，证书中包含公钥

#### 阶段 3：验证服务器证书
1. 客户端会检查：
   - 证书是否由受信任的 CA 签发
   - 证书是否在有效期内
   - 证书中的域名是否与访问域名一致
2. 校验通过后，客户端才信任服务器公钥

#### 阶段 4：密钥交换
1. 客户端生成一个密钥 \`key\`
2. 客户端使用服务器公钥把 \`key\` 加密后发送给服务器
3. 服务器使用私钥解密，得到同一个 \`key\`

#### 阶段 5：生成会话密钥
1. 客户端和服务器基于 \`Client Random\`、\`Server Random\` 和 \`key\`
2. 按相同规则生成会话密钥 \`Session Key\`

#### 阶段 6：加密通信
1. 后续通信内容都使用 \`Session Key\` 做对称加密
2. 这样既保证安全，也保证效率

### 为什么 HTTPS 要混合使用非对称加密和对称加密
- 非对称加密比对称加密复杂得多，性能开销更高，适合安全交换密钥，例如 RSA
- 对称加密速度更快，适合正式数据传输时做高频加解密，例如 AES
- 所以 HTTPS 的常见思路是：先用非对称加密安全交换密钥，再用对称加密保护业务数据`,
    analogy: '可以把 HTTPS 理解成先核验对方证件，再安全地约定一个只有双方知道的保险箱密码，后面所有文件都按这个密码加密传输。',
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
,
  {
   id: 'network-12',
   question: 'TCP 的滑动窗口、流量控制和拥塞控制分别是什么？',
    answer: '这三个概念经常一起问，但不是一回事。\n\n1. 滑动窗口\n- TCP 为了提高吞吐量，不会发一个包等一个确认\n- 而是允许发送方一次发多个未确认的数据包\n- 窗口大小决定了“最多能有多少未确认数据在路上”\n\n2. 流量控制\n- 解决“接收方来不及处理”的问题\n- 接收方通过窗口大小告诉发送方自己还能接多少数据\n- 本质是端到端双方之间的协调\n\n3. 拥塞控制\n- 解决“网络本身扛不住”的问题\n- 不是接收方慢，而是中间链路可能堵了\n- 常见机制有慢启动、拥塞避免、快重传、快恢复\n\n一句话总结：\n- 滑动窗口是机制\n- 流量控制防止对端被撑爆\n- 拥塞控制防止网络被打爆。',
    analogy: '滑动窗口像运输车队同时在路上的车数上限；流量控制像仓库说“我只能再收这么多货”；拥塞控制像整条高速堵车后必须限流。',
    importance: 'high'
  },
  {
   id: 'network-13',
   question: '什么是 IO 多路复用？select 和 epoll 有什么区别？',
    answer: 'IO 多路复用的核心是：一个线程可以同时监听多个连接上的事件，谁就绪就处理谁，不必一个连接配一个线程。\n\nselect：\n- 早期方案\n- 监听 fd 数量有限制\n- 每次调用都要把 fd 集合从用户态拷到内核态\n- 遍历成本高\n\nepoll：\n- Linux 下更常用\n- 通过事件通知机制减少无效遍历\n- 支持更大量连接\n- 更适合高并发网络服务器\n\n面试答题关键：\n- 不要只说“epoll 更快”\n- 要讲清 select 的限制点在拷贝和遍历，epoll 的优势在事件驱动。',
    analogy: 'select 像老师每节课都点全班名；epoll 像谁举手谁发言，不用每次把全班都问一遍。',
    importance: 'high'
  },
  {
   id: 'network-14',
   question: 'TCP 和 ARP 分别工作在哪一层？',
    answer: 'TCP 工作在传输层，负责端到端可靠传输；ARP 主要工作在网络层和链路层之间的地址解析位置，用来把 IP 地址解析成 MAC 地址。\n\n面试里可以顺手补一句：\n- TCP 解决“应用之间如何可靠通信”\n- ARP 解决“局域网里下一跳网卡地址怎么找”。',
    analogy: 'TCP 像快递流程规范，ARP 像把门牌号换成具体住户门口标签。',
    importance: 'medium'
  },
  {
   id: 'network-15',
   question: '推流和断点续传分别怎么理解？',
   answer: '这题本质是在问两类常见网络场景。\n\n1. 推流\n- 指把音视频数据持续发送到服务端或分发节点\n- 常见于直播、实时音视频\n- 重点关注延迟、连续性、带宽和丢包处理\n\n2. 断点续传\n- 指文件传输中断后，从上次完成的位置继续传\n- 常见于大文件上传下载\n- 重点是分片、偏移量记录、幂等和校验\n\n一句话区分：\n- 推流更关注“实时连续输出”\n- 断点续传更关注“中断后从哪里接着传”',
   analogy: '推流像直播不断把画面送出去；断点续传像搬家搬到一半下雨了，第二天从上次停下的位置继续搬。',
   importance: 'medium'
  }
];
