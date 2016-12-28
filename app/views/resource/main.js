(function() {
    try {
        var mySwiper = new Swiper('.swiper-container', {
            // autoplay: 1000,//可选选项，自动滑动
            direction: 'vertical',
        })

    // var mySwiper = new Swiper('.content', {
    //     // Optional parameters
    //     direction: 'vertical',
    //     // speed: 800,
    //     // nested: true,
    //     // followFinger: false,
    //     // onSlideChangeEnd: function() {
    //     //     var index = mySwiper.activeIndex;
    //     //     if (index == 0) {
    //     //         hylink.trackPV('MOB端-迈锐宝XL强化形象项目落地页-首页', '/home');
    //     //     } else if (index == 1) {
    //     //         hylink.trackPV('MOB端-迈锐宝XL强化形象项目落地页-车型亮点页', '/fbi');
    //     //     } else {
    //     //         hylink.trackPV('MOB端-迈锐宝XL强化形象项目落地页-车型配置页', '/specification');
    //     //         myScroll.refresh();
    //     //     }
    //     // }
    // });


    // var fbiswiper = new Swiper('.fbi', {
    //     spaceBetween: '-10%'
    // });



    // $('body').on('touchmove', function(event) {
    //     event.preventDefault();

    // });

    // if (hylink.getCookie("agree_policy") == "1") {
    //     $("#agree_policy").get(0).checked = true;
    // };

    // $('#td').on('submit', function(e) {
    //     e.preventDefault();

    //     var _this = $(this);
    //     var mobile = $('#mobile').val();
    //     var realname = $('#realname').val();
    //     var checked = $('#agree_policy').is(':checked');
    //     if (realname == '') {
    //         alert('请填写姓名');
    //     } else if (!hylink.checkMobile(mobile)) {
    //         alert('请填写正确的手机号码');
    //     } else if (!checked) {
    //         alert('需要同意隐私政策才能继续');
    //     } else {
    //         _this.addClass('disabled');
    //         hylink.testdrive(function(obj) {
    //             if (obj.status == 'suc') {
    //                 $('body').append('<iframe src="gctd.html" frameborder="0" height="0" width="0" />');
    //                 alert('提交成功');
    //             } else {
    //                 alert('提交出错, ' + obj.msg);
    //             }
    //             _this.removeClass('disabled');
    //         }, realname, mobile, '迈锐宝XL');
    //         hylink.setCookie("agree_policy", "1", 3650);
    //     }



    // });


    // hylink.trackPV('MOB端-迈锐宝XL强化形象项目落地页-首页', '/home');
    // hylink.setTestdriveClickEvent('MOB端-迈锐宝XL强化形象项目落地页-所有页面预约试驾', '迈锐宝XL强化形象项目落地页', '点击', '所有页面预约试驾');
    // hylink.setTestdriveSuccessPV('MOB端-迈锐宝XL强化形象项目落地页-所有页面预约试驾成功');


    // var _locaHost = window.location.hostname
    // var _dataPath = _locaHost == 'm.chevrolet.com.cn' ? 'http://www.chevrolet.com.cn/data/' : 'http://webtest.chevrolet.com.cn/data/';
    // var _car = 'malibu-xl';
    // var $cartype = $('#cartype');
    // var datas, datas2, myScroll;
    // var spec = {
    //     init: function() {
    //         this.checkParam();
    //     },

    //     getCar: function() {
    //         var param = _car;
    //         var car = param.replace('_', '-');
    //         var link = car.indexOf('aveo') != -1 ? 'aveo' : car;
    //         return {
    //             car: car,
    //             link: link
    //         };
    //     },
    //     checkParam: function() {
    //         var _this = this;
    //         var file = this.getCar().car;
    //         file = file == 'aveo' ? 'aveo-hb' : file;
    //         var json = _dataPath + file + '.json'
    //         $.ajax({
    //             url: json,
    //             type: 'get',
    //             error: function() {
    //                 $('.spec').html('<p class="error">参数错误<a href="/" >返回首页</a></p>');
    //             },
    //             success: function(data) {
    //                 datas = data;
    //                 spec.setCars();
    //                 if (file.indexOf('aveo') != -1) _this.getAveoNb();

    //             }
    //         });
    //     },
    //     setCars: function() {
    //         this.bindEvent();
    //         var str = '',
    //             aveo = '';
    //         var cars = datas.name;
    //         var titile = cars[0].car;
    //         if (titile.indexOf('爱唯欧') != -1) {
    //             aveo = '（两厢）';
    //             titile = '新爱唯欧';
    //         };
    //         $('.spec .title h3').text(titile);
    //         $('.car-pic').html('<img src="http://m.chevrolet.com.cn/v2/images/spec/' + this.getCar().car + '.jpg">');
    //         for (var i = 0; i < cars.length; i++) {
    //             str += '<option data-type="1" value="' + cars[i].model + '">' + cars[i].model + aveo + '</option>';
    //         };
    //         $cartype.html(str).change();
    //         $('a.back-car').attr('href', "../" + this.getCar().car);

    //     },
    //     bindEvent: function() {
    //         $cartype.on('change', function(event) {
    //             var val = $(this).val();
    //             var data = $(this).children('option:selected').data('type');
    //             data = data == '1' ? datas : datas2;
    //             $('.spec-table-box').html(hylink.specJsonToTable(data, val));
    //             accordion.init();
    //             $(this).prev('.seltxt').text(val)
    //         });
    //     },

    //     getAveoNb: function() {
    //         var json = _dataPath + 'aveo-nb.json';
    //         var _this = this;
    //         $.getJSON(json, function(json) {
    //             datas2 = json;
    //             _this.setAveoNb();
    //         });
    //     },
    //     setAveoNb: function() {
    //         this.bindEvent();
    //         var str;
    //         var cars = datas2.name;
    //         for (var i = 0; i < cars.length; i++) {
    //             str = '<option data-type="2" value="' + cars[i].model + '">' + cars[i].model + '（三厢）</option>';
    //             $cartype.append(str);
    //         };


    //     }


    // };
    // var accordion = {
    //     init: function() {
    //         this.bindEvent();
    //         setIscroll();


    //     },
    //     getElem: function(o) {
    //         var item = o.parent('.accordion-item');
    //         var wrap = o.next('.accordion-wrap');
    //         return {
    //             i: item,
    //             w: wrap
    //         }

    //     },
    //     bindEvent: function() {
    //         var acboxs = $('.accordion-box');
    //         if (acboxs.length == 0 || acboxs.data('status') == 'disabled') return;
    //         acboxs.each(function() {
    //             $(this).find('.sub-title').on('tap', function(event) {
    //                 $(this).parent('.accordion-item').toggleClass('open');
    //                 myScroll.refresh();

    //             });
    //         });
    //         var firlstTitle = acboxs.find('.accordion-item:first');
    //         firlstTitle.addClass('open');
    //         // firlstTitle.find('.accordion-wrap').show();
    //     }
    // };
    // spec.init();



    // function setIscroll() {
    //     myScroll = new IScroll('#sbox', {});
    //     myScroll.on('scrollStart', function() {
    //         if (myScroll.y < 0) {
    //             mySwiper.lockSwipes();
    //         }
    //     });
    //     myScroll.on('scrollEnd', function(event) {
    //         if (myScroll.y == 0) {
    //             mySwiper.unlockSwipes();
    //         }
    //     });
    //     // 

    // };
    }catch(e){alert(e)}


})();
