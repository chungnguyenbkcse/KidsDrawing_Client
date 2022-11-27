import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <div className="text-center">
        <ReactLoading type={type} color={color} height={100} width={100}/>
        <h3>Đang tải...</h3>
    </div>
);
 
export default Loading;