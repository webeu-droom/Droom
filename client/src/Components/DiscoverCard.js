import React from 'react';


const DiscoverCard = ({ data }) =>{
    console.log('==========',data.name);
    const info = data.education? data.education: data.category;
    // const listView = data.jobs? data.jobs: data.experience;

    return(
        <div>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.location}</p>
            <p>{info}</p>
            {/* <p>{listView}</p> */}
        </div>
    )
}

export default DiscoverCard;