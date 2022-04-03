async function pathMath(img) {
  let all_data = await d3.csv('./../data/vcd-bubbleview.csv');

  let container = d3.select('#container');

  let section = container.append('div').append('h1').text(img);

  let xAccessor = d => +d.x;
  let yAccessor = d => +d.y;
  let imgAccessor = d => d.image;

  let data = all_data
    .filter(d => imgAccessor(d) == `${img}.jpeg`)
    .filter(d => d.x != 'N/A');

  const participants = [
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
  ];

  participants.forEach(p => {
    let _data = data.filter(d => d.participant == p);

    let pathLength = [];

    for (let i = 1; i < _data.length; i++) {
      let p1 = _data[i - 1];
      let p2 = _data[i];

      // find deltaX between p1 and p2
      let deltaX = xAccessor(p2) - xAccessor(p1);
      let deltaY = yAccessor(p2) - yAccessor(p1);

      let _distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

      pathLength.push(_distance);
    }

    // sum all path segmentes
    let totalDistance = d3.sum(pathLength);

    // find mean path segment
    let meanSegment = d3.mean(pathLength);

    // find median path segment
    let medianSegment = d3.median(pathLength);

    container
      .append('p')
      .text(
        `${p}, ${img}, ${_data.length}, ${totalDistance}, ${meanSegment}, ${medianSegment}`
      );
  });
}
