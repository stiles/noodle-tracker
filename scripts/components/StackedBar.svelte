<script>
  // d3 stuff 
  import { stack } from 'd3-shape';
  import { sum } from 'd3-array';
  import { axisBottom } from 'd3-axis';
  import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
  // Components
  // Other imports
  import { randomString } from '../utils/random';
  import Axis from './Axis.svelte';
  // Data configuration
  export let title;
  export let titleClass;
  export let data;
  export let attrs;
  export let yLabel;
  export let labelClass;
  // Dimensions
  export let width;
  export let height = 40;
  export let labelHeight = 20; 
  export let margin = { top: 0, right: 0, bottom: 5, left: 45 };
  // Reactive data
  const keys = attrs.map((d) => d.key);
  $: stackedData = stack().keys(keys)([data]);
  // Title
  const titleId = `${randomString()}`;
  // Axes
  export let formatXTicks = d => d + "%";
  
  // Scales
  $: colorScale = scaleOrdinal()
    .domain(attrs.map((d) => d.key))
    .range(attrs.map((d) => d.color))
  
  const xMax = sum(attrs.map((d) => data[d.key]));
  $: xScale = scaleLinear()
    .domain([0, xMax])
    .range([0, width - margin.left  - margin.right]);
    
  $: yScale = scaleBand()
     .domain([0])
     .range([height - margin.top - margin.bottom, 0]);
  $: bandwidth = yScale.bandwidth();
</script>

<div class="inner-container" bind:clientWidth={width}>
  <svg {width} {height} role="graphics-document" aria-labelledby="{titleId}" class="stacked-bar">
    <g text-anchor='begin'>
      <text class='text' fill='#000000' transform="translate(0, {height * 0.5})">{yLabel}</text>
    <g>
    <g transform="translate({margin.left},{margin.top})">
      {#if stackedData[0].key.includes('test')}
      <g class="axes">
          <Axis
            axis={axisBottom}
            scale={xScale}
            className="axis--x"
            yTranslate={(margin.left - margin.right + 55)}
            tickFormat={formatXTicks}
            ticks="4"
          />
        </g>
        {/if}
      <g class="bar">
       {#each stackedData as bar, bidx}
           {#each bar as segment, sidx}
                <rect class={bar.key} data-idx={bidx} data-key={bar.key} data-value={data[bar.key]} role="graphics-symbol"
                      y={yScale(bidx)}
                      x={xScale(segment[0])}
                      width={(xScale(segment[1]) - xScale(segment[0])-2)}
                      height={bandwidth}
                      fill="{colorScale(bar.key)}"
                      opacity=1 />
                />
           {/each}
       {/each}
      </g>
    </g>
    <g class="bar-labels">
      {#each stackedData as bar, bidx}
          {#each bar as segment, sidx}
          {#if ((xScale(segment[1]) - xScale(segment[0]))) > 50 }
          <g transform="translate({ xScale(segment[0]) + ((xScale(segment[1]) - xScale(segment[0]))+15)}, {labelHeight})">
            <text class="{labelClass}">{data[bar.key]}%
            </text>
          </g>
        {/if}
          {/each}
      {/each}
     </g>
     
  </g>
  </svg>
</div>