$(function() {
    var total = 17;
    var zWin = $(window);
    var ul = $('#container');

    function render() {
        var margin = 2;
        var winWidth = zWin.width();
        var picWidth = Math.floor((winWidth - margin * 3) / 4);
        for (var i = 1; i <= total; i++) {
            imgSrc = 'images/' + i + '.jpg';
            console.log(winWidth);
            console.log(picWidth);
            var p = 2;
            if (i % 4 == 1) {
                p = 0;
            }
            ul.append('<li data-id="'+i+'" class="animated bounceIn" style="width:' + picWidth + 'px;height:' + picWidth + 'px;margin-left:' + p + 'px;margin-top:' + margin + 'px"><canvas id="cvs_' + i + '"></canvas></li>');
            var imageObj = new Image();
            imageObj.index = i;
            imageObj.onload = function () {
                var cvs = $('#cvs_' + this.index)[0].getContext('2d');
                cvs.width = picWidth;
                cvs.height = picWidth;
                cvs.drawImage(this,0,0);
            };
            imageObj.src = imgSrc;
        }



    }
    render();

    var lImage = $('#large-img');
    function loadImg(id){
        $('#large_container').css({
            width: zWin.width(),
            height: zWin.height()
        }).show();
        var imgSrc ='images/'+id+'.large.jpg';
        var imgObj = new Image();
        imgObj.onload = function(){
            var w = this.width;
            var h = this.height;
            var winWidth = zWin.width();
            var winHeight = zWin.height();
            var realw = winHeight*(w/h),
            realh = winWidth*(h/w);
            var paddingLeft = Math.floor((winWidth-realw)/2),
            paddingTop = Math.floor((winHeight-realh)/2);
            console.log(realw);
            console.log(winWidth);
            if(h/w > 1.2){
                lImage.attr('src',imgSrc).css({
                    height: winHeight,
                    paddingLeft: paddingLeft
                })
            }
            else{
                lImage.attr('src',imgSrc).css({
                    width: winWidth,
                    paddingTop: paddingTop
                })
            }
        }
        imgObj.src = imgSrc;
    }

    $('#container').on('tap','li',function(){
        var _id = $(this).attr('data-id');
        loadImg(_id);
    })
});
