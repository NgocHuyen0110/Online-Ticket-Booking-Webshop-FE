import React from "react";
import Museum  from "./Museum";
 
function MuseumList(props){

    return(
        <ul>
        {props.museums.map(museum => (
          <Museum key={museum.id} museum={museum} />
        ))}
      </ul>
    )
}
export default MuseumList;