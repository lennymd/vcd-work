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
    .filter(d => d.x != 'N/A');

  // for each participant, create an svg with the width and height and image.

  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'].forEach(
    participant => {
      // filter data
      let participant_data = data.filter(
        d => d.participant == `${participant}`
      );

      console.log(participant, participant_data.length);
      // create svg and load image
      const container = base
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', `visual_${img}_${participant}`);

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

      // x, y Scale

      let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
      let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

      // add data from circles
      container
        .selectAll('.dot')
        .data(participant_data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(xAccessor(d)))
        .attr('cy', d => yScale(yAccessor(d)))
        .attr('r', d => 50)
        .attr('opacity', 0)
        .attr('fill', '#00ffff')
        .attr('id', (d, i) => `circle_${i}`);

      // create line
      const lineGenerator = d3
        .line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)));

      container
        .selectAll(`#path_${participant}`)
        .data(data)
        .enter()
        .append('path')
        .attr('id', `#path_${participant}`)
        .attr('fill', 'none')
        .attr('stroke-width', 5)
        .attr('stroke', '#00ffff')
        .attr('stroke-opacity', 0.3)
        .attr('d', d => lineGenerator(participant_data));

      // 6. change first and last circle

      container.select('#circle_1').attr('opacity', 0.5).attr('fill', 'green');
      container
        .select(`#circle_${participant_data.length - 1}`)
        .attr('opacity', 0.5)
        .attr('fill', 'purple');

      // do not add after this
    }
  );

  // do not erase after this
}
