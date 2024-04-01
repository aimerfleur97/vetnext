import React from 'react'

const Loading = () => {
    return (
        <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-60 " style={{opacity: "90%", zIndex:"99"}}>
            <div class="flex items-center justify-center h-screen">
                <div class="relative">
                    <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue animate-spin">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading