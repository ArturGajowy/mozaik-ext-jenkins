var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var JobBuild         = require('./JobBuild.jsx');
var ApiConsumerMixin = require('mozaik/browser').Mixin.ApiConsumer;

var JobBuilds = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        job: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            builds: []
        };
    },

    getApiRequest() {
        return {
            id: 'jenkins.job.' + this.props.job,
            params: {
                job: this.props.job
            }
        };
    },

    onApiData(builds) {
        this.setState({
            builds: builds
        });
    },

    render() {
        var buildNodes = _.map(this.state.builds, build => {
            return (<JobBuild build={build} key={build.number} />);
        });

        return (
            <div>
                <div className="widget__header">
                    {this.props.title || 'Jenkins job build'}
                    <span className="widget__header__count">
                        {this.state.builds.length}
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {buildNodes}
                </div>
            </div>
        );
    }
});

module.exports = JobBuilds;