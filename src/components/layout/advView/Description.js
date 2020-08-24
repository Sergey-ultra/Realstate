import React  from "react";

export const Description = ({current}) => {
    return (
        <div className="item__description">
            Описание
            {`${current.description}`}
            <div><h4>{`+7 ${current.phone}`}</h4></div>
        </div>
    )
}


