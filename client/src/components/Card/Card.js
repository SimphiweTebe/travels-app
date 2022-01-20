import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { format} from 'timeago.js'
import './card.scss';

function Card({pin}) {
  return (
        <div className="card">
            <h5>Place:</h5>
            <p>{pin.title}</p>
            <h5>Review:</h5>
            <p className="review">{pin.desc}</p>
            <h5>Rating:</h5>
            <span className="rating">
                <AiFillStar className='star' />
                <AiFillStar className='star' />
                <AiFillStar className='star' />
                <AiFillStar className='star' />
                <AiFillStar  className='star'/>
            </span>
            <h5>Information:</h5>
            <p className="information">
                <span className='username'>Created by: <b>{pin.username}</b>
                </span> <span className='date'>{format(pin.createdAt)}</span>
            </p>
        </div>
  );
}

export default Card;
