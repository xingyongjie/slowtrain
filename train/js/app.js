/** 位置速度控制参数  单位px */
let control = {
    scroll: 1,
    enable: {
        mt4: false,
    }
}
let city = {
    curPos: 115,
    scrollScale: 30,
}
let train = {
    curPos: 100,
    scrollScale: 15,
}
let num = {
    score: 1,
    init: 1,
    scale: 1,
    curPos: 0,
    scrollScale: 3,
}

let cityBlockerIndex = 5;
let contentDiv = ['mt-2', 'mt-4', 'mt-6', 'mt-7', 'mt-8'];

scoreDisplay = document.getElementById("number");


//判断窗口变化
window.onresize = window.onload = function () {

};

//检查是否激活动画
function enableAnimation(targetElement, targetOffset, enable) {
    let html = document.documentElement
    // console.info(html.scrollTop +':'+ parseInt(targetElement.offsetTop + targetOffset) +  ":"+control.enable.mt4)

    if (html.scrollTop > parseInt(targetElement.offsetTop + targetOffset)) {
        control.enable.mt4 = true
    } else if (html.scrollTop < parseInt(targetElement.offsetTop + targetOffset)) {
        control.enable.mt4 = false
    }
    text = document.getElementsByClassName("section-container")[0];
    console.log(document.getElementsByClassName('mt-4_container').offsetHeight);
    console.log(html.scrollTop);
}

//检查mt-4动画
function mt4AnimaCheck() {
    let mt4 = document.getElementsByClassName('mt-4')[0]
    enableAnimation(mt4, 100, control)
}

//检查所有动画是否开启
function checkAllAnimation() {
    mt4AnimaCheck()
}


//判断鼠标滚轮滚动方向
if (window.addEventListener)//FF,火狐浏览器会识别该方法
    window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;//W3C
//统一处理滚轮滚动事件
function wheel(event) {
    let delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
    } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail / 3;
    }
    if (delta)
        handle(delta);
}

//上下滚动时的具体处理函数
function handle(delta) {
    checkAllAnimation()
    if (!control.enable.mt4) {
        return
    }

    // if (expireTime > new Date().getTime()) {
    //     return;
    // } else {
    //     expireTime = new Date().getTime() + 5;
    // }
    if (control.scroll < 0) {
        control.scroll = 0;
    }
    if (control.scroll > 140) {
        control.scroll = 140;
    }
    if (delta < 0) {//向下滚动
        handleScrollUp();
    } else {//向上滚动
        handleScrollDown();
    }
}


//播放层效果
function layerPlay(name, pos, time) {
    TweenMax.to("." + name, time, {left: pos, ease: Linear.easeOut})
}

//控制火车运动
function trainMovePlay(name, direction) {
    //set train move steps limit here
    // if (control.scroll > 6 && train.scrollScale > 10) {
    //     train.scrollScale += 2
    //     return
    // }
    // 0: go forward 1:go Back
    let html = document.documentElement;
    let trainImgWidth = window.screen.width;
    let mat4Height = document.getElementsByClassName("mt-4")[0].scrollHeight;
    let pos = (html.scrollTop - 1920 * (cityBlockerIndex - 2) > mat4Height ? 0 : html.scrollTop - 1920 * (cityBlockerIndex - 2)) / mat4Height * (trainImgWidth + trainImgWidth * 2);
    pos = pos < -50 ? -50 : pos;
    pos = pos > trainImgWidth + trainImgWidth * 0.2 ? trainImgWidth + trainImgWidth * 0.2 : pos;
    train.curPos = pos;
    // train.curPos = (direction === 0) ? train.curPos + train.scrollScale : train.curPos - train.scrollScale
    TweenMax.to("." + name, 2, {left: train.curPos, ease: Linear.easeOut})
}

function numberPlay(name, direction) {
    let html = document.documentElement;
    let trainImgWidth = window.screen.width / 2;
    let mat4Height = document.getElementsByClassName("mt-4")[0].scrollHeight;

    let scrollPercent = (html.scrollTop - 1920 * (cityBlockerIndex - 2.5) > mat4Height ? 0 :
        html.scrollTop - 1920 * (cityBlockerIndex - 2.5)) / mat4Height;
    num.score = parseInt(((scrollPercent * 2) * 81).toFixed());
    showScore();

    let pos = -scrollPercent * trainImgWidth;
    pos = pos > 100 ? 100 : pos;
    pos = pos < -600 ? -600 : pos;
    num.curPos = pos;

    // num.curPos = (direction === 0) ? control.scroll * (-num.scrollScale) : num.curPos + num.scrollScale
    TweenMax.to("#" + name, 0.7, {
        left: num.curPos, ease: Linear.easeOut,
        onComplete: function () {
            //控制数字变化
            // num.score += direction === 0 ? 1 : -1;
        }
    });
}

