// import React from 'react';
// import '../Styles/Cover.scss';
// import {Link} from "react-router-dom";
//
// const MyComponent = ({
//                          bgName,
//                          logoTitle,
//                          description,
//                          button,
//                          link
//                      }: { bgName: string, logoTitle: string, description: string, button: boolean, link: string }) => {
//     return (
//         <div className="inner cover" style={{backgroundImage: `url(${bgName})`}}>
//             { logoTitle &&  <img src={logoTitle} alt="logo title" style={{maxWidth: "44%", margin: "0 auto"}}  />}
//             <div className="cover-heading" style={{backgroundImage: `url(${logoTitle})`}}></div>
//             <p className="lead">{description}</p>
//             <p className="lead">
//                 {button &&
//                     <button type="button"
//                             style={{border: '2px solid white', backgroundColor: '#bb297c', borderRadius: '20px'}}
//                             className="mb-3">
//                         <Link to={link} className="btn btn-lg btn-default">Ver Plantas Disponibles</Link>
//                     </button>
//                 }
//             </p>
//         </div>
//     );
// };
//
// export default MyComponent;
