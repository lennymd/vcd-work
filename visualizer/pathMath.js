async function pathMath(img) {
  let all_data = await d3.csv('./../data/vcd-bubbleview.csv');

  let xAccessor = d => +d.x;
  let yAccessor = d => +d.y;
  let imgAccessor = d => d.image;

  let data = all_data
    .filter(d => imgAccessor(d) == `${img}.jpeg`)
    .filter(d => d.x != 'N/A');

  console.log(data);
}
