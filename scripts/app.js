import { dateParser } from './utils/d3-utils';
import StackedBar from './components/StackedBar.svelte';
import { autoType } from 'd3-dsv';

async function main() {
  const [bonesdayssummary, bonesdays, toplines] = await Promise.all([
    json(window.BONESDAYS_SUMMARY),
    json(window.BONESDAYS),
    json(window.TOPLINES),
  ]);

  const data = bonesdays.map((d) => {
    d.date = dateParser(d.date);
    return d;
  });
}


// const bonesStackedBarTarget = document.getElementById('bones-stacked-bar');

// new StackedBar({
//   target: bonesStackedBarTarget,
//   props: {
//     width: bonesStackedBarTarget.offsetWidth,
//     height: 500,
//     labelHeight: 20,
//     labelClass: '',
//     title: 'stacked',
//     titleClass: 'normal',
//     data: dataBonesSummaryParsed,
//     yLabel: '',
//     attrs: [
//       {
//         key: 'bones',
//         name: 'Bones',
//         color: '#72bac7',
//       },
//       {
//         key: 'nobones',
//         name: 'No Bones',
//         color: '#f0d595',
//       },
//     ],
//   },
// });