function calculateCityPosition() {
    let cityBlockerIndex = 4.5;
    let html = document.documentElement;
    let trainImgWidth = document.getElementsByClassName("city-img-b")[0].scrollWidth;
    let mat4Height = document.getElementsByClassName("mt-4")[0].scrollHeight;
    let pos = -(html.scrollTop - 1920 * (cityBlockerIndex - 2) > mat4Height ? 0 : html.scrollTop - 1920 * (cityBlockerIndex - 2)) / mat4Height * (trainImgWidth + trainImgWidth * 0.35);

    pos = pos < -html.clientWidth * 4.9 ? -html.clientWidth * 4.9 : pos;
    pos = pos > 0 ? 0 : pos;
    return pos;
}

function handleScrollUp() {
    //记录鼠标滚动
    control.scroll++;
    //控制cityLine运动
    // city.curPos = (-city.scrollScale) * control.scroll;

    city.curPos = calculateCityPosition();
    //开始顶层动画
    TweenMax.to(".city-img", 1.5, {
        left: city.curPos, ease: Linear.easeOut,
        onStart: function () {
            //触发火车动画
            trainMovePlay('city-train', 0)
            //数字动画
            numberPlay('number', 0)

        }
    });
    // TweenMax.to(".city-svg-2", 1.5, {left:curPos+10, repeat:0, yoyo:true});
}

function handleScrollDown() {
    control.scroll--;
    //控制cityLine运动
    // if (control.scroll < 0) {
    //     //限制向前滑动
    //     return
    // }

    city.curPos = calculateCityPosition();

    // city.curPos += city.scrollScale
    TweenMax.to(".city-img", 0.5, {
        left: city.curPos, ease: Linear.easeOut,
        onStart: function () {
            //触发火车动画
            trainMovePlay('city-train', 1)
            //控制数字运动
            numberPlay('number', 1)
        }
    });


}

//在tween update时通过这个function输出.
function showScore() {
    if (num.score < 0) {
        num.score = 0
    }
    if (num.score > 81) {
        num.score = 81
    }
    scoreDisplay.innerHTML = num.score.toFixed(0);
}


const map_and_text = document.querySelector('.map-and-desc')

const matHeight = map_and_text.getBoundingClientRect().height

const html = document.documentElement

document.addEventListener('scroll', (e) => {
    let scrolled = html.scrollTop / (matHeight + map_and_text.offsetTop)
//   console.log(`scrollTop: ${html.scrollTop}  + matHeight: ${matHeight} + scrolled: ${scrolled} + clientHeight: ${html.clientHeight}`)
    console.log(`scrolled: ${scrolled}`)

    //12张图的区间参数                                            起始值 结束值 当前滑动位置
    map_and_text.style.setProperty('--map-g0-0', mapDisplayStatus(8, 11, scrolled))
    map_and_text.style.setProperty('--map-g0-1', mapDisplayStatus(11, 12, scrolled))
    map_and_text.style.setProperty('--map-g0-2', mapDisplayStatus(12, 13, scrolled))
    map_and_text.style.setProperty('--map-g1-0', mapDisplayStatus(13, 14, scrolled))
    map_and_text.style.setProperty('--map-g1-1', mapDisplayStatus(14, 15, scrolled))
    map_and_text.style.setProperty('--map-g1-2', mapDisplayStatus(15, 16, scrolled))
    map_and_text.style.setProperty('--map-g2-0', mapDisplayStatus(16, 17, scrolled))
    map_and_text.style.setProperty('--map-g2-1', mapDisplayStatus(17, 18, scrolled))
    map_and_text.style.setProperty('--map-g2-2', mapDisplayStatus(18, 19, scrolled))
    map_and_text.style.setProperty('--map-g3-0', mapDisplayStatus(19, 20, scrolled))
    map_and_text.style.setProperty('--map-g3-1', mapDisplayStatus(20, 21, scrolled))
    map_and_text.style.setProperty('--map-g3-2', mapDisplayStatus(21, 22, scrolled))
    //4块文字的区间参数                                        起始值 结束值 当前滑动位置
    map_and_text.style.setProperty('--desc-0', caculateDisplay(2, 13, scrolled))
    map_and_text.style.setProperty('--desc-1', caculateDisplay(13, 16, scrolled))
    map_and_text.style.setProperty('--desc-2', caculateDisplay(16, 19, scrolled))
    map_and_text.style.setProperty('--desc-3', caculateDisplay(19, 22, scrolled))


    // console.log(`map-g0-0透明度: ${map_and_text.style.getPropertyValue('--map-g0-0')}`)
    // console.log(`map-g0-1透明度: ${map_and_text.style.getPropertyValue('--map-g0-1')}`)
    // console.log(`map-g0-2透明度: ${map_and_text.style.getPropertyValue('--map-g0-2')}`)
    // console.log(`map-g1-0透明度: ${map_and_text.style.getPropertyValue('--map-g1-0')}`)
    // console.log(`map-g1-1透明度: ${map_and_text.style.getPropertyValue('--map-g1-1')}`)
    // console.log(`map-g1-2透明度: ${map_and_text.style.getPropertyValue('--map-g1-2')}`)
    // console.log(`map-g2-0透明度: ${map_and_text.style.getPropertyValue('--map-g2-0')}`)
    // console.log(`map-g2-1透明度: ${map_and_text.style.getPropertyValue('--map-g2-1')}`)
    // console.log(`map-g2-2透明度: ${map_and_text.style.getPropertyValue('--map-g2-2')}`)
    // console.log(`map-g3-0透明度: ${map_and_text.style.getPropertyValue('--map-g3-0')}`)
    // console.log(`map-g3-1透明度: ${map_and_text.style.getPropertyValue('--map-g3-1')}`)
    // console.log(`map-g3-2透明度: ${map_and_text.style.getPropertyValue('--map-g3-2')}`)

    setAnchorPoint(html.scrollTop);
    storySwitch(html.scrollTop);
})

