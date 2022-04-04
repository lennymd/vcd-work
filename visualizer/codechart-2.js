async function codechart({img, width, height}) {
  console.log('test');
  let base = d3.select('#container');

  let all_data = await d3.csv('./../data/vcd-codecharts+bubbleview.csv');
  let bubbleview = await d3.csv('./../data/vcd-bubbleview.csv');
  // console.log(all_data[0]);

  let xAccessor = d => +d.x;
  let yAccessor = d => +d.y;
  let imgAccessor = d => d.image;
  let testAccessor = d => d.test;

  // 1. filter data by image
  let data = all_data
    .filter(d => imgAccessor(d) == `${img}.jpeg`)
    .filter(d => d.x != 'N/A');

  let lastClickPre = bubbleview
    .filter(d => imgAccessor(d) == `${img}.jpeg`)
    .filter(d => d.x != 'N/A');

  console.log(lastClickPre);

  let lastClick = [];
  ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'].forEach(part => {
    // filter so we only have this data.
    let partData = lastClickPre.filter(d => d.participant == part);
    lastClick.push(partData[partData.length - 1]);
  });
  console.log(lastClick);

  // 2. load image
  const container = base
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  container
    .append('image')
    .attr('xlink:href', `./../images/${img}.jpeg`)
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height);

  container
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .attr('fill', '#fff')
    .attr('opacity', 0.5);

  // 3. create x and y scales
  let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
  let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);
  let color = d3
    .scaleOrdinal()
    .domain(['bubbleview', 'codecharts'])
    .range(['green', 'yellow']);
  // 4. draw dots on image
  let dots = container
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(xAccessor(d)))
    .attr('cy', d => yScale(yAccessor(d)))
    .attr('r', 10)
    .attr('opacity', 0.75)
    .attr('fill', d => color(testAccessor(d)));

  container
    .selectAll('dot2')
    .data(lastClick)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(xAccessor(d)))
    .attr('cy', d => yScale(yAccessor(d)))
    .attr('r', 10)
    .attr('opacity', 0.75)
    .attr('fill', 'purple');

  // do not erase after this
}
