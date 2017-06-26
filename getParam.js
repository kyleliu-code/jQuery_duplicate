  /**
   * @param  {key}
   * @param  {[url]}
   * @return {[value | ""]}
   */
    var getParam = function(name, url) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        if (url) {
            if (url.indexOf("?") != -1) {
                url = url.split("?")[1];
            } else if (window.location.search.length > 1) {
                url = decodeURI(window.location.search.substr(1));
            } else {
                return "";
            }
        }

        var r = url.match(reg);
        if (r != null) return decodeURI(r[2]);
        return "";
    }

    var xml = "http://www.baidu.com/system/index.html?name=\"夏明\"&age=9";

    // var string ="name=\"小明\"&age=19";

    console.log(getParam("name", xml));