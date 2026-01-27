import { Letter } from './Letter';
import { Search } from './Search';
import { Timer } from './Timer2';


// export type ProblemProps = object
// convert file extension from .tsx to .ts also works
export const Problem = {
  Letter: Letter,
  Timer: Timer,
  Search: Search
}

// const ProblemC = (props: ProblemProps) => {
//   console.log({ props }); /* added to suppress lint error */

//   const elements = {
//     Letter: Letter,
//     Timer: Timer
//   }
//   return (
//     <Fragment>
//       <Letter />
//       <Timer />
//     </Fragment>
//   );
// }