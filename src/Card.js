import React from 'react';

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card ' + bg + txt;
  }

  function maxWidth() {
    const width = props.maxWidth ? props.maxWidth : "18rem";

    return width;
  }


  return (
        <div className={classes()} style={{maxWidth: maxWidth()}}>
          <div className="card-header">{props.header}</div>
          <div className="card-body">
            {props.title && (<h5 className="card-title">{props.title}</h5>)}
            {props.text && (<p className="card-text">{props.text}</p>)}
            {props.body}
          </div> 
    </div>     
  );    
}

export default Card;