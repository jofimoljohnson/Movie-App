// import {IoClose} from 'react-icons/io5'
// import useFetchDetails from '../hooks/useFetchDetail'


// // const VideoPlay = ({data,close,media_type}) => {
// //     const {data:videoData}=useFetchDetails(`/${media_type}/${data?.id}/videos`)
// //     console.log("Video play",videoData)
  
// //   return (
// //     <div>
// //         <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40
// //         bg-opacity-50 flex justify-center items-center'>
// //             <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded
// //             relative'>
// //                 <button className='absolute -right-1 -top-6 text-3xl z-50' onClick={close}>
// //                     <IoClose/>
// //                 </button>

// //           {/* <iframe src={`https://www.youtube.com/embed${videoData?.results[0]?.key}`}
// //           className='w-full h-full'
// //           /> */}

// // <iframe 
// //     src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`} 
// //     className="w-full h-full" 
// // />



// //             </div>

// //         </section>




// //     </div>
// //   )
// // }

// // export default VideoPlay


// const VideoPlay = ({data, close,media_type}) => {
//     const { data : videoData } = useFetchDetails(`/${media_type}/${data?.id}/videos`)
//     console.log("VIDEO DATA",videoData)
  
//     return (
//       <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'> 
//           <div className='bg-black w-full  max-h-[80vh] max-w-screen-lg aspect-video rounded  relative'>
            
//             <button onClick={close} className=' absolute -right-1 -top-6 text-3xl z-50'>
//                 <IoClose/>
//             </button>
  
//            <iframe
//               src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
//               className='w-full h-full'
//             />
   
  
//           </div>
//       </section>
//     )
//   }
  
//   export default VideoPlay



import { IoClose } from 'react-icons/io5';
import useFetchDetails from '../hooks/useFetchDetail';

const VideoPlay = ({ data, close, media_type }) => {
    const { data: videoData } = useFetchDetails(`/${media_type}/${data?.id}/videos`);
    console.log("Video Data:", videoData);

    // Extract the video key and title, if available
    const videoKey = videoData?.results?.[0]?.key;
    const videoTitle = videoData?.results?.[0]?.name || "Video Player"; // Use video name if available

    return (
        <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'> 
            <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>
                <button onClick={close} className='absolute -right-1 -top-6 text-3xl z-50'>
                    <IoClose />
                </button>

                {/* Conditional rendering for iframe */}
                {videoKey ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoKey}`}
                        className='w-full h-full'
                        title={`YouTube Video - ${videoTitle}`} // Descriptive, unique title
                        allowFullScreen
                    />
                ) : (
                    <p className="text-white text-center p-4">Video not available</p>
                )}
            </div>
        </section>
    );
};

export default VideoPlay;