function calculateOpacity(start, end, percent) {
    if (percent - start < 0) return 0
    if (percent - end > 0) return 0
    console.info('Opacity:' + (percent - start) / (end - start))
    return (percent - start) / (end - start)
}

function mapDisplayStatus(start, end, percent) {
    if (percent - start < 0) return 'mapDisappear'
    if (percent - end > 0) return 'mapDisappear'
    return 'mapDisplay'
}

function caculateDisplay(start, end, cur, name) {
    if (cur > start && cur < end) {
        // console.info('display')
        return "descIn 1s ease-in 1s 1 normal forwards"
    } else {
        // console.info('none')
        return "descOut 1s ease-out 0s 1 normal forwards"
    }
}

function anchorOnClick(index) {
    console.debug(index);
    window.scrollTo(0, document.getElementsByClassName(contentDiv[index])[0].offsetTop);
}

function setAnchorPoint(htmlScrollTop) {
    contentDiv.forEach((divClassName, index) => {
        let divOffsetTop = document.getElementsByClassName(contentDiv[index])[0].offsetTop;
        if (index < contentDiv.length - 1) {
            let nextDivOffsetTop = document.getElementsByClassName(contentDiv[index + 1])[0].offsetTop;
            console.log(divOffsetTop)
            console.log(nextDivOffsetTop)
            if (htmlScrollTop >= divOffsetTop - 100 && htmlScrollTop < nextDivOffsetTop - 100) {
                document.getElementById('anchor_point_' + index).style.setProperty("opacity", "100%");
            } else {
                document.getElementById('anchor_point_' + index).style.setProperty("opacity", "0");
            }
        } else {
            if (htmlScrollTop >= divOffsetTop - 100) {
                document.getElementById('anchor_point_' + index).style.setProperty("opacity", "100%");
            } else {
                document.getElementById('anchor_point_' + index).style.setProperty("opacity", "0");
            }
        }
    })
}

function mouseOverMenu() {
    document.getElementById('menu').style.setProperty("animation", "menuIn 0.2s linear 0s 1 normal forwards");
}

function mouseLeaveMenu() {
    document.getElementById('menu').style.setProperty("animation", "menuOut 0.2s linear 0s 1 normal forwards");
}

function storySwitch(htmlScrollTop) {
    let storyDivIdList = ['story1', 'story2', 'story3'];
    // let storyContent = {
    //     story1: ['story11', 'story12', 'story13', 'story14', 'story15'],
    // }

    let storyDivId = storyDivIdList.find((divId, index) => {
        let divOffsetTop = document.getElementById(divId).offsetTop;
        return htmlScrollTop >= divOffsetTop && htmlScrollTop < divOffsetTop + 5 * window.screen.height;
    })

    if (storyDivId) {
        let content = Array.from(document.getElementById(storyDivId + '_img').childNodes);
        let divOffsetTop = document.getElementById(storyDivId).offsetTop;
        content = content.filter(cnode => cnode.nodeName !== "#text");
        let step = document.getElementById(storyDivId).clientHeight / (content.length + 1);
        content.forEach((contentDiv, index) => {
            switch (index) {
                case 0:
                    break;
                case 1:
                case 2:
                    if (htmlScrollTop >= divOffsetTop + step * index) {
                        contentDiv.style.setProperty("animation", "mapDisplay 0.5s linear 0s 1 normal forwards");
                    } else if (htmlScrollTop < divOffsetTop + step * index) {
                        contentDiv.style.setProperty("animation", "mapDisappear 0.5s linear 0s 1 normal forwards");
                    }
                    break;
                case content.length - 1:
                    if (htmlScrollTop >= divOffsetTop + step * index) {
                        contentDiv.style.setProperty("animation", "mapDisplay 0.5s linear 0s 1 normal forwards");
                    } else {
                        contentDiv.style.setProperty("animation", "mapDisappear 0.5s linear 0s 1 normal forwards");
                    }
                    break;
                default:
                    if (htmlScrollTop >= divOffsetTop + step * index && htmlScrollTop < divOffsetTop + step * (index + 1)) {
                        contentDiv.style.setProperty("animation", "mapDisplay 0.5s linear 0s 1 normal forwards");
                    } else {
                        contentDiv.style.setProperty("animation", "mapDisappear 0.5s linear 0s 1 normal forwards");
                    }
                    break;
            }
        })

    }
}



