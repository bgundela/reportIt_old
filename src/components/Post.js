import { Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { formatISO9075 } from "date-fns";

const Post = (props) => {
    return (
        <div className='post'>
            <div className='img'>
                {props.picture && (
                    <img className='img' src={props.picture} />
                )}

                {!props.picture && (
                    <div className='rectangle green regular-font'>
                        No Image Provided
                    </div>
                )}
            </div>
            <div id='post-elements'>
                <div>
                    <h2 className='white bold-font'>{props.title}<span className='green bold-font'>.</span></h2>

                </div>
                <div>
                    <h4 className='thin-font green'>{formatISO9075(new Date(props.createdAt))}</h4>
                </div>

                <p className='thin-font white'>{props.explanation}</p>
                <h3 className='bold-font green space'><span className='thin-font date'>Reported By: </span>{props.email}</h3>
            </div>
        </div>
    )
}

export default Post