<script>
  // Imports
  import { select } from 'd3-selection';
  // Required props
  export let axis;
  export let scale;
  // Optional props
  export let xTranslate = 0;
  export let yTranslate = 0;
  export let className = undefined;
  export let ticks = undefined;
  export let tickSize = undefined;
  export let tickSizeInner = undefined;
  export let tickSizeOuter = undefined;
  export let tickPadding = undefined;
  export let tickValues = undefined;
  export let tickFormat = undefined;
  // Local variables
  let transform = `translate(${xTranslate}, ${yTranslate})`;
  let g;
  $: {
    // Delete the axis if it already exists
    select(g).selectAll('*').remove();
    // Configure the axis
    let axisConfig = axis(scale);
    if (ticks) axisConfig = axisConfig.ticks(ticks);
    if (tickSizeInner) axisConfig = axisConfig.tickSizeInner(tickSizeInner);
    if (tickSizeOuter) axisConfig = axisConfig.tickSizeOuter(tickSizeOuter);
    if (tickSize) axisConfig = axisConfig.tickSize(tickSize);
    if (tickPadding) axisConfig = axisConfig.tickPadding(tickPadding);
    if (tickValues) axisConfig = axisConfig.tickValues(tickValues);
    if (tickFormat) axisConfig = axisConfig.tickFormat(tickFormat);
    // Call the axis
    select(g).call(axisConfig);
  }
</script>

<g class="axis {className}" bind:this={g} {transform} />