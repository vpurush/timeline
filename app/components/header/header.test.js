//var renderer = require('react-test-renderer');
var React = require('react');
var {shallow, mount} = require('enzyme');
var Header = require('./header.js');
//var mount = require('enzyme').shallow;
//jest.mock('react-dom');
//jest.mock('react-dom/lib/ReactDefaultInjection');


var context = {
                router: {
                    history:{
                            push: jest.fn(),
                            replace: jest.fn(),
                            createHref: jest.fn()
                    },
                    match:{

                    }
                }
            };

// class ContextProvider extends React.Component {
//     getChildContext() {
//       return context;
//     }

//     render() {
//         //console.log("props.children", this.props.children);
//       return this.props.children;
//     }
// }
// ContextProvider.childContextTypes = {};
// Object.keys(context).forEach(key => {
//     ContextProvider.childContextTypes[key] = React.PropTypes.any.isRequired; 
// });

  
describe('header', () => {
    var header;    
    beforeEach(function(){
        header = mount(
            <Header></Header>, {context: context, childContextTypes: {router: React.PropTypes.object}}
        ).instance();
    });

    it("should render properly", () => {

        expect(header).toBeDefined();
    });

    describe('searchIconClick method', function(){
        it("should set state.showSearchBox to true", function(){
            header.searchIconClick();
            expect(header.state.showSearchBox).toEqual(true);
        });
    })

    describe('searchBoxBlur method', function(){
        it("should set state.searchBoxBlur to false", function(){
            header.searchBoxBlur();
            expect(header.state.showSearchBox).toEqual(false);
        });
    })

});


componentDidMount()
{
    var self = this;
    $(document).ready(function(){
        $("#dp").daterangepicker(
        {   timePicker: true,
            timePickerIncrement: 30,
            locale: {
            format: 'MM/DD/YYYY h:mm A'
            },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last 60 Days': [moment().subtract(59, 'days'), moment()],
                'Last 90 Days': [moment().subtract(89, 'days'), moment()]
            }
        }, function(start, end, label) {
            self.setState({start: start, end: end, label: label});
        });
    });

}