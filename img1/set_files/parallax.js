$(function(){
    var section = $('#contents>.parallax>div');
    var sectionInfo = [];
    var objectInfo = [];
    var totalSize = section.size();

    //1.각각의 섹션의 스타일을 fixed로 설정하고 각 섹션의 top값을 배열에 넣기
    section.each(function(i){
        var tg = $(this);
        sectionInfo.push(tg.offset().top);

        //3.object에 시간차를 두고 섹션과 반대로 움직임 주기
        objectInfo.push([]);
        var child = tg.children();
        child.each(function(j){
            var t=$(this);
            objectInfo[i][j]=t.position().top;
        });

        //6.다음 이전 버튼 클릭했을때 해당 섹션으로 이동(move호출)
        var upBtn = tg.find('>.tit>.arrow>a:eq(0)');
        var downBtn = tg.find('>.tit>.arrow>a:eq(1)');
        
        downBtn.click(function(e){
            e.preventDefault();
            if(i==totalSize-1)return;
            move(i+1)
        });

        upBtn.click(function(e){
            e.preventDefault();
            if(i==0)return;
            move(i-1)
        });

       
    });
    section.css('position','fixed');
    //console.log(sectionInfo);
    //console.log(objectInfo);

    //5.move함수 정의
    function move(sectionIndex){
        var tt = sectionInfo[sectionIndex];//[0,1,2]
        $('html,body').animate({scrollTop:tt},{duration:600,ease:'easeOutCubic'});
    }

    //2.스크롤 이벤트 생성
    $(window).scroll(function(){
        var sct = $(window).scrollTop();
        //console.log(sct);

        section.each(function(i){
            var tg = $(this);
            var tt=-1*sct+sectionInfo[i];
            if(sct>sectionInfo[i])tt*=0.5;
            tg.css('top',tt);

            //4.스크롤 이동 위치에 따라 오브젝트의 초소값에서 최대값으로 이동
            var child = tg.children();
            child.each(function(j){
                var t = $(this);
                var start = sectionInfo[i];//시작(부모데이터)
                var end = sectionInfo[i+1]//끝(부모의 스크롤 끝값)
                var min = objectInfo[i][j]//각 오브젝트의 최소 이동값
                var max = objectInfo[i][j]+j*200 + 100;//각 오브젝트의 최대 이동값
                if(!end)end = $(document).height();
                var objectTop=(sct - start)*(max-min)/(end - start)+min;
                t.css('top',objectTop);
                console.log(objectTop);
            })


        });
    });
});
//wrapper end