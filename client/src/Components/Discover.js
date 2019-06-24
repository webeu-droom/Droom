import React, { useState, useEffect} from 'react';
import listings from '../mock';
import DiscoverCard from './DiscoverCard';

export const Discover =(props)=>{
    const [list, setList] = useState([]);
    console.log('=======',props)
    const listType = props.match.params.type;

    useEffect(()=>{
        const stateRender = listType === 'jobs'? listings[0].companies : listings[1].allcandidates;
    setList(stateRender);
    },[listType]);
    
    return (
        <div>
            Discover Business and people...
            {list.map(arr=>{
                return <DiscoverCard data={arr} key={arr.id}/>
            })}
        </div>
    )
}
export default Discover;
