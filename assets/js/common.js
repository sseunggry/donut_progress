let swiperInitialized = false; // ✅ 중복 실행 방지

/* common */
$(function () {
    if($('.btn-head-progress').length){
        svgAniFn();
    }
});

function svgAniFn(){
    const progress = $('.btn-head-progress');
    const circle = $('.btn-head-progress svg .circle');
    const bar = $('.btn-head-progress svg .bar');

    const dataProgress = progress.data('progress');
    const MAX_DEGREE = 359.9;
    let per = 1;

    if(dataProgress.includes('/')){
        const [num, total] = dataProgress.split('/').map(Number);
        per = total == num ? MAX_DEGREE : (360 / total) * num;
    }

    const circleX = circle.attr('cx');
    const circleY = circle.attr('cy');
    const circleR = circle.attr('r');


    // 삼각함수로 시초선에서 n도 벌어진 점의 좌표를 구하는 함수
    const getCoordsOnCircle = ({ x, y, radius, degree }) => {
        const radian = (degree / 180) * Math.PI;
        return {
            x: x + radius * Math.cos(radian),
            y: y + radius * Math.sin(radian),
        };
    };

    // x, y를 중심 축으로 하여 degree(θ)만큼 +방향으로 호를 그리는 함수
    const getArc = (props) => {
        const { x, y, radius, degree } = props;
        const startCoord = getCoordsOnCircle({ ...props, degree: 0 });
        const finishCoord = getCoordsOnCircle({ ...props, degree });

        const isLargeArc = degree > 180 ? 1 : 0;
        const isEnd = degree === MAX_DEGREE;

        // const d = `M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 ${isLargeArc} 1 ${finishCoord.x} ${finishCoord.y} L ${x} ${y} ${isEnd ? 'z' : ''}`;
        const d = `M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 ${isLargeArc} 1 ${finishCoord.x} ${finishCoord.y}`;
        return d;
    };

    bar.attr('d', getArc({ x: 50, y: 50, radius: 40, degree: per }));
    // const arcData = {
    //     x: circle.attr('cx'),
    //     y: circle.attr('cy'),
    //     radius: circle.attr('r'),
    //     degree: 10
    // }
    // const arcData = {
    //     x: 50, y: 50, radius: 40, degree: per
    // }
}

// function d3Circle() {
//     // input data
//     const data = [
//         {
//             name: 'Public Sale',
//             percentage: 20, // percentage
//             value: 80, // millions
//             color: '#0789F8',
//         },
//     ];

//     // retrieve the svg in which to plot the viz
//     const svg = $('.svg');

//     // identify the dimensions of the viewBox to establish the svg canvas
//     const viewBox = svg.attr('viewBox');
//     const regexViewBox = /\d+ \d+ (\d+) (\d+)/;
//     // ! .match() returns string values
//     const [, viewBoxWidth, viewBoxHeight] = viewBox.match(regexViewBox).map(item => Number.parseInt(item, 10));

//     // with the margin convention include a group element translated within the svg canvas
//     const margin = {
//         top: 20,
//         right: 20,
//         bottom: 20,
//         left: 20,
//     };
//     // compute the width and height of the actual viz from the viewBox dimensions and considering the margins
//     // this to later work with width and height attributes directly through the width and height variables
//     const width = viewBoxWidth - (margin.left + margin.right);
//     const height = viewBoxHeight - (margin.top + margin.bottom);

//     // compute the radius as half the minor size between the width and height
//     const radius = Math.min(width, height) / 2;
//     // initialize a variable to have the multiple elements share the same stroke-width property
//     const strokeWidth = 10;

//     const group = svg
//         .append('g')
//         .attr('transform', `translate(${margin.left} ${margin.top})`);


//     // DEFAULT CIRCLE
//     const groupDefault = group
//         .append('g')
//         .attr('transform', `translate(${width / 2} ${height / 2})`);

//     // append the circle showing only the stroke
//     groupDefault
//         .append('circle')
//         .attr('cx', 0)
//         .attr('cy', 0)
//         .attr('r', radius)
//         // .attr('transform', 'rotate(-90)')
//         .attr('fill', 'none')
//         .attr('stroke', 'hsla(0, 0%, 0%, 0.08')
//         .attr('stroke-width', strokeWidth)
//         .attr('stroke-linecap', 'round')
//         // hide the stroke of the circle using the radius
//         // this to compute the circumference of the shape
//         .attr('stroke-dasharray', radius * 3.14 * 2)
//         .attr('stroke-dashoffset', 0);


//     // COLORED CIRCLES
//     const pie = d3
//         .pie()
//         .sort(null)
//         .padAngle(0.12)
//         // use either the value or the percentage in the dataset
//         .value(d => d.value);

