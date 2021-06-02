import React, {Component} from 'react';
import './HeroBlock.css'

class heroBlock extends Component {
  constructor() {
    super();
    this.state = {
      img: [],
      isloading: true,
    }
  };

  cacheImages = async (srcArray) => {
    const promises = await srcArray.map(src => {
      return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    await Promise.all(promises);
    this.setState({isloading: false});
  };

  componentDidMount() {
    this.cacheImages(this.props.imageurls)
  }


  render() {
    let className = this.props.class;
    let headerImage = this.props.imageurls.map((elem, index) => {
      return <div key={index} id={index} className={className[index] ? 'hero-image ' + className[index] : 'hero-image'}
                  style={{backgroundImage: `url(${this.props.imageurls[index]})`}}>
      </div>
    });

    let dots = this.props.imageurls.map((elem, index) => {
      return <div key={index} id={index} className={className[index] ? 'dot ' + className[index] : 'dot'}
                  onClick={(e) => (this.props.idhandler(e))}>
      </div>
    })

    return (
      <div className='hero'>
        {this.state.isloading ? <div className="preload" style={{backgroundImage: 'url(./background.jpeg)'}}>
      </div>
        :
        headerImage}

        {this.props.imageurls.length > 1 ?
          <div className='dots'>
            {dots}
          </div> : null
        }
      </div>
    )
  }
}

export default heroBlock;
