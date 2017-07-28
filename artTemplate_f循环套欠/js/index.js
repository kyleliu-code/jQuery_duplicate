$(function() {
    // 使用 fastclick
    FastClick.attach(document.body);

    var data = {
        tasks: [
        {
            id: 1234,
            title: 1,
            flag:0,
            taskSteps: '节点3',
            time:"时间...",
            subLists: [
            {
                    text: "hello,world1"
                },
                {
                    text: "hello,world2"
                },
                {
                    text: "hello,world2"
                },
            ]
        },
        {
            id: 1235,
            title: 2,
            flag:1,
            taskSteps: '节点3',
            time:"时间...",
            subLists: [{
                    text: "hello,world1"
                },
                {
                    text: "hello,world2"
                },
                {
                    text: "hello,world2"
                },
            ]
        },
        {
            id: 1236,
            title: 3,
            flag:2,
            taskSteps: '节点3',
            time:"时间...",
            subLists: [{
                    text: "hello,world1"
                },
                {
                    text: "hello,world2"
                },
                {
                    text: "hello,world2"
                },
            ]
        },
        ]

    };

    var html = template('task_tpl', data);
    $("#wrapper").append(html);


    $(".stripe-tit").click(function() {
        var $that = $(this),
            stripCon = $that.next(".stripe-con");
        if (!stripCon.height()) {
            stripCon.height("90px");
            $that.parent().siblings().find(".stripe-con").height(0);

            $that.find('.arrow-icon-down').addClass('up');
            $that.parent().siblings().find('.arrow-icon-down').removeClass('up');
        } else {
            stripCon.height("0");
            $that.find('.arrow-icon-down').removeClass('up');
        }
    });
});


// console.log($(".stripe-tit"));