//     // arc function to create the d attributes for the path elements
//     const arc = d3
//         .arc()
//         // have the arc overlaid on top of the stroke of the circle
//         .innerRadius(radius)
//         .outerRadius(radius);

//     // wrapping group, horizontally centered
//     const groupArcs = group
//         .append('g')
//         .attr('transform', `translate(${width / 2} ${height / 2})`);

//     const groupsArcs = groupArcs
//         .selectAll('g')
//         .data(pie(data))
//         .enter()
//         .append('g');

//     // include the arcs specifying the stroke with the same width of the circle element
//     groupsArcs
//         .append('path')
//         .attr('d', arc)
//         .attr('fill', 'none')
//         .attr('stroke', d => d.data.color)
//         .attr('stroke-width', strokeWidth * 0.8)
//         .attr('stroke-linecap', 'round')
//         .attr('stroke-linejoin', 'round')
//         // hide the segments by applying a stroke-dasharray/stroke-dashoffset equal to the circle circumference
//         // ! the length of the element varies, and it considered afterwords
//         // for certain the paths are less than the circumference of the entire circle
//         .attr('stroke-dasharray', radius * 3.14 * 2)
//         .attr('stroke-dashoffset', radius * 3.14 * 2);
// }


// $(document).ready(function(){
//     swiperLottieEvent();
// });
$(window).on('load', function(){
    swiperLottieEvent();
});

function swiperLottieEvent() {
    let lottieTimeout;
    let lottieAnimations = [];
    // let isLottieArr = [];

    accIntroSwiper = new Swiper('.acc-intro-swiper .ui-slide-wrap .slider', {
        speed: 500,
        pagination: {
            el: '.swiper-pagination',
            // clickable: true
        },
        on: {
            slideChange: function () {
                if(lottieTimeout) clearTimeout(lottieTimeout);
                lottieTimeout = setTimeout(() => playLottieAni(accIntroSwiper.realIndex), 100);
            }
        }
    });

    function lottieAniSet() {
        document.querySelectorAll('.acc-intro-swiper .fn-ani-set').forEach((el, idx) => {
            const lottie = lottieAnimation(el); // 애니메이션 로드
            lottieAnimations[idx] = lottie; // 애니메이션 배열에 저장

            const onLottieComplete = function () {
                console.log(`Lottie 완료 이벤트 실행: slide ${idx}`, lottie);
                // 마지막 슬라이드인 경우 자동으로 슬라이드 넘기지 않도록 수정
                if (accIntroSwiper.realIndex < accIntroSwiper.slides.length - 1) {
                    accIntroSwiper.slideNext();
                }
            };

            // 이미 리스너가 등록되어 있다면 제거하고 새로 추가
            lottie.removeEventListener('complete', onLottieComplete);  
            lottie.addEventListener('complete', onLottieComplete);
        });
    }

    function lottieAniBackBtnInit() {
        if ($('.page-accident .acc-intro-swiper').length) {
            $('.page-accident .btn-back').on('click', function () {
                let popstate = $(this).parents('.popstate');
                if (popstate.hasClass('current-step-2')) {
                    accIntroSwiper.slideTo(0, 0);
                    lottieAnimations[0].stop();
                    lottieAnimations[0].play();
                }
            });
        }
    }

    function playLottieAni(swiperIdx) {
        lottieAnimations.forEach((el, idx) => {
            if (idx == swiperIdx) {
                if(!el.isPlaying){
                    el.play();
                    el.isPlaying = true;
                }
            } else {
                if(el.isPlaying){
                    el.stop();
                    el.isPlaying = false;
                }
            }
        });
    }

    // 초기 슬라이드에서 Lottie 애니메이션 시작
    setTimeout(() => {
        if (!swiperInitialized) {
            accIntroSwiper.slideTo(0, 0);
            playLottieAni(0);
            swiperInitialized = true;
        }
    }, 50);
    
    lottieAniSet(); // Lottie 애니메이션 초기화
    lottieAniBackBtnInit(); // 뒤로가기 버튼 초기화

    //수정
    // accIntroSwiper.slideTo(0, 0);
    // playLottieAni(0);
}

function lottieAnimation(el, opt){
    if(el !== null && el != void 0 && el.lottieAni){
        el.lottieAni.stop();
        return el.lottieAni;
    }

    var options = Object.assign({
        loop: false,
        speed: 1,
        autoplay: false
    }, opt);

    var defaultPath = '/assets/js/animation/';
    var fileName = el.dataset.aniItem;
    var lottieAni = lottie.loadAnimation({
        container: el,
        path: `${defaultPath}${fileName}.json`,
        renderer: 'svg',
        ...options
    });

    el.lottieAni = lottieAni;
    el.isPlaying = false; //애니메이션 상태 추가
    return lottieAni;
}