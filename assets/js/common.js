/* common */
$(function () {
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
});

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