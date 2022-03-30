async function bubbleview({img, width, height}) {
  // console.log('test');
  let base = d3.select('#container');

  let all_data = await d3.csv('./../data/vcd-bubbleview.csv');
  // console.log(all_data[0]);

  let xAccessor = d => +d.x;
  let yAccessor = d => +d.y;
  let imgAccessor = d => d.image;

  // 1. filter data by image
  let data = all_data
    .filter(d => imgAccessor(d) == `${img}.jpeg`)
    .filter(d => d.x != 'N/A')
    .filter(d => d.participant == 'g');

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

  // 3. create x and y scales and color scale
  let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
  let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);
  let color = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([
      '#00429d',
      '#3761ab',
      '#5681b9',
      '#73a2c6',
      '#93c4d2',
      '#b9e5dd',
      '#ffffe0',
      '#ffd3bf',
      '#ffa59e',
      '#f4777f',
      '#dd4c65',
      '#be214d',
      '#93003a',
    ]);

  // 4. draw dots on image
  let dots = container
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(xAccessor(d)))
    .attr('cy', d => yScale(yAccessor(d)))
    .attr('r', d => 50)
    .attr('opacity', 0.1)
    .attr('fill', '#ffffff')
    .attr('id', (d, i) => `circle_${i}`);

  // 5. create line
  const lineGenerator = d3
    .line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)));

  container
    .selectAll('.path')
    .data(data)
    .enter()
    .append('path')
    .attr('fill', 'none')
    .attr('stroke-width', 1.25)
    .attr('stroke', '#00fffff')
    .attr('d', d => lineGenerator(data));

  // 6. change first and last circle

  d3.select('#circle_1').attr('opacity', 0.5).attr('fill', 'green');
  d3.select(`#circle_${data.length - 1}`)
    .attr('opacity', 0.5)
    .attr('fill', 'purple');
  // do not erase after this
}
