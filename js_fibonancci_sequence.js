// ### 斐波那契数列（Fibonacci sequence）
// > 递归的定义

// F(0)=0，F(1)=1, F(n)=F(n-1)+F(n-2)（n>=2，n∈N*）


function fib(n) {
    if (n <= 2) alert(1);
    else {
        var a = 1,
            b = 1,
            t;
        for (var i = 0; i < n - 2; ++i) {
            t = a + b;
            a = b;
            b = t;
        }
        alert(b);
    }
}