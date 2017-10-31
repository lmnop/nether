import React from 'react';
import s from './styles.css';

// function Grid(props) {
//   return (
//     <div className={s.module}>
//       <div className={s.grid}>

//         <div className={s.gridText}>
//           <div className={s.title}>
//             Get off the grid
//           </div>
//           <div className={s.subtitle}>
//             The future of blockchain is almost here. Order Alpha to get started.
//           </div>
//           <a href='#' className={s.borderLink}>Order Alpha</a>
//         </div>
//       </div>
//     </div>
//   );
// }

function Grid(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridLeft}>
          pruple
        </div>
        <div className={s.gridRight}>
          <img src='/images/marquee2.png' className={s.backgroundImage}/>
        </div>
      </div>
    </div>
  );
}


export default Grid;
