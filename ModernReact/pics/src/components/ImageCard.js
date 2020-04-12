import React from 'react';

class ImageCard extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            span: 0
        }

        this.imageRef = React.createRef(); //A way to get access to DOM elements, we just need to add the ref property to the respective jsx element that we want to get from DOM
    }

    //Lifecycle method to get the node image element from DOM 
    componentDidMount() {
        this.imageRef.current.addEventListener('load', this.setSpan);
    }

    setSpan = () => {
       const height =  this.imageRef.current.clientHeight;

       const span = Math.ceil(height / 10);

       this.setState({ span });
    }

    render() {
        const {urls, description} = this.props.image

        return <div style={{gridRowEnd: `span ${this.state.span}`}}>
                <img ref={this.imageRef} src={urls.regular} alt={description} />
            </div>
    }
}

export default ImageCard;