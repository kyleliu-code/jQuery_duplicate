# cookie

1. cookie 作为浏览器于服务器通信协议的一部分，所以需要通过服务器访问的模式，才能操作 cookie 
2. cookie 可以用于网页间的传值
3. cookie 用于浏览器与服务器间的通信，而webStorage 用于浏览器本地存储
4. cookie 在设置有效期前有效（需要expires设置有效期），一般可以用于 记录sessionid（会话id）
5. sessionStorage 在浏览器的会话窗口关闭前有效
6. localStorage 永有效
7. 三者 都是同源的，cookie 和 localStorage 对同源窗口共享数据，sessionStorage只针对当前会话窗口
8. 暂且学习到 cookie 同源传值，还有 设置有效期，获取cookie值