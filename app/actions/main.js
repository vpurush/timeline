var fetchData = require('../utils/ajax.js').fetchData;

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

const parseTimelineData = (data) => {
    var output;
    data.forEach((d) => {
        d.displayDatetime = new Date(d.dateTime).toDateString();
    });
    output = data.sort((a, b) => {
        return a.dateTime > b.dateTime;
    });
    return output;
};

export const fetchTimelineData = () => {
    console.log("fetchTimelineData");
    return (dispatch, getState) => {
        console.log("fetchTimelineData inner method");
        dispatch(startTimelineFetch());
        // var promise = new Promise(function(resolve, reject){
        //     var data = [
        //         {
        //             dateTime: new Date('06/05/2010').toDateString(),
        //             title: 'KnockoutJS introduces observable to the world and me',
        //             desc: 'Knockout is a standalone JavaScript implementation of the Model-View-ViewModel pattern with templates. The underlying principles are therefore a clear separation between domain data, view components and data to be displayed & the presence of a clearly defined layer of specialized code to manage the relationships between the view components'
        //         },
        //         {
        //             dateTime: new Date('10/20/2010').toDateString(),
        //             title: 'Angular JS teaches me proper code organization using services, directive and scope',
        //             desc: 'AngularJS (commonly referred to as "Angular.js" or "AngularJS 1.X") is a JavaScript-based open-source front-end web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications.'
        //         },
        //         {
        //             dateTime: new Date('03/01/2013').toDateString(),
        //             title: 'React JS provides a solution to the rendering issues',
        //             desc: 'React (sometimes styled React.js or ReactJS) is an open-source JavaScript library for building user interfaces. It is maintained by Facebook, Instagram and a community of individual developers and corporations.'
        //         },
        //         {
        //             dateTime: new Date('01/01/2015').toDateString(),
        //             title: 'Redux redefines how updates are done to the viewmodel',
        //             desc: 'Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.'
        //         },
        //         {
        //             dateTime: new Date('12/08/2011').toDateString(),
        //             title: 'Ember JS',
        //             desc: 'Ember.js is an open-source JavaScript web framework, based on the Model–view–viewmodel (MVVM) pattern. It allows developers to create scalable single-page web applications[1] by incorporating common idioms and best practices into the framework.'
        //         },
        //         {
        //             dateTime: new Date('10/13/2010').toDateString(),
        //             title: 'Backbone JS',
        //             desc: 'Backbone.js is a JavaScript framework with a RESTful JSON interface and is based on the model–view–presenter (MVP) application design paradigm. Backbone is known for being lightweight, as its only hard dependency is on one JavaScript library,[2] Underscore.js, plus jQuery for use of the full library.'
        //         }
        //     ];

        //     setTimeout(function(){
        //         dispatch(receiveTimelineData(data));
        //         resolve();
        //     }, 1000);

        // });
        // return promise;

        var url = "https://api.mlab.com/api/1/databases/tln/collections/timelineitem";
        fetchData(url).then((data) => {
            dispatch(receiveTimelineData(parseTimelineData(data)));
            console.log("data", data);
        });
    };
};

export const filterTimeline = (filterText, timelineItems) => {
    console.log("filtetimeline", filterText, timelineItems);
    return {
        type: 'TIMELINE_FILTER',
        filterText,
        timelineItems
    };    
};