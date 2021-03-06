import React from 'react';

class OverlayComponent extends React.Component {

    constructor(props) {
        super(props);
        
        this.close = this.close.bind(this);
    }

    close(e) {
        document.getElementById(this.props.id).style.display = "none";
    }


    render() {
        const { id } = this.props;
        return (
            <div id={id} style={{ display: 'none'}}>
                <div id="overlay" className="d-flex justify-content-center flex-wrap align-content-center">
                    {this.props.children}
                    </div>
            </div>
        );
    }

}

export default OverlayComponent; 