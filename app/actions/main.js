export const startTimelineFetch = () => {
    return {
        type: 'START_TIMELINE_FETCH'
    };
};

export const receiveTimelineData = (data) => {
    return {
        type: 'RECEIVE_TIMELINE_DATA',
        data: data
    };
};

export const fetchTimelineData = () => {
    console.log("fetchTimelineData");
    return (dispatch, getState) => {
        console.log("fetchTimelineData inner method");
        dispatch(startTimelineFetch());
        var promise = new Promise(function(resolve, reject){
            var data = [
                {
                    dateTime: new Date().toDateString(),
                    title: 'Badri joins apple'
                },
                {
                    dateTime: new Date().toDateString(),
                    title: 'Vijay joins apple'
                },
                {
                    dateTime: new Date().toDateString(),
                    title: 'Chandy joins apple'
                },
                {
                    dateTime: new Date().toDateString(),
                    title: 'Trio at bikes and barels'
                },
                {
                    dateTime: new Date().toDateString(),
                    title: 'Sathish\'s farewell'
                },
                {
                    dateTime: new Date().toDateString(),
                    title: 'At Spoonbill'
                },
                {
                    dateTime: new Date().toDateString(),
                    title: 'All three of them go to pondy'
                }
            ];

            setTimeout(function(){
                dispatch(receiveTimelineData(data));
                resolve();
            }, 1000);

        });
        return promise;
    };
};