async function codechart({img, width, height}) {
  console.log('test');
  let base = d3.select('#image');

  let all_data = await d3.csv('./../data/vcd-codecharts.csv');
  console.log(all_data[0]);

  let xAccessor = d => +d.x;
  let yAccessor = d => +d.y;
  let imgAccessor = d => d.image;

  // 1. filter data by image
  let data = all_data
    .filter(d => imgAccessor(d) == `${img}.jpeg`)
    .filter(d => d.x != 'N/A');
  console.log(data);

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

  // 3. create x and y scales
  let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
  let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

  // 4. draw dots on image
  let dots = container
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(xAccessor(d)))
    .attr('cy', d => yScale(yAccessor(d)))
    .attr('r', 10)
    .attr('opacity', 0.7)
    .attr('fill', '#ffffff');

  // 5. download

  // do not erase after this
}